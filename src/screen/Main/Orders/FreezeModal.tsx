import React from 'react';
import {Modal} from "react-native";
import {Box, Center, Image, Text} from "native-base";
import {BlurView} from "expo-blur";
import freezeImg from '../../../assets/Images/orders/freeze.png'
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";
import {dateStringFormat} from "../../../utils/commonUtils";
type FreezeModalProps = {
    visible: boolean
    freezeDate: string
    onPress: () => void

}
const FreezeModal = ({visible, freezeDate, onPress}: FreezeModalProps) => {
    return (
        <Modal transparent={false} visible={visible}>
            <BlurView style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center'
            }}  intensity={40}>
               <Center>
                   <Image alt={'img'} w={20} h={20} source={freezeImg}/>
                   <Text mt={5} mb={2} fontSize={28} fontFamily={'semiBold'}>You’re on a freeze</Text>
                   <Text fontSize={17} fontFamily={'regular'} color={colors.grayLight}>{`You’re frozen until ${dateStringFormat(freezeDate, 'dd MMMM yyyy')}`}</Text>
                   <Box mt={5} alignItems={'center'} w={'100%'}>
                       <Button backgroundColor={colors.blue} colorText={colors.white}
                               styleContainer={{
                                   borderRadius: 28,
                                   width: '65%',
                               }}  onPress={onPress}
                               title={'Abort freezing'}/>
                   </Box>
               </Center>
            </BlurView>
        </Modal>
    );
};

export default FreezeModal;