import React from 'react';
import {BaseWrapperComponent} from "../../../../components/baseWrapperComponent";
import {CommonScreenPropsType, LAST_STEP_ORDER_ENUM} from "../../../../api/type";
import {Box, Text} from "native-base";
import {Image, StyleSheet} from "react-native";
import {timeSvg} from "../../../../assets/Images/Svg";
import {SvgXml} from "react-native-svg";
import ArrowBack from "../../../../components/ArrowBack";
import takeYourThingsImg from '../../../../assets/Images/orders/takeThings.png'
import {useGoBack} from "../../../../utils/hook/useGoBack";
import {StatusesHeader} from "./StatusesHeader";
import {getStepData} from "./utils";


type ExecutorMapSProps = CommonScreenPropsType & {}
const ExecutorStatusesS = ({navigation, route}: ExecutorMapSProps) => {
     const from: LAST_STEP_ORDER_ENUM = route.params?.from
    const goBackPress = () => {
        navigation.goBack()
    }
    const goBack = () => {
        return true
    }
    useGoBack(goBack)
    return (
        <BaseWrapperComponent  isKeyboardAwareScrollView={true}>
            <Box paddingX={4}>
                <ArrowBack goBackPress={goBackPress}/>
                <Box mt={2} mb={2}>
                    <Text fontSize={28} fontFamily={'semiBold'}>Swash #id</Text>
                </Box>
              <Box w={'100%'} h={'100%'} mt={7}>
                  <StatusesHeader statusOrder={from}/>
              </Box>
            </Box>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({})
export default ExecutorStatusesS;


