import React, {useCallback, useEffect} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {observer} from 'mobx-react-lite'
import {Box, Text} from 'native-base'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {FlatList, Image} from 'react-native'
import rootStore from '../../../store/RootStore/root-store'
import {routerConstants} from '../../../constants/routerConstants'
import {useGoBack} from "../../../utils/hook/useGoBack";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import smileSleepImg from '../../../assets/Images/smileSleep.png'
import {useBurgerMenu} from "../../../components/BurgerMenu/BurgerMenuContext";
import OrderHistoryViewer from "../../../components/list-viewer/OrderHistoryViewer/OrderHistoryViewer";
import OrdersStore from "../../../store/OrdersStore/orders-store";

type OrderHistorySProps = {
    navigation: NavigationProp<ParamListBase>
}
const OrdersHistoryS = observer(({navigation}: OrderHistorySProps) => {
    const {OrdersStoreService} = rootStore
    const {closedOrders, orderDetail} = OrdersStore
    const {isMenuOpen, setIsMenuOpen} = useBurgerMenu()
    const goBack = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBack)
    const onPressDetails = useCallback((id) => {
        OrdersStoreService.getOrderReportDetail(id)
       // navigation.navigate(routerConstants.CLIENT_PAY, {from: 'ok'})
    }, [])
    const renderItem = useCallback(({item}: { item: any }) => {
        return <OrderHistoryViewer onPressDetails={onPressDetails} order={item}/>
    }, [])
    useEffect(() => {
        if(!closedOrders.length) {
            OrdersStoreService.getOrdersHistory()
        }
    }, [])
    const renderEmptyListOrder = () => {
        return <Box alignItems={'center'} justifyContent={'center'} flex={1} w={'100%'}>
            <Image style={{ width: 186, height: 180 }} alt={'img-sleep'} source={smileSleepImg}/>
            <Text fontSize={28} mt={8} textAlign={'center'} fontFamily={'semiBold'}>You still have not made
                a Swash!</Text>
        </Box>
    }
    return (
        <BaseWrapperComponent contentContainerStyle={ !closedOrders.length && {justifyContent: 'center', flex: 1}} isKeyboardAwareScrollView={true}>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={'Order history'} goBackPress={goBack}/>
            </Box>
            <Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'center'} >
                <Box mt={10} >
                    <FlatList scrollEnabled={false} ListEmptyComponent={renderEmptyListOrder} data={closedOrders}
                              renderItem={renderItem}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})

export default OrdersHistoryS
