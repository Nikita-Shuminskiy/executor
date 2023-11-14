import React, {useLayoutEffect} from 'react'
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
import {usePermissionsPushGeo} from "../utils/hook/usePermissionsPushGeo";
import GivePermissions from "../components/GivePermissions";

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
    const {checkInternetConnection, isConnected} = useInternetConnected()
    const navigate = useNavigation()
    // emulator(10) egovLUZ5QWWrNLEWUwFjkY:APA91bE0BIx8nAxOXsL1RoNyolI6EZZVMM9x2uWRJ4bBq7W2S46Y07xPcigUuSznoq1xbtCwkVUgfHnH1i-jId4Ffs5_vjAntlJLCRgsPnV1PSkYJAHNL8otUUQmJXrQ4DwN0Is51tdd
    // my xiaomi fswDVQ3qSr-qnThlq5BwGE:APA91bEDnwNFjcx_WDNzkw1hbpSNbPwa3FxflB53OP_YBf2DQdZlstbApsHXh2fOM6t-umtHNRsi0JQSklsP1ux2Qutf8oDglRxu-3n8kTiH4rpy6jEjneomupRiz885eTaZ_eyfwr13
    // my android (9) eCJMtreXTQKFzpuO1sve0K:APA91bGykORJfvmJ0eMaLT1pnFuXIk74syB6eCwbZLw9onBfyKH0CRmaBgPXDgbwiHNRn14o6unHFEqme2RQpGhrrLpPEoAJOtxwZak1wlcfratd7g_ECgTT4p2zYyZQ6liRcix5_shG
    // ios eYrnYuEyREzoo6wPDtu4tn:APA91bEGbmKvFDSDSY1m5I8B7zJbddH9dnxKEhItD7h-j_bbbCt4uBxegutWh8fJSmwtaqGxgDCKbixjhpEYiRN6y9mlLkFAxozi2QCvOWJauQYGH4RZnFzdrWpDr8mf_Xwcg9aYhZbc
    useNotification(isAuth, navigate.navigate)
    useLayoutEffect(() => {
        setIsLoading(LoadingEnum.fetching)
        AuthStoreService.getSettingExecutor(navigate?.navigate)
            .then((data) => {
                if (data === 'not_token') {
                    // DictionaryStore.getDictionaryLocal()
                }
            })
    }, [])
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
