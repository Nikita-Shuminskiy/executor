import React from 'react';
import {Box, Modal, Text} from "native-base";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import closeImage from "../../assets/Images/order/closeCircleGray.png";
import {LogisticsPointType} from "../../api/type";
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
type ConfirmationLogisticsPointModalProps = {
    isOpen: boolean
    onClose: () => void
    onPressSave: () => void
    chosenPaczkomat: LogisticsPointType
}
const ConfirmationLogisticsPointModal = ({isOpen, onClose, onPressSave, chosenPaczkomat}:ConfirmationLogisticsPointModalProps) => {
    const {dictionary} = DictionaryStore
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Box backgroundColor={`rgba(0, 0, 0, 0.3)`} opacity={0.7} position={'absolute'} w={'100%'} top={0}
                 height={'100%'}/>
            <Box w={'100%'} paddingX={3} justifyContent={'center'} height={'100%'}>
                <Box style={{paddingHorizontal: 16}} borderRadius={16} justifyContent={'space-evenly'} flex={1}
                     backgroundColor={colors.white}
                     maxHeight={186}>
                    <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize={18} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.SaveTheSelectedLogisticsPoint]}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={closeImage}/>
                        </TouchableOpacity>
                    </Box>
                    <Text fontSize={15} fontFamily={'regular'}>{chosenPaczkomat.point_name}</Text>
                    <Text fontSize={15} fontFamily={'regular'}>{chosenPaczkomat.address}</Text>
                    <Box flexDirection={'row'} justifyContent={'space-between'}>
                        <Box flex={1} mr={2}>
                            <Button styleContainer={{...styles.styleContainerBtn, ...styles.btnYes}}
                                    colorText={colors.blue}
                                    onPress={onClose} title={dictionary[DictionaryEnum.No]}/>
                        </Box>
                        <Box flex={1}>
                            <Button styleContainer={styles.styleContainerBtn}
                                    backgroundColor={colors.blue}
                                    colorText={colors.white}
                                    onPress={onPressSave}
                                    title={dictionary[DictionaryEnum.Yes]}/>
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
export default ConfirmationLogisticsPointModal;