import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../api/type";
import {Box, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import {colors} from "../../assets/colors/colors";
import {MapViews} from "../../components/MapViews/MapViews";
import rootStore from "../../store/RootStore/root-store";
import {Platform} from "react-native";
import {useGoBack} from "../../utils/hook/useGoBack";

type SelectLogisticPointProps = CommonScreenPropsType & {}
const SelectLogisticPointS = observer(({navigation}: SelectLogisticPointProps) => {
    const {logisticPoints} = AuthStore
    const {AuthStoreService} = rootStore
    const onPressPaczkomat = (id: string) => {
        AuthStoreService.updateExecutor({
           executor_logistic_partners_points_id: id
        }).then((data) => {
            if (data) {
                AuthStoreService.getSettingExecutor(navigation.navigate)
            }
        })
    }
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent>
            <Box paddingX={3} h={58} backgroundColor={colors.white} flexDirection={'row'} alignItems={'center'}
                 justifyContent={'center'}>
                <Text fontSize={17} fontFamily={'semiBold'}>Select your nearest Paczkomat</Text>
            </Box>
            <MapViews onPressPaczkomat={onPressPaczkomat} logisticPoints={logisticPoints}/>
            <Box borderRadius={16}
                 pb={3}
                 pt={2}
                 paddingX={10}
                 marginY={5}
                 marginX={5}
                 position={'absolute'}
                 bottom={ Platform.OS === 'ios' ? 10 : 0}
                 backgroundColor={colors.white}>
                <Text fontSize={15} textAlign={'center'} fontFamily={'regular'}>You would need to use this Paczkomat to
                    return washed clothes</Text>
                <Text fontSize={15} mt={3} textAlign={'center'} fontFamily={'regular'}>
                    You will be able to change it later
                </Text>
            </Box>
        </BaseWrapperComponent>
    )
})

export default SelectLogisticPointS;