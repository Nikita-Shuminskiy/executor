import React from 'react';
import {Image, Modal, StyleSheet} from "react-native";
import {PhotosApprovalType} from "../../api/type";
import {Box} from "native-base";
import Button from "../Button";
import {colors} from "../../assets/colors/colors";

type ShowPhotoModalProps = {
    visible: boolean
    onClose: () => void
    photo: PhotosApprovalType
}
const ShowPhotoModal = ({visible, onClose, photo}: ShowPhotoModalProps) => {
    return (
        <Modal transparent={true} visible={visible}>
            <Box backgroundColor={"rgba(27,24,24,0.65)"} flex={1} w={'100%'} alignItems={'center'}
                 justifyContent={'space-evenly'}>
                <Image style={[styles.img, photo.approved === 0 && {
                    borderWidth: 3,
                    borderColor: colors.red
                }]} source={{uri: photo.filename}} alt={'img'}/>
                <Box maxWidth={271} mt={1} w={'100%'}>
                    <Button onPress={onClose} styleContainer={styles.styleContainerBtn}
                            title={'Go back'}
                            colorText={colors.white} backgroundColor={colors.blue}/>
                </Box>
            </Box>
        </Modal>
    );
};
const styles = StyleSheet.create({
    img: {
        maxWidth: 271,
        width: '100%',
        height: 400,
        borderRadius: 16
    },
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})

export default ShowPhotoModal;