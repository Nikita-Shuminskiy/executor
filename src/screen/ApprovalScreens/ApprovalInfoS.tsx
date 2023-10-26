import React, {useCallback, useEffect} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {BackHandler, Image, StyleSheet} from "react-native";
import {colors} from "../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {Box, Text} from "native-base";
import ListImg from "../../assets/Images/Approval/List.png";
import imgBack from "../../assets/Images/backWave.png";
import Button from "../../components/Button";
import {CommonScreenPropsType} from "../../api/type";
import {routerConstants} from "../../constants/routerConstants";
import {useIsFocused} from "@react-navigation/native";

type ApprovalSProps = CommonScreenPropsType & {}
const ApprovalInfoS = ({navigation}: ApprovalSProps) => {
    const isFocused = useIsFocused()
    console.log(isFocused)
    const onPressStartApprovement = () => {
        navigation.navigate(routerConstants.DOCUMENT_VERIFICATION)
    }

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}

                              styleSafeArea={{backgroundColor: colors.white, paddingTop: 0}}>
            <StatusBar backgroundColor={colors.blueLight}/>
            <Box flex={1} w={'100%'} pt={12} alignItems={'center'}
                 backgroundColor={colors.blueLight}>
                <Image style={styles.imgLogo} source={ListImg}/>

                <Box justifyContent={'space-between'} flex={1} w={'100%'}>
                    <Box alignItems={'center'}>
                        <Image style={{width: '100%'}} source={imgBack}/>
                    </Box>
                    <Box w={'100%'} alignItems={'center'} justifyContent={'space-between'}
                         backgroundColor={colors.white}>
                        <Text fontSize={27} textAlign={'center'} fontFamily={'semiBold'}>We need a few photos for the
                            approvement process</Text>
                        <Box mt={3} ml={2} paddingX={7}>
                            <Text textAlign={'left'} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                We will ask you for photos of
                            </Text>
                            <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                &#8226;  your ID document
                            </Text>
                            <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                &#8226;  your ID document next to your face
                            </Text>
                            <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                &#8226;  your washing machine
                            </Text>
                            <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                &#8226;  your ironing equipment
                            </Text>
                            <Text textAlign={'left'} ml={4} fontSize={17} fontFamily={'regular'} color={colors.black}>
                                &#8226;  the room where you are will conduct your work
                            </Text>
                        </Box>

                        <Box paddingX={10} mt={3} w={'100%'}>
                            <Button onPress={onPressStartApprovement} styleContainer={styles.styleContainerBtn}
                                    title={'Start approvement process'}
                                    colorText={colors.white} backgroundColor={colors.blue}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    imgLogo: {
        width: 316,
        height: 316,
    },
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default ApprovalInfoS;