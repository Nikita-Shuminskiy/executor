import React, {memo} from 'react';
import {ActivityIndicator, Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import addPhotoImage from "../../../assets/Images/order/add_photo.png";
import deleteImg from "../../../assets/Images/order/closeCircleGray.png";
import {ApprovedEnum, PhotosApprovalType} from "../../../api/type";
import warningImg from '../../../assets/Images/Approval/warningRed.png'
import {colors} from "../../../assets/colors/colors";

type PhotoViewerProps = {
    photo: PhotosApprovalType
    onPressDeletePhoto: (photoId: number) => void
    onPressAddPhoto: () => void
    onPressShowPhoto: (photo: PhotosApprovalType) => void
}
const PhotoViewer = memo(({photo, onPressShowPhoto, onPressDeletePhoto, onPressAddPhoto}: PhotoViewerProps) => {
    const photoNotApproved = photo.approved === ApprovedEnum.DONT_APPROVED
    const onPressShowPhotoHandler = () => {
        onPressShowPhoto(photo)
    }
    return (
        <>
            {
                photo.id === 'add_photo_button' ? (
                    <TouchableOpacity style={styles.addPhotoButton} onPress={onPressAddPhoto}>
                        <Image style={{width: 64, height: 64}} source={addPhotoImage} alt={'add_photo'}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onPressShowPhotoHandler}>
                        <ImageBackground imageStyle={{borderRadius: 16}} source={{uri: photo.filename}}
                                         borderRadius={16}
                                         style={styles.image}>
                        {/*    <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={colors.blue} />
                            </View>*/}
                            <TouchableOpacity onPress={() => onPressDeletePhoto(photo.id)}>
                                <Image style={styles.deleteImg} source={deleteImg} alt={'delete'}/>
                            </TouchableOpacity>
                            {
                                photoNotApproved && <Image style={styles.imgWarning} source={warningImg}/>
                            }
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        </>
    );
});
const styles = StyleSheet.create({
    loadingContainer: {
        borderRadius: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    progressBar: {
        height: 10,
        backgroundColor: colors.blue,
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    imgWarning: {
        position: "absolute",
        top: 8,
        right: 7,
        width: 49,
        height: 49
    },
    deleteImg: {
        position: 'absolute',
        top: -5,
        right: -10,
        width: 28,
        height: 28,
    },
    addPhotoButton: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 64,
        height: 64,
        margin: 10,
    },
})
export default PhotoViewer;