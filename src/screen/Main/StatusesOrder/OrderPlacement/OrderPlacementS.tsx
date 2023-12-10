import React from 'react';
import {CommonScreenPropsType, LAST_STEP_ORDER_ENUM} from "../../../../api/type";
import {BaseWrapperComponent} from "../../../../components/baseWrapperComponent";
import ArrowBack from "../../../../components/ArrowBack";
import {Box, Text} from "native-base";
import Button from "../../../../components/Button";
import {colors} from "../../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import {observer} from "mobx-react-lite";
import {StatusesHeader} from "../ExecutorStatuses/StatusesHeader";
import Selection from "./Selection";
import OrdersStore from "../../../../store/OrdersStore/orders-store";
import {routerConstants} from "../../../../constants/routerConstants";
import rootStore from "../../../../store/RootStore/root-store";

type InProgressSProps = CommonScreenPropsType & {}
const OrderPlacementS = observer(({navigation, route}: InProgressSProps) => {
    const from: LAST_STEP_ORDER_ENUM = route.params?.from
    const {orderDetail, sendOrderComplete} = OrdersStore
    const {OrdersStoreService} = rootStore

    const goBackPress = () => {
        navigation.goBack()
    }
    const onPressComplete = () => {
        sendOrderComplete(orderDetail?.orders_id, String(orderDetail.client_logistic_partners_points_id)).then((data) => {
            console.log(data)
            if (data) {
                OrdersStoreService.getOrderReportExecutor()
                goBackPress()
            }
        })
    }
    const onPressChoseNewPaczkomat = () => {
        navigation.navigate(routerConstants.SELECT_LOGISTIC_POINT, {from: 'update_order', status: route.params?.from})
    }
    const isIroOrHypo = !!(orderDetail.add_hypo || orderDetail.add_iron)
    return (
        <BaseWrapperComponent>
            <Box paddingX={4} flex={1} justifyContent={'space-between'}>
                <Box>
                    <ArrowBack goBackPress={goBackPress}/>
                    <Box mt={4} mb={2}>
                        <Text fontSize={28} fontFamily={'semiBold'}>Swash #{orderDetail.orders_id}</Text>
                    </Box>
                    <Text mb={2} fontSize={17} color={'#657C8D'} fontFamily={'regular'}>
                        Be careful. If you have completed the order, the system will check the customer's
                        payment and may ask you to take the completed order to the post office. This is an irreversible
                        step.
                    </Text>
                    {
                        isIroOrHypo && <Box mb={2}>
                            <Text fontSize={17} color={colors.black} fontFamily={'semiBold'}>
                                Check if additional services have been completed:
                            </Text>
                            <Text fontSize={15} mt={1} fontFamily={'regular'}>
                                {orderDetail.add_hypo ? '⚠️ Hypoallergenic' : '⚠️ With ironing'}
                            </Text>
                        </Box>
                    }
                    {/*<Box mt={2}>*/}
                    {/*    <StatusesHeader orderDetail={orderDetail} statusOrder={from}/>*/}
                    {/*</Box>*/}
                    <Box mt={2} mb={2}>
                        <Selection textSelection={orderDetail?.executor_logistic_partners_points_address?.trim()}
                                   textHeader={'Paczkomat'} onPress={() => {
                        }}/>
                    </Box>
                    <Box mb={3} mt={6} alignItems={'center'}>
                        <Button backgroundColor={colors.blue} colorText={colors.white}
                                styleContainer={styles.btnContainer} onPress={onPressChoseNewPaczkomat}
                                title={`Choose new Paczkomat`}/>
                    </Box>
                </Box>
                <Box mb={4} mt={3} alignItems={'center'}>
                    <Button backgroundColor={colors.blue} colorText={colors.white}
                            styleContainer={styles.btnContainer} onPress={onPressComplete}
                            title={`Completed. I'm sure.`}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 28,
        maxWidth: 280,
        width: '100%',
    },
})
export default OrderPlacementS;