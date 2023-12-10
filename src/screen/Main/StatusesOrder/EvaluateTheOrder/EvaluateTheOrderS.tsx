import React, {useCallback, useState} from 'react';
import {BaseWrapperComponent} from "../../../../components/baseWrapperComponent";
import {CommonScreenPropsType, LAST_STEP_ORDER_ENUM, UnitType} from "../../../../api/type";
import {observer} from "mobx-react-lite";
import OrdersStore from "../../../../store/OrdersStore/orders-store";
import rootStore from "../../../../store/RootStore/root-store";
import {Box, Text} from "native-base";
import {FlatList} from "react-native";
import Button from "../../../../components/Button";
import AuthStore from "../../../../store/AuthStore/auth-store";
import ArrowBack from "../../../../components/ArrowBack";
import {colors} from "../../../../assets/colors/colors";
import PriceViewer from "../../../../components/list-viewer/PriceViewer/PriceViewer";
import ShowListPhoto from "../../../../components/ShowListPhotoComponent/ShowListPhoto";
import {StatusesHeader} from "../ExecutorStatuses/StatusesHeader";
import ModalEvaluateOrder from "./ModalEvaluateOrder";

export type priceDataPayloadType = {
    [key: string]: number
}
const DEFAULT_DATA_PRICE: priceDataPayloadType = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
}
type EvaluateTheOrderSProps = CommonScreenPropsType & {}
const EvaluateTheOrderS = observer(({navigation, route}: EvaluateTheOrderSProps) => {
    const {orderDetail} = OrdersStore
    const {executorSettings} = AuthStore
    const [disableBtn, setDisableBtn] = useState(false)
    const [confirmations, setConfirmation] = useState(false)
    const [priceDataPayload, setPriceDataPayload] = useState<priceDataPayloadType>(DEFAULT_DATA_PRICE)
    const {OrdersStoreService} = rootStore
    const goBackPress = () => {
        navigation.goBack()
    }

    const onChangeValuesPrice = useCallback((id: string, price: UnitType, val: string) => {
        setPriceDataPayload(prevState => {
            return {
                ...prevState,
                [id]: Number(val)
            }
        })
    }, [])
    const renderItem = useCallback(({item}: { item: UnitType }) => {
        return <PriceViewer priceDataPayload={priceDataPayload[item?.id]} onChangeValuesPrice={onChangeValuesPrice}
                            price={item}/>
    }, [priceDataPayload])
    const onSavePhotoHandler = (photo: string) => {
        setDisableBtn(false)
        OrdersStoreService.saveOrderPhoto(photo)
    }
    const onDeletePhotoHandler = (photoId: number) => {
        setDisableBtn(false)
        OrdersStoreService.deleteOrderPhoto(photoId)
    }
    const onPressContinue = () => {
        const dataArray = Object.entries(priceDataPayload).map(([key, value]) => ({[key]: String(value)}));
        OrdersStoreService.sendOrderRegister({
            orders_id: orderDetail.orders_id,
            units_order: dataArray
        }).then((data) => {
            if (data) {
                goBackPress()
            }
        })
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={4}>
                <Box alignItems={'flex-start'} justifyContent={'center'}>
                    <ArrowBack goBackPress={goBackPress}/>
                </Box>
                <Box mt={2}>
                    <Text fontSize={28} fontFamily={'semiBold'}>Swash #{orderDetail?.orders_id}</Text>
                </Box>
                <Box mt={3}>
                    <Box mb={6}>
                        <StatusesHeader orderDetail={orderDetail} statusOrder={LAST_STEP_ORDER_ENUM.executor_received}/>
                    </Box>
                    <Text fontSize={22} mb={2} fontFamily={'semiBold'}>Categories</Text>
                    <FlatList keyExtractor={(item, index) => index.toString()}
                              extraData={priceDataPayload}
                              scrollEnabled={false} data={executorSettings.units} renderItem={renderItem}/>
                </Box>
                <Box mb={3} mt={3}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>Photo</Text>
                    <Text fontSize={15} color={colors.gray} fontFamily={'regular'}>Take some photos of the clothes that
                        came</Text>
                    <ShowListPhoto savePhoto={onSavePhotoHandler}
                                   data={orderDetail?.photos}
                                   deletePhoto={onDeletePhotoHandler}/>
                </Box>
                <Box mb={5} justifyContent={'center'} alignItems={'center'}>
                    <Button backgroundColor={colors.blue} colorText={colors.white} styleContainer={{
                        width: 280,
                        borderRadius: 28,
                    }} onPress={() => setConfirmation(true)} title={'Continue'}/>
                </Box>
            </Box>
            {
                confirmations && <ModalEvaluateOrder onSave={onPressContinue} onClose={() => setConfirmation(false)}
                                                     isOpen={confirmations} priceDataUnits={priceDataPayload}/>
            }
        </BaseWrapperComponent>
    );
});

export default EvaluateTheOrderS;