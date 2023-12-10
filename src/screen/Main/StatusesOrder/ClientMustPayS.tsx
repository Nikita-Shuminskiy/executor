import React from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import ArrowBack from "../../../components/ArrowBack";
import {CommonScreenPropsType} from "../../../api/type";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore/auth-store";
import OrdersStore from "../../../store/OrdersStore/orders-store";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {routerConstants} from "../../../constants/routerConstants";
type ClientMustPaySProps = CommonScreenPropsType & {

}
const ClientMustPayS = observer(({navigation, route} : ClientMustPaySProps) => {
    const {orderDetail} = OrdersStore
    const goBackPress = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent>
            <Box paddingX={4} justifyContent={'space-between'}>
                <ArrowBack goBackPress={goBackPress}/>
                <Box mt={4} mb={2}>
                    <Text fontSize={28} fontFamily={'semiBold'}>Swash #{orderDetail.orders_id}</Text>
                </Box>
                <Text>Client must pay</Text>
            </Box>
        </BaseWrapperComponent>
    );
});

export default ClientMustPayS;