import React from 'react';
import {Modal, StyleSheet} from "react-native";
import {Box, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";


type BaseModalInfoProps = {
    visible: boolean
    onClose: () => void
    onSend: () => void
}

const FreezeModal = ({visible, onClose, onSend}: BaseModalInfoProps) => {
    return (
        <Modal transparent={true} visible={visible}>
            <Box backgroundColor={`rgba(0, 0, 0, 0.3)`}
                 opacity={0.7}
                 position={'absolute'}
                 w={'100%'} top={0}
                 height={'100%'}/>
            <Box w={'100%'}
                 paddingX={3}
                 justifyContent={'center'}
                 position={'relative'}
                 bottom={'20%'}
                 height={'100%'}>
                <Box
                    paddingX={4}
                    paddingY={4}
                    borderRadius={16}
                    justifyContent={'space-between'}
                    flex={1}
                    backgroundColor={colors.white}
                    maxHeight={166}>
                    <Text fontSize={20} textAlign={'center'} fontFamily={'semiBold'}>Are you sure you want to snooze
                        shifts until chosen date?</Text>
                    <Box flexDirection={'row'} justifyContent={'space-between'}>
                        <Box flex={1} mr={2}>
                            <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
                                    colorText={colors.white}
                                    onPress={onClose} title={'No'}/>
                        </Box>
                        <Box flex={1}>
                            <Button styleContainer={{...styles.styleContainerBtn, ...styles.btnYes}}
                                    colorText={colors.blue}
                                    onPress={onSend}
                                    title={'Yes'}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        height: 56,
    },
    btnYes: {
        borderWidth: 1,
        borderColor: colors.blue,
    },
})
export default FreezeModal;