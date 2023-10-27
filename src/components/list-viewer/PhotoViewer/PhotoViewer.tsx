import React, {memo} from 'react';
import {Image, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import addPhotoImage from "../../../assets/Images/order/add_photo.png";
import deleteImg from "../../../assets/Images/order/closeCircleGray.png";
import {ApprovedEnum, PhotosApprovalType} from "../../../api/type";
import warningImg from '../../../assets/Images/Approval/warningRed.png'

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