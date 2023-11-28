import React, {useCallback, useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType, LastStep} from "../../../api/type";
import BurgerMenuBtn from "../../../components/BurgerMenu/BurgerMenuBtn";
import {colors} from "../../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {isFutureDate} from "../../../utils/commonUtils";
import AuthStore from "../../../store/AuthStore/auth-store";
import {Dimensions, FlatList, ImageBackground, Platform, StyleSheet} from "react-native";
import FreezeModal from "./FreezeModal";
import {routerConstants} from "../../../constants/routerConstants";
import {useFocusEffect} from "@react-navigation/native";
import OpenShiftModal from "../Shift/OpenShiftModal";
import {useIsFocused} from '@react-navigation/native';
import backgroundOrderImg from '../../../assets/Images/orders/backgroundOrder.png'
import OrderViewer from "../../../components/list-viewer/OrderViewer/OrderViewer";

type OrdersSProps = CommonScreenPropsType & {}
const OrdersS = observer(({navigation, route}: OrdersSProps) => {
    const [isFreeze, setIsFreeze] = useState(false)
    const [isOpenShiftModal, setIsOpenShiftModal] = useState(false)
    const isFocused = useIsFocused();
    const isOpenMenu = route.params?.from === 'open_menu'
    const {executorSettings} = AuthStore
    console.log(executorSettings.units)
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    useEffect(() => {
        if (isFocused) {
            const isFreeze = isFutureDate(executorSettings?.executors?.datetime_freeze_until) ||
                !executorSettings?.executors?.datetime_workshift_until ||
                !(+executorSettings.executors.ready_for_orders >= 1)
            if (isFreeze) {
                setTimeout(() => {
                    setIsFreeze(true)
                }, 500)
            }
            return
        }
        setIsFreeze(false)
    }, [isFocused]);
    const onPressDetails = useCallback((order: any) => {
        //OrdersStoreService.getOrderReportDetail(order.id)
        //onPressOrderDetails(navigation, order)
    }, [])
    const renderItem = useCallback(({item, index}: { item: any, index: number }) => {
        if (item.last_step === LastStep.admin_closed_order || item.last_step === LastStep.client_confirm) return
        return <OrderViewer onPressDetails={onPressDetails} order={item} index={index}/>
    }, [])
    return (
        <>
            <BaseWrapperComponent styleSafeArea={{
                paddingTop: 0,
                backgroundColor: colors.blue
            }} isKeyboardAwareScrollView={true}>
                <Box backgroundColor={colors.blue}>
                    <Box style={{height: 220}} backgroundColor={colors.blue}>
                        <ImageBackground alt={'mg-header'} resizeMode={'contain'} style={{
                            height: 284,
                        }} source={backgroundOrderImg}>
                            <Box paddingX={4} style={{paddingTop: Platform.OS === 'ios' ? 0 : 40}}>
                                <BurgerMenuBtn openingForced={isOpenMenu}/>
                                <Box backgroundColor={colors.white} mt={3} alignItems={'center'} p={3} w={'50%'}
                                     borderRadius={50} borderWidth={5} borderColor={'#E8F5FE'}>
                                    <Text color={colors.blue} fontSize={17} fontFamily={'semiBold'}>The shift is
                                        open</Text>
                                </Box>
                            </Box>
                        </ImageBackground>

                    </Box>
                    <Box borderTopLeftRadius={16} mb={2} style={{minHeight:Dimensions.get('window').height - 191}} borderTopRightRadius={16} backgroundColor={colors.white}>
                        <FlatList scrollEnabled={false} data={[1,2,3]} renderItem={renderItem}/>
                    </Box>

                </Box>
                 {/* <FreezeModal freezeDate={executorSettings?.executors?.datetime_freeze_until}
                             onPress={() => {
                                 setIsFreeze(false)
                                 setIsOpenShiftModal(true)
                             }}
                             visible={isFreeze}/>
                <OpenShiftModal visible={isOpenShiftModal} onClose={() => {
                    setIsFreeze(false)
                    setIsOpenShiftModal(false)
                }}/>*/}
            </BaseWrapperComponent>
        </>
    );
});

export default OrdersS;