import React from 'react';
import {Image, Modal, StyleSheet} from "react-native";

import {Box, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";

type ModalEducationProps = {
    visible: boolean
    onPress: () => void
    onCloseModal: () => void
    textBody: string
    textBtn: string
}
const ModalExit = ({visible, onPress,onCloseModal, textBtn, textBody}: ModalEducationProps) => {
    return (
        <Modal transparent={true} visible={visible}>
            <Box backgroundColor={`rgba(0, 0, 0, 0.3)`}
                 opacity={0.7}
                 onTouchEnd={onCloseModal}
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
                    style={{
                        maxWidth: 220,
                        maxHeight: 160
                    }}>
                    <Text fontSize={15} textAlign={'center'} fontFamily={'regular'}>{textBody}</Text>
                    <Box  w={'100%'} flexDirection={'row'}>
                        <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.orange}
                                colorText={colors.white}
                                onPress={onPress} title={textBtn}/>
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
        padding: 10,
        minHeight: 39,
        height: 39,
    },
})
export default ModalExit;