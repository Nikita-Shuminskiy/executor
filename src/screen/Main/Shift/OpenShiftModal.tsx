import React, {useState} from 'react';
import {Box, Image, Modal, Text} from "native-base";
import Button from "../../../components/Button";
import {KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../../assets/colors/colors";
import InputNumber from "../../../components/InputNumber";
import rootStore from "../../../store/RootStore/root-store";
import {BlurView} from "expo-blur";
import Background from "../../../components/Background";
import arrowBackImg from "../../../assets/Images/arrowBackBlue.png";

type OpenShiftModalProps = {
    visible: boolean
    onClose: () => void
}
const OpenShiftModal = ({visible, onClose}: OpenShiftModalProps) => {
    const {AuthStoreService} = rootStore
    const [openShiftsValue, setOpenShiftsValue] = useState('1')
    const [isConfirmation, setIsConfirmation] = useState(false)
    const onPressOpenShift = () => {
        AuthStoreService.sendShiftSetup({ready_for_orders: openShiftsValue}).then((data) => {
            if (data) {
                onClose()
            }
        })
    }
    return (
        <Modal isOpen={visible} onClose={onClose}>
            <BlurView style={styles.blurView} intensity={40}>
                <Background onClose={onClose}/>
                <Box w={'95%'} style={{maxHeight: isConfirmation ? 344 : 407, height: '100%', borderWidth: 6}} padding={7}
                     borderColor={'#E4E4E4'} backgroundColor={colors.white} borderRadius={24}
                     justifyContent={'space-between'}
                     alignItems={'center'}>
                    {
                        isConfirmation ? <>
                            <Text fontSize={34} fontFamily={'semiBold'}>Confirmation</Text>
                            <Text fontSize={16} color={colors.gray} textAlign={'center'} fontFamily={'regular'}>
                                Are you sure you want to open a shift with{' '}
                                <Text fontSize={17} fontFamily={'semiBold'} color={colors.black}>{openShiftsValue} orders?</Text> This number cannot be changed later
                            </Text>
                            <Box w={'100%'} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
                                <Button styleContainer={{
                                    borderWidth: 1,
                                    width: 56,
                                    height: 56,
                                    borderColor: colors.blue,
                                    borderRadius: 28,
                                    marginRight: 8
                                }} onPress={() => setIsConfirmation(false)}>
                                    <Image alt={'arrow-back'} source={arrowBackImg} w={5} h={5}/>
                                </Button>
                                <Button onPress={onPressOpenShift} styleContainer={styles.styleContainerBtn}
                                        title={'Confirm'}
                                        colorText={colors.white} backgroundColor={colors.blue}/>
                            </Box>
                        </> : <>
                            <Box alignItems={'center'}>
                                <Text fontSize={34} fontFamily={'semiBold'}>Open the shift</Text>
                                <Text fontSize={16} color={colors.gray} fontFamily={'regular'}>Enter the number of
                                    orders in
                                    this
                                    shift</Text>
                            </Box>
                            {
                                openShiftsValue && <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
                                    <InputNumber
                                        values={Number(openShiftsValue)}
                                        onChangeValue={setOpenShiftsValue}
                                    />
                                </Box>
                            }
                            <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <Button onPress={() => setIsConfirmation(true)}
                                        styleContainer={styles.styleContainerBtn}
                                        title={'Open'}
                                        colorText={colors.white} backgroundColor={colors.blue}/>
                            </Box>
                        </>
                    }

                </Box>
            </BlurView>
        </Modal>
    );
};
const styles = StyleSheet.create({
    blurView: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleContainerBtn: {
        width: '100%',
        maxWidth: 252,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default OpenShiftModal;