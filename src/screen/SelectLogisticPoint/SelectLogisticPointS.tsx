import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType, LAST_STEP_ORDER_ENUM, LogisticsPointType} from "../../api/type";
import {Box, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import {colors} from "../../assets/colors/colors";
import {MapViews} from "../../components/MapViews/MapViews";
import rootStore from "../../store/RootStore/root-store";
import {Platform} from "react-native";
import {useGoBack} from "../../utils/hook/useGoBack";
import {StatusBar} from "expo-status-bar";
import HeaderGoBackTitle from "../../components/HeaderGoBackTitle";
import {routerConstants} from "../../constants/routerConstants";
import ConfirmationLogisticsPointModal from "./ConfirmationLogisticsPointModal";

type SelectLogisticPointProps = CommonScreenPropsType & {}
const SelectLogisticPointS = observer(({navigation, route}: SelectLogisticPointProps) => {
    const isFromUpdate = route?.params?.from === 'update'
    const isFromUpdateOrder = route?.params?.from === 'update_order'
    const [chosenPaczkomat, setChosenPaczkomat] = useState<LogisticsPointType | null>(null)
    const {logisticPoints} = AuthStore
    const {AuthStoreService} = rootStore
    const onPressPaczkomat = (point: LogisticsPointType) => {
        setChosenPaczkomat(point)
    }
    const onPressSavePaczkomat = () => {
        AuthStoreService.updateExecutor({
            executor_logistic_partners_points_id: chosenPaczkomat.id
        }).then((data) => {
            if (data) {
                console.log(isFromUpdateOrder, 'isFromUpdateOrder')
                AuthStoreService.getSettingExecutor(!isFromUpdate && navigation.navigate)
                isFromUpdate && navigation.navigate(routerConstants.ORDERS, {from: 'open_menu'})
            }
        })
    }
    const goBackPress = (routes) => {
        if(isFromUpdateOrder) {
            navigation.navigate(routerConstants.ORDER_PLACEMENT, {from: route?.params?.status})
            return true
        }
        routes && navigation.navigate(routes)
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingX={3} h={58} backgroundColor={colors.white} flexDirection={'row'} alignItems={'center'}
                 justifyContent={'center'}>
                {
                    !(!isFromUpdate || !isFromUpdateOrder) ? <Text fontSize={17} fontFamily={'semiBold'}>Select your nearest Paczkomat</Text> :
                        <HeaderGoBackTitle title={'Select your nearest Paczkomat'}
                                           goBackPress={() => goBackPress(routerConstants.ORDERS)}/>
                }
            </Box>
            <MapViews onPressPaczkomat={onPressPaczkomat} logisticPoints={logisticPoints}/>
            {
                !(!isFromUpdate || !isFromUpdateOrder) && <Box borderRadius={16}
                                      pb={3}
                                      pt={2}
                                      paddingX={10}
                                      marginY={5}
                                      marginX={5}
                                      position={'absolute'}
                                      bottom={Platform.OS === 'ios' ? 10 : 0}
                                      backgroundColor={colors.white}>
                    <Text fontSize={15} textAlign={'center'} fontFamily={'regular'}>You would need to use this Paczkomat to
                        return washed clothes</Text>
                    <Text fontSize={15} mt={3} textAlign={'center'} fontFamily={'regular'}>
                        You will be able to change it later
                    </Text>
                </Box>
            }
            {
                chosenPaczkomat && <ConfirmationLogisticsPointModal
                    onPressSave={onPressSavePaczkomat}
                    isOpen={!!chosenPaczkomat}
                    chosenPaczkomat={chosenPaczkomat}
                    onClose={() => setChosenPaczkomat(null)}/>
            }
        </BaseWrapperComponent>
    )
})

export default SelectLogisticPointS;