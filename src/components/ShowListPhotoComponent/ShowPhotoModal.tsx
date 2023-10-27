import React from 'react';
import {Image, ImageBackground, Modal, ScrollView, StyleSheet} from "react-native";
import {ApprovedEnum, PhotosApprovalType} from "../../api/type";
import {Box, Text} from "native-base";
import Button from "../Button";
import {colors} from "../../assets/colors/colors";
import warningImg from '../../assets/Images/Approval/warningRed.png'

type ShowPhotoModalProps = {
    visible: boolean
    onClose: () => void
    photo: PhotosApprovalType
}
const ShowPhotoModal = ({visible, onClose, photo}: ShowPhotoModalProps) => {
    const photoNotApproved = photo.approved === ApprovedEnum.DONT_APPROVED
    return (
        <Modal transparent={true} visible={visible}>
            <ScrollView  contentContainerStyle={{ flexGrow: 1, width: '100%' }}>
                <Box backgroundColor={"rgba(27,24,24,0.65)"} pt={5} flex={1} w={'100%'} alignItems={'center'}
                     justifyContent={'space-evenly'}>
                    <Box>
                        {
                            photoNotApproved && <Image style={styles.imgWarning} source={warningImg}/>
                        }
                        <ImageBackground imageStyle={{borderRadius: 16}} source={{uri: photo.filename}}
                                         borderRadius={16}
                                         style={styles.img}>
                        </ImageBackground>
                        <Box backgroundColor={colors.white} mt={2} borderRadius={16} paddingX={4} paddingY={3}>
                            <Text fontSize={15} fontFamily={'regular'}>This photo was refused by our admin</Text>
                        </Box>
                    </Box>
                    <Box maxWidth={271} mt={2} w={'100%'}>
                        <Button onPress={onClose} styleContainer={styles.styleContainerBtn}
                                title={'Go back'}
                                colorText={colors.white} backgroundColor={colors.blue}/>
                    </Box>

                </Box>
            </ScrollView>
        </Modal>
    );
};
const styles = StyleSheet.create({
    imgWarning: {
        zIndex: 5,
        position: "absolute",
        top: 10,
        right: 10,
        width: 57,
        height: 57
    },
    img: {
        position: 'relative',
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