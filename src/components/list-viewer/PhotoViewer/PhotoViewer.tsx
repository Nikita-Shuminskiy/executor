import React, {memo} from 'react';
import {Image, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import addPhotoImage from "../../../assets/Images/order/add_photo.png";
import deleteImg from "../../../assets/Images/order/closeCircleGray.png";
import {colors} from "../../../assets/colors/colors";
import {PhotosApprovalType} from "../../../api/type";
import {Box} from "native-base";

type PhotoViewerProps = {
    photo: PhotosApprovalType
    onPressDeletePhoto: (photoId: number) => void
    onPressAddPhoto: () => void
    onPressShowPhoto: (photo: PhotosApprovalType) => void
}
const PhotoViewer = memo(({photo, onPressShowPhoto, onPressDeletePhoto, onPressAddPhoto}: PhotoViewerProps) => {
    const photoNotApproved = photo.approved === 0
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
                        <ImageBackground imageStyle={[{borderRadius: 16}, photoNotApproved && {
                            borderWidth: 3,
                            borderColor: colors.red
                        }]} source={{uri: photo.filename}} borderRadius={16}
                                         style={styles.image}>
                            <TouchableOpacity onPress={() => onPressDeletePhoto(photo.id)}>
                                <Image style={styles.deleteImg} source={deleteImg} alt={'delete'}/>
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        </>
    );
});
const styles = StyleSheet.create({
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