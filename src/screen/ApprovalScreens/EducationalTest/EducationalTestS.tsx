import React from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../../api/type";
import {Box, Text} from "native-base";
import imgBack from '../../../assets/Images/backWave.png'
import imgHat from '../../../assets/Images/EducationTest/Hat.png'
import imgFirework from '../../../assets/Images/EducationTest/firework.png'
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {Image, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {routerConstants} from "../../../constants/routerConstants";
import {useGoBack} from "../../../utils/hook/useGoBack";
import AuthStore from "../../../store/AuthStore/auth-store";

type EducationalTestSProps = CommonScreenPropsType & {}
const EducationalTestS = observer(({navigation, route}: EducationalTestSProps) => {
    const isExamPassed = route.params.exam_passed
const {getExamEducation, getExamAnswer, examNextQuestion} = AuthStore
    const onPressStart = () => {
        examNextQuestion()
        //if (!isExamPassed) return navigation.navigate(routerConstants.EDUCATIONAL_TEXT)
    }
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent styleSafeArea={{backgroundColor: colors.white, paddingTop: 0}}
                              isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.orangeLight}/>
            <Box justifyContent={'space-between'} pt={20} alignItems={'center'}
                 backgroundColor={colors.orangeLight}>
                <Image style={styles.imgLogo} source={isExamPassed ? imgFirework : imgHat}/>
                <Box justifyContent={'space-between'} w={'100%'}>
                    <Box alignItems={'center'}>
                        <Image style={{width: '100%', position: 'relative', top: 1}} source={imgBack}/>
                    </Box>
                    <Box paddingX={10} h={305} w={'100%'} alignItems={'center'} justifyContent={'space-between'}
                         backgroundColor={colors.white}>
                        <Box>
                            <Text fontSize={27} mb={6} textAlign={'center'}
                                  fontFamily={'semiBold'}>{isExamPassed ? 'Congratulations!' : 'We ask you to pass our introductory course'} </Text>
                            <Text textAlign={'center'} fontSize={15} fontFamily={'regular'}>
                                {isExamPassed ? "You’ve successfully passed the training" : "Our aim with this training is to help you minimize errors to provide efficient laundry service, ensuring greater customer satisfaction."}
                            </Text>
                        </Box>
                        <Button onPress={onPressStart} styleContainer={styles.styleContainerBtn}
                                title={isExamPassed ? 'Proceed to Swash!' : 'Start training'}
                                colorText={colors.white} backgroundColor={colors.orange}/>
                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    imgLogo: {
        width: 316,
        height: 336,
    },
    styleContainerBtn: {
        borderRadius: 28,
        width: '100%',
        marginBottom: 10
    },
})
export default EducationalTestS;