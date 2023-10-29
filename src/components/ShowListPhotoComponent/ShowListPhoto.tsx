import React, {useCallback, useEffect, useRef, useState} from 'react'
import {FlatList, Image, Modal, Platform, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Camera, CameraType, FlashMode,} from 'expo-camera'
import {observer} from 'mobx-react-lite'
import btnCamera from '../../assets/Images/order/blue-circle.png'
import closeCameraImg from '../../assets/Images/order/closeBlack.png'
import DeletePhotoModal from '../modal/DeletePhotoModal'
import * as ImagePicker from 'expo-image-picker'
import {Box} from 'native-base'
import {Ionicons} from '@expo/vector-icons'
import {colors} from '../../assets/colors/colors'
import {PhotosApprovalType} from "../../api/type";
import turnImg from "../../assets/Images/turnWhite.png";
import PhotoViewer from "../list-viewer/PhotoViewer/PhotoViewer";
import ShowPhotoModal from "./ShowPhotoModal";

type AddPhotoComponentProps = {
    savePhoto: (photo: string) => void
    deletePhoto: (photoId: number) => void
    data: PhotosApprovalType[]
}

const ShowListPhoto = observer(({deletePhoto, savePhoto, data}: AddPhotoComponentProps) => {
    const [cameraPermission, setCameraPermission] = useState(null)
    const [isOpenCamera, setIsOpenCamera] = useState(false)
    const [ratio, setRatio] = useState<string>('')
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back)
    const [deletedPhotoId, setDeletedPhotoId] = useState<any>() //can use id 'add_photo_button'
    const [flashMode, setFlashMode] = React.useState<FlashMode>(FlashMode.off)
    const [chosenPhoto, setChosenPhoto] = React.useState<PhotosApprovalType>(null)
    const cameraRef = useRef(null)
    useEffect(() => {
        getCameraPermission()
    }, [])
    const getCameraPermission = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(status === 'granted')
        return status
    }
    const takePicture = async () => {
        try {
            const photo = await cameraRef.current.takePictureAsync()
            savePhoto(photo.uri)
            setIsOpenCamera(false)
        } catch (e) {
            console.log(e, 'takePicture')
        }
    }
    const onCloseModalDelete = () => {
        setIsDeleteModal(false)
    }
    const onGalleryHandler = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
            })
            setIsOpenCamera(false)
            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                const selectedImageUri = selectedAsset.uri
                savePhoto(selectedImageUri)
            }
        } catch (error) {
            console.log('Error selecting image from gallery:', error)
        }
    }
    const onPressDeletePhoto = useCallback((photoId: number) => {
        setDeletedPhotoId(photoId)
        setIsDeleteModal(true)
    }, [])
    const onPressAddPhoto = useCallback(() => {
        if (!cameraPermission) {
            getCameraPermission().then((data) => {
                if (data === 'granted') {
                    setIsOpenCamera(true)
                }
            })
        }
        setIsOpenCamera(true)
    }, [])
    const onPressShowPhoto = useCallback((photo: PhotosApprovalType) => {
        setChosenPhoto(photo)
    }, [])
    const onDeleteShowPhoto = () => {
        setChosenPhoto(null)
    }
    const renderItem = ({item}: { item: PhotosApprovalType }) => {
        return <PhotoViewer photo={item} onPressShowPhoto={onPressShowPhoto} onPressAddPhoto={onPressAddPhoto}
                            onPressDeletePhoto={onPressDeletePhoto}/>
    }
    const flashModeHandler = () => {
        if (flashMode === FlashMode.torch) {
            setFlashMode(FlashMode.off)
        } else if (flashMode === FlashMode.off) {
            setFlashMode(FlashMode.torch)
        }
    }

    useEffect(() => {
        if(Platform.OS !== 'ios') {
            if ((cameraPermission && isOpenCamera) && (cameraRef.current && !ratio)) {
                (async () => {
                    const getSupportedRatios = await cameraRef.current.getSupportedRatiosAsync()
                    console.log(getSupportedRatios, 'getSupportedRatios')
                    setRatio(getSupportedRatios[getSupportedRatios.length - 1])
                })();
            }
        }
    }, [cameraPermission, cameraType, isOpenCamera]);
    const changeCameraType = () => {
        setCameraType(cameraType === CameraType.front ? CameraType.back : CameraType.front)
    }
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    horizontal
                    data={data?.length ? [{id: 'add_photo_button', filename: ''}, ...data] : [{
                        id: 'add_photo_button',
                        filename: ''
                    }]}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'flex-start',
                        paddingBottom: 10,
                    }}
                    style={{width: '100%'}}
                    showsHorizontalScrollIndicator={true}
                    /*	persistentScrollbar={true}*/
                    keyExtractor={(item, index) => index.toString()}
                />
                <DeletePhotoModal deleteOrderPhoto={() => deletePhoto(deletedPhotoId)}
                                  visible={isDeleteModal}
                                  onClose={onCloseModalDelete}/>
            </View>
            {cameraPermission && isOpenCamera && (
                <Modal visible={isOpenCamera}>
                    <Camera ratio={ratio ? ratio :'16:9'} type={cameraType} flashMode={flashMode}
                            style={styles.camera}
                            ref={cameraRef}>
                        <Box position={'absolute'} top={'5%'} left={5}>
                            <TouchableOpacity onPress={() => setIsOpenCamera(false)}>
                                <Image source={closeCameraImg} alt={'delete'}/>
                            </TouchableOpacity>
                        </Box>
                        <Box borderRadius={50} w={50} h={50} alignItems={'center'} justifyContent={'center'}
                             position={'absolute'}
                             top={'15%'}
                             right={5}
                        >
                            <TouchableOpacity
                                onPress={changeCameraType}
                            >
                                <Image alt={'btn'} source={turnImg}/>

                            </TouchableOpacity>
                        </Box>
                        <Box borderRadius={50} w={50} h={50} alignItems={'center'} justifyContent={'center'}
                             position={'absolute'}
                             top={'5%'}
                             right={5}
                             backgroundColor={flashMode === FlashMode.off ? '#000' : '#fff'}>
                            <TouchableOpacity
                                onPress={flashModeHandler}
                            >
                                <Ionicons name='ios-flashlight' size={30} color={colors.blue}/>

                            </TouchableOpacity>
                        </Box>
                        <Box position={'absolute'} bottom={5}>
                            <TouchableOpacity onPress={takePicture}>
                                <Image source={btnCamera}/>
                            </TouchableOpacity>
                        </Box>
                        <Box position={'absolute'} bottom={5} right={5}>
                            <TouchableOpacity
                                style={styles.btnGallery}
                                onPress={onGalleryHandler}>
                            </TouchableOpacity>
                        </Box>
                    </Camera>
                </Modal>
            )}
            {
                chosenPhoto && <ShowPhotoModal visible={!!chosenPhoto} onClose={onDeleteShowPhoto} photo={chosenPhoto}/>
            }
        </>
    )
})

const styles = StyleSheet.create({
    btnGallery: {backgroundColor: colors.gray, opacity: 0.8, width: 80, height: 80, borderRadius: 16},
    deleteImg: {
        position: 'absolute',
        top: -5,
        right: -10,
        width: 28,
        height: 28,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flexGrow: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        borderRadius: 16,
        margin: 10,
    },
})

export default ShowListPhoto
