import {Box, Text} from "native-base";
import {Image} from "react-native";
import takeYourThingsImg from "../../../../assets/Images/orders/takeThings.png";
import {SvgXml} from "react-native-svg";
import {timeSvg} from "../../../../assets/Images/Svg";
import React from "react";
import {getStepData} from "./utils";
import {LAST_STEP_ORDER_ENUM, OrderDetailType} from "../../../../api/type";
import {colors} from "../../../../assets/colors/colors";

type StatusesHeaderProps = {
    statusOrder?: LAST_STEP_ORDER_ENUM
    orderDetail: OrderDetailType
}
export const StatusesHeader = ({statusOrder, orderDetail}: StatusesHeaderProps) => {
    const stepData = getStepData(statusOrder, orderDetail?.date_estimated_ready)
    return <>
        {
            stepData.bigImg &&
            <>
                <Text fontSize={28} mb={3} textAlign={'center'} fontFamily={'semiBold'}>{stepData.textHeader}</Text>
                <Box alignItems={'center'} justifyContent={'center'}>
                    <Image style={{width: 244, height: 244}} source={stepData.bigImg}/>
                </Box>
            </>
        }
        <Box borderRadius={16} p={4} backgroundColor={stepData.backColor} flexDirection={'row'}
             alignItems={'flex-start'} w={'100%'} justifyContent={'flex-start'}>
            <Image source={stepData.img} style={{width: 28, height: 28}}/>
            <Box ml={2} pr={4}>
                <Text fontSize={15} fontFamily={'regular'}>{stepData.text}</Text>
                {
                    stepData?.date &&
                    <Box p={'1.5'} mt={1} maxHeight={8}
                         flexDirection={'row'}
                         backgroundColor={colors.orange}
                         borderRadius={20}
                         alignItems={'center'}
                         justifyContent={'center'}>
                        <SvgXml xml={timeSvg} width="20" height="20"/>
                        <Text ml={2} fontSize={13} color={colors.white}
                              fontFamily={'semiBold'}>{`It will be date ${stepData?.date}`}</Text>
                    </Box>
                }
            </Box>
        </Box>
    </>
}