import React, {useState} from 'react'
import {Box, Text} from 'native-base'
import {Image, TouchableOpacity} from 'react-native'
import {colors} from '../../../../assets/colors/colors'
import arrowBlue from '../../../../assets/Images/order/arrowRightBlue.png'
import CustomCheckbox from '../../../../components/CustomCheckbox'
import {observer} from "mobx-react-lite";

type PaymentMethodProps = {
    onPress: () => void
    textHeader?: string
    textSelection: string
}
const Selection = observer(({textHeader, textSelection}: PaymentMethodProps) => {
    return (
        <>
            {
                textHeader &&  <Text mb={3} fontSize={22} fontFamily={'semiBold'}>{textHeader}</Text>
            }
            <Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
                 justifyContent={'space-between'}
                 backgroundColor={colors.grayBright}>
                <CustomCheckbox  checked={true}/>

                <Box flexDirection={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                    <Text ml={2} fontSize={15} fontFamily={'regular'}>{textSelection}</Text>
                 {/*   <Image source={arrowBlue} alt={'arrow'}/>*/}
                </Box>

            </Box>
        </>
    )
})

export default Selection
