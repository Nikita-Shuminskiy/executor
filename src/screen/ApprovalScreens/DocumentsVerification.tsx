import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType, PhotoCategoryEnum, PhotosApprovalType} from "../../api/type";
import {Box, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import ShowListPhoto from "../../components/ShowListPhotoComponent/ShowListPhoto";
import rootStore from "../../store/RootStore/root-store";
import {colors} from "../../assets/colors/colors";
import AuthStore from "../../store/AuthStore/auth-store";
import Button from "../../components/Button";
import {StyleSheet} from "react-native";
import {routerConstants} from "../../constants/routerConstants";
import BaseModalInfo from "../../components/modal/BaseModalInfo";
import {StatusBar} from "expo-status-bar";

type DocumentsVerificationProps = CommonScreenPropsType & {}
const DocumentsVerification = observer(({navigation}: DocumentsVerificationProps) => {
    const {AuthStoreService} = rootStore
    const {executorSettings} = AuthStore
    const [dataCategories, setDataCategories] = useState<{ [key: string]: PhotosApprovalType[] }>({})
    const [disableBtn, setDisableBtn] = useState(false)

    useEffect(() => {
        if (executorSettings.executor_photos_for_approval?.length) {
            setDataCategories((prevDataCategories) => {
                const updatedDataCategories = {...prevDataCategories};
                executorSettings.executor_photos_for_approval.forEach((category) => {
                    if (category.admins_verdict === 'approved') return
                    const categoryType = category.type_of_photo;
                    if (updatedDataCategories[categoryType]) {
                        const existingItem = updatedDataCategories[categoryType].find(item => item.id === category.id);
                        if (!existingItem) {
                            updatedDataCategories[categoryType].push(category);
                        }
                    } else {
                        updatedDataCategories[categoryType] = [category];
                    }
                });
                return updatedDataCategories;
            });
        }
    }, [executorSettings.executor_photos_for_approval?.length]);
    const onSavePhotoHandler = (photo: string, type_of_photo: PhotoCategoryEnum) => {
        setDisableBtn(false)
        AuthStoreService.sendPhotosForApproval({photo, type_of_photo})
    }
    const onDeletePhotoHandler = (photoId: number, type: PhotoCategoryEnum) => {
        setDisableBtn(false)
        AuthStoreService.deletePhoto(photoId).then((data) => {
            if (data) {
                setDataCategories((prevDataCategories) => {
                    const updatedDataCategories = {...prevDataCategories};
                    if (updatedDataCategories[type]) {
                        const indexToRemove = updatedDataCategories[type].findIndex(item => item.id === photoId);
                        if (indexToRemove !== -1) {
                            updatedDataCategories[type].splice(indexToRemove, 1);
                        }
                    }
                    return updatedDataCategories;
                });
            }
        })
    }
    const onPressStartUpload = () => {
        const dataDoc = dataCategories[PhotoCategoryEnum.DOC]?.length
        const dataFace = dataCategories[PhotoCategoryEnum.FACE]?.length
        const dataWash = dataCategories[PhotoCategoryEnum.WASH]?.length
        const dataIron = dataCategories[PhotoCategoryEnum.IRON]?.length
        const dataAddress = dataCategories[PhotoCategoryEnum.ADDRESS]?.length
        const dataRoom = dataCategories[PhotoCategoryEnum.ROOM]?.length
        if (!dataDoc || !dataFace || !dataWash || !dataIron || !dataAddress || !dataRoom) {
            setDisableBtn(true)
            return
        }
        navigation.navigate(routerConstants.WAITING_VERIFICATION)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingX={4}>
                <Box mb={5}>
                    <ArrowBack/>
                </Box>
                <Box mb={6}>
                    {
                        !!executorSettings.executors.executor_approve_refuse_text && (
                            <Text fontSize={17} mb={4} color={colors.red} fontFamily={'regular'}
                                  textAlign={'center'}>“{executorSettings.executors.executor_approve_refuse_text}”</Text>
                        )
                    }
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>ID document</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.DOC)}
                                   data={dataCategories[PhotoCategoryEnum.DOC]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.DOC)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Take a picture of the page with your photo</Text>
                </Box>
                <Box mb={6}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>ID document near to your face</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.FACE)}
                                   data={dataCategories[PhotoCategoryEnum.FACE]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.FACE)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Take a selfie with your ID document face photo
                        page</Text>
                </Box>
                <Box mb={6}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>Washing machine</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.WASH)}
                                   data={dataCategories[PhotoCategoryEnum.WASH]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.WASH)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Add photos of your washing machine</Text>
                </Box>
                <Box mb={6}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>Ironing equipment</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.IRON)}
                                   data={dataCategories[PhotoCategoryEnum.IRON]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.IRON)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Add photos of your ironing equipment and your washing
                        room</Text>
                </Box>
                <Box mb={6}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>Washing room</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.ROOM)}
                                   data={dataCategories[PhotoCategoryEnum.ROOM]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.ROOM)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Take a few photos of the room where you will
                        conduct your work</Text>
                </Box>
                <Box mb={6}>
                    <Text fontSize={22} fontFamily={'semiBold'} textAlign={'left'}>Working address registration</Text>
                    <ShowListPhoto savePhoto={(photo) => onSavePhotoHandler(photo, PhotoCategoryEnum.ADDRESS)}
                                   data={dataCategories[PhotoCategoryEnum.ADDRESS]}
                                   deletePhoto={(photoId) => onDeletePhotoHandler(photoId, PhotoCategoryEnum.ADDRESS)}/>
                    <Box borderBottomWidth={1} mb={2} borderColor={colors.grayBright}/>
                    <Text fontSize={17} fontFamily={'regular'}>Take photos of documents confirming registration
                        on your working address</Text>
                </Box>
                <Box paddingX={10} mt={3} w={'100%'}>
                    <Button onPress={onPressStartUpload} disabled={disableBtn} styleContainer={styles.styleContainerBtn}
                            title={'Upload'}
                            colorText={colors.white} backgroundColor={disableBtn ? colors.red : colors.blue}/>
                </Box>
            </Box>
            {
                disableBtn && <BaseModalInfo visible={disableBtn} onClose={() => setDisableBtn(false)}/>
            }
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default DocumentsVerification;