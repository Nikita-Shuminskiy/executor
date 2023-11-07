import React, {useEffect, useLayoutEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {observer} from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import NotificationStore from '../store/NotificationStore/notification-store'
import {LoadingEnum} from '../store/types/types'
import LoadingGlobal from '../components/LoadingGlobal'
import {routerConstants} from '../constants/routerConstants'
import LoginS from '../screen/AuthScreens/LoginS'
import VerifyNumberS from '../screen/AuthScreens/VerifyNumberS'
import AddPhoneS from '../screen/AuthScreens/AddPhoneS'
import TermsOfUseS from '../screen/AuthScreens/TermsOfUseS'
import LoadingLocal from '../components/LoadingLocal'
import {useInternetConnected} from '../utils/hook/useInternetConnected'
import {BurgerMenuProvider} from '../components/BurgerMenu/BurgerMenuContext'
import BurgerMenu from '../components/BurgerMenu/BurgerMenu'
import {useNavigation} from '@react-navigation/native'
import {useNotification} from "../utils/hook/useNotification";
import AboutUsS from "../screen/AboutUsS";
import Alerts from "../components/Alert";
import WifiReconnect from "../components/WifiReconnect";
import rootStore from "../store/RootStore/root-store";
import authenticatedRoutes from "./routesConstants";
import notifee from "@notifee/react-native";
import {usePermissionsPushGeo} from "../utils/hook/usePermissionsPushGeo";
import GivePermissions from "../components/GivePermissions";
import NavigationStore from "../store/NavigationStore/navigation-store";
import messaging from "@react-native-firebase/messaging";
import {deviceStorage} from "../utils/storage/storage";

const getInitNotification = async () => {
    try {
        const lastNotification = await deviceStorage.getItem('lastNotification')
        if(lastNotification) {
            return JSON.parse(lastNotification)
        }
      //    return await notifee.getInitialNotification()
    } catch (e) {
        //console.log('catch getInitNotification')
    } finally {
        //console.log('finally getInitNotification')
    }
}
const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading, serverResponseText, isLocalLoading, setIsLoading} = NotificationStore
    const {isAuth} = AuthStore
    const {AuthStoreService} = rootStore
    const {
        askNotificationPermissionHandler,
        askLocationPermissionHandler,
        locationStatus,
    } = usePermissionsPushGeo()
    const checkStatusPermissions = locationStatus !== 'undetermined' && locationStatus !== 'granted'
    const {notification, setNotification, navigation} = NavigationStore
    const {checkInternetConnection, isConnected} = useInternetConnected()
    const navigate = useNavigation()

    useNotification(isAuth)
    useLayoutEffect(() => {
        setIsLoading(LoadingEnum.fetching)
        getInitNotification().then((data) => {
            AuthStoreService.getSettingExecutor(navigate?.navigate, data ? data : null)
                .then((data) => {
                    if (data === 'not_token') {
                        // DictionaryStore.getDictionaryLocal()
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(LoadingEnum.success)
                    }, 3000)
                })
        })

    }, [])
    useEffect(() => {
        if (navigate) {
            if (notification) {
                // @ts-ignore
                navigation.navigate(routerConstants.ABOUT_US)
                setNotification(null)
            }
        }

    }, [notification, navigate]);
    return (
        <BurgerMenuProvider>
            {isLoading === LoadingEnum.fetching && <LoadingGlobal visible={true}/>}
            {isLocalLoading === LoadingEnum.fetching && <LoadingLocal visible={true}/>}
            {serverResponseText && <Alerts
                text={serverResponseText}/>}
            {!isConnected && <WifiReconnect
                checkInternet={checkInternetConnection} visible={!isConnected}/>}
            {checkStatusPermissions && <GivePermissions
                askLocationPermissionHandler={askLocationPermissionHandler}
                askNotificationPermissionHandler={askNotificationPermissionHandler}
                visible={checkStatusPermissions}/>}
            <BurgerMenu/>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen
                    name={routerConstants.LOGIN}
                    component={LoginS}
                />
                <RootStack.Screen
                    name={routerConstants.VERIFY_NUMBER}
                    component={VerifyNumberS}
                />
                <RootStack.Screen
                    name={routerConstants.PHONE_VERIFY}
                    component={AddPhoneS}
                />
                <RootStack.Screen
                    name={routerConstants.TERMS_OF_USE}
                    component={TermsOfUseS}
                />
                <RootStack.Screen
                    name={routerConstants.ABOUT_US}
                    component={AboutUsS}
                />
                {
                    isAuth &&
                    authenticatedRoutes.map((route) => {
                        return <RootStack.Screen
                            key={route.name}
                            name={route.name}
                            component={route.component}
                        />
                    })
                }


            </RootStack.Navigator>
        </BurgerMenuProvider>
    )
})

export default RootNavigation
