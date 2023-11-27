import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../../api/type";
import BurgerMenuBtn from "../../../components/BurgerMenu/BurgerMenuBtn";
import {colors} from "../../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {isFutureDate} from "../../../utils/commonUtils";
import AuthStore from "../../../store/AuthStore/auth-store";
import {StyleSheet} from "react-native";
import FreezeModal from "./FreezeModal";
import {routerConstants} from "../../../constants/routerConstants";
import {useFocusEffect} from "@react-navigation/native";
import OpenShiftModal from "../Shift/OpenShiftModal";
import { useIsFocused } from '@react-navigation/native';

type OrdersSProps = CommonScreenPropsType & {}
const OrdersS = observer(({navigation, route}: OrdersSProps) => {
    const [isFreeze, setIsFreeze] = useState(false)
    const [isOpenShiftModal, setIsOpenShiftModal] = useState(false)
    const isFocused = useIsFocused();
    const isOpenMenu = route.params?.from === 'open_menu'
    const {executorSettings} = AuthStore
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    useEffect(() => {
        if (isFocused) {
            console.log(1)
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


    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <StatusBar backgroundColor={colors.white}/>
                <Box paddingX={4}>
                    <BurgerMenuBtn openingForced={isOpenMenu}/>
                    <Text>Orders</Text>
                </Box>
                <FreezeModal freezeDate={executorSettings?.executors?.datetime_freeze_until}
                             onPress={() => {
                                 setIsFreeze(false)
                                 setIsOpenShiftModal(true)
                             }}
                             visible={isFreeze}/>
                <OpenShiftModal visible={isOpenShiftModal} onClose={() => {
                    setIsFreeze(false)
                    setIsOpenShiftModal(false)
                }}/>
            </BaseWrapperComponent>
        </>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        height: 40,
        minHeight: 0
    },
})
export default OrdersS;