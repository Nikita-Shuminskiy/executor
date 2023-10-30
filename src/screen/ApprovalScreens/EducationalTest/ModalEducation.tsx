import React from 'react';
import {Image, Modal, StyleSheet} from "react-native";

import {Box, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";

type ModalEducationProps = {
    visible: boolean
    onClose: () => void
    img: any
    textBody: string
    textBtn: string
}
const ModalEducation = ({visible, onClose, img, textBtn, textBody}: ModalEducationProps) => {
    return (
        <Modal transparent={true} visible={visible}>
            <Box backgroundColor={`rgba(0, 0, 0, 0.3)`}
                 opacity={0.7}
                 position={'absolute'}
                 w={'100%'} top={0}
                 height={'100%'}/>
            <Box w={'100%'}
                 paddingX={3}
                 flex={1}
                 alignItems={'center'}
                 justifyContent={'center'}
                 height={'100%'}>
                <Box
                    paddingX={5}
                    paddingY={5}
                    borderRadius={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flex={1}
                    backgroundColor={colors.white}
                    maxHeight={213}>
                    <Image source={img} resizeMode={'contain'} style={styles.img}/>
                    <Text fontSize={25} textAlign={'center'} fontFamily={'semiBold'}>{textBody}</Text>
                    <Box  w={'100%'}>
                        <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.orange}
                                colorText={colors.white}
                                onPress={onClose} title={textBtn}/>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
const styles = StyleSheet.create({
    img: {
        width: 78,
        height: 45
    },
    styleContainerBtn: {
        borderRadius: 50,
        padding: 15,
        height: 56,
    },
})
export default ModalEducation;