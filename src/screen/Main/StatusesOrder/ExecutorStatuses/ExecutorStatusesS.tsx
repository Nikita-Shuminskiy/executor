import React from 'react';
import {BaseWrapperComponent} from "../../../../components/baseWrapperComponent";
import {CommonScreenPropsType, LAST_STEP_ORDER_ENUM} from "../../../../api/type";
import {Box, Text} from "native-base";
import {StyleSheet} from "react-native";
import ArrowBack from "../../../../components/ArrowBack";
import {useGoBack} from "../../../../utils/hook/useGoBack";
import {StatusesHeader} from "./StatusesHeader";
import OrdersStore from "../../../../store/OrdersStore/orders-store";
import {observer} from "mobx-react-lite";
import Map from "./Map";
import {colors} from "../../../../assets/colors/colors";
import {routerConstants} from "../../../../constants/routerConstants";


type ExecutorMapSProps = CommonScreenPropsType & {}
const ExecutorStatusesS = observer(({navigation, route}: ExecutorMapSProps) => {
    const from: LAST_STEP_ORDER_ENUM = route.params?.from
    const {orderDetail} = OrdersStore
    const goBackPress = () => {
        navigation.goBack()
    }
    const goBack = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBack)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true} contentContainerStyle={{flexGrow: 1}}>
            <Box paddingX={4} flexGrow={1} justifyContent={'space-between'}>
                <Box>
                    <ArrowBack goBackPress={goBackPress}/>
                    <Box mt={2}>
                        <Text fontSize={28} fontFamily={'semiBold'}>Swash #{orderDetail?.orders_id}</Text>
                        {
                            from === LAST_STEP_ORDER_ENUM.executor_done &&
                            <Text fontSize={15} color={colors.grayLight} fontFamily={'regular'}>
                                It is necessary to take and place the completed order in the parcel locker so
                                that it begins its journey back to the customer. Be extremely careful!
                            </Text>
                        }
                    </Box>
                </Box>
                <Box flex={1} justifyContent={'space-around'}>
                    <StatusesHeader orderDetail={orderDetail} statusOrder={from}/>
                    {
                        !!(from === LAST_STEP_ORDER_ENUM.executor_must_get ||
                            from === LAST_STEP_ORDER_ENUM.executor_done) &&
                        <Map orderDetail={orderDetail}/>
                    }
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})
const styles = StyleSheet.create({})
export default ExecutorStatusesS;


