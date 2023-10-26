import React, {useState} from 'react';
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

type WaitingVerificationProps = CommonScreenPropsType & {}
const WaitingVerificationS = observer(({navigation}: WaitingVerificationProps) => {
    const [isMissingPhoto, setIsMissingPhoto] = useState<boolean>(false)
    const {executorSettings} = AuthStore
    const onPressGoAddPhoto = () => {
        navigation.navigate(routerConstants.DOCUMENT_VERIFICATION)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true} contentContainerStyle={{flexGrow: 1}} styleSafeArea={{
            backgroundColor: isMissingPhoto ? colors.redLight : colors.redLight,
            paddingTop: 0
        }}>
            <StatusBar backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight}/>
            <Box justifyContent={'space-between'} pt={20} alignItems={'center'}
                 backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight}>
                <Image style={isMissingPhoto ?  styles.imgListRed : styles.imgWaiting }
                       source={isMissingPhoto ? ListRedImg : SleepImg}/>
                <Box justifyContent={'space-between'} w={'100%'}>
                    <Box alignItems={'center'}>
                        <Image style={{width: '100%'}} source={imgBack}/>
                    </Box>
                    <Box paddingX={10} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
                         backgroundColor={colors.white}>
                        <Box  alignItems={'center'} flex={1} justifyContent={'space-evenly'}>
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
                                    <Text textAlign={'left'} fontSize={17} fontFamily={'regular'} color={colors.black}>Photos
                                        that was problematic:</Text>
                                    <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'}
                                          color={colors.black}>&#8226;  your ID document - “refusal comment”</Text>
                                    <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'}
                                          color={colors.black}>&#8226;  your washing machine - “refusal comment”</Text>
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
        width: 232,
        height: 278,
    },
    imgListRed: {
        width: 300,
        height: 300,
    },
    styleContainerBtn: {
        borderRadius: 50,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
})
export default WaitingVerificationS;