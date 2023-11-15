import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../api/type";
import AuthStore from "../../store/AuthStore/auth-store";
import {colors} from "../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {Box, Text} from "native-base";
import {Image, StyleSheet} from "react-native";
import imgBack from "../../assets/Images/backWave.png";
import SleepImg from "../../assets/Images/Sleep.png";
import ListRedImg from "../../assets/Images/listRed.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";
import {useGoBack} from "../../utils/hook/useGoBack";
import {authApi} from "../../api/authApi";
import {useIsFocused} from "@react-navigation/native";

type WaitingVerificationProps = CommonScreenPropsType & {}
const WaitingVerificationS = observer(({navigation, route}: WaitingVerificationProps) => {
    const {executorSettings} = AuthStore
    const [intervalId, setIntervalId] = useState<number | null>(null)
    const isFocused = useIsFocused()
    const [status, setStatus] = useState<{ message: string, status: 'ok' | 'waiting' | 'declined' } | null>(null)
    const onPressGoAddPhoto = () => {
        navigation.navigate(routerConstants.DOCUMENT_VERIFICATION)
    }
    const isMissingPhoto = route?.params?.error || status?.status === 'declined' //photos are missing
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    useEffect(() => {
        if (isFocused) {
            const intervalId = +setInterval(() => {
                authApi.getStatusDocumentVerification().then((data: any) => {
                    if (data.data.status === 'ok') {
                        clearInterval(intervalId)
                        return navigation.navigate(routerConstants.EDUCATIONAL_TEST, {exam_passed: false})
                    }
                    setStatus(data.data)
                })
            }, 10000)
            setIntervalId(intervalId)
        } else {
            clearInterval(intervalId)
        }
    }, [isFocused]);
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true} contentContainerStyle={{flexGrow: 1}} styleSafeArea={{
            backgroundColor: colors.white,
            paddingTop: 0
        }}>
            <StatusBar backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight}/>
            <Box justifyContent={'space-between'} pt={20} alignItems={'center'}
                 backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight}>
                <Image style={isMissingPhoto ? styles.imgListRed : styles.imgWaiting}
                       source={isMissingPhoto ? ListRedImg : SleepImg}/>
                <Box justifyContent={'space-between'} w={'100%'}>
                    <Image style={{width: '100%', position: 'relative', top: 1}} source={imgBack}/>
                    <Box paddingX={10} h={365} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
                         backgroundColor={colors.white}>
                        <Box alignItems={'center'} flex={1} justifyContent={'space-evenly'}>
                            <Text fontSize={27}
                                  textAlign={'center'}
                                  fontFamily={'semiBold'}>{isMissingPhoto ? 'Some photos are missing!' : 'Now you need to wait'}</Text>
                            {
                                !isMissingPhoto && <>
                                    <Text textAlign={'center'} fontSize={24} fontFamily={'regular'}
                                    >
                                        Our administrator will check your data
                                    </Text>
                                    <Text textAlign={'center'} fontSize={24} fontFamily={'regular'}
                                    >
                                        You will be notified as this process will go on
                                    </Text>
                                </>
                            }
                            {
                                isMissingPhoto && <Box>
                                    <Text textAlign={'left'} fontSize={17} fontFamily={'regular'} color={colors.black}>Our
                                        Our admin marked photos that have troubles, you will be able to view marked photos
                                    </Text>
                                    <Text textAlign={'left'} mt={5} fontSize={17} fontFamily={'regular'}
                                          color={colors.red}>“{status?.message ?? executorSettings.executors.executor_approve_refuse_text}”</Text>

                                </Box>
                            }
                        </Box>
                        {
                            isMissingPhoto && <Box w={'100%'}>
                                <Button onPress={onPressGoAddPhoto} styleContainer={styles.styleContainerBtn}
                                        title={'Add missing photos'}
                                        colorText={colors.white}
                                        backgroundColor={colors.blue}/>
                            </Box>
                        }

                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    imgWaiting: {
        width: 216,
        height: 258,
    },
    imgListRed: {
        width: 250,
        height: 250,
    },
    styleContainerBtn: {
        borderRadius: 50,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
})
export default WaitingVerificationS;