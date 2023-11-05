import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {CommonScreenPropsType} from "../../../api/type";
import {Box, Progress, Text} from "native-base";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import {routerConstants} from "../../../constants/routerConstants";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore/auth-store";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {StatusBar} from "expo-status-bar";
import {useIsFocused} from "@react-navigation/native";

type EducationalTextSProps = CommonScreenPropsType & {}
const EducationalTextS = observer(({navigation}: EducationalTextSProps) => {
    const {examEducationText, getExamNextQuestion} = AuthStore
    const isFocused = useIsFocused()
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    useEffect(() => {
        if (isFocused && !isRunning) {
            setIsRunning(true)
        }
        if (!isFocused) {
            setIsRunning(false)
            setSeconds(0)
        }

    }, [isFocused]);
    useEffect(() => {
        if (isRunning && seconds < 60) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        } else if (seconds === 60) {
            setIsRunning(false)
        }
    }, [isRunning, seconds])
    const onPressGoToExam = () => {
        getExamNextQuestion().then((data) => {
            data && navigation.navigate(routerConstants.EXAM)
        })
    }
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingTop={10} alignItems={'center'} justifyContent={'center'}>
                <Box paddingX={4}>
                    <Text fontFamily={'regular'} mb={7} textAlign={'left'} fontSize={17}>
                        {examEducationText}
                    </Text>
                </Box>
                <Box w={'100%'} mb={3} mt={5}>
                    <Progress position={'absolute'} max={60} w={'100%'} height={3} _filledTrack={{
                        bg: "#0DA62F"
                    }} value={seconds}/>
                </Box>
                <Box flex={1} w={'100%'} alignItems={'center'} mt={5} mb={5}>

                    <Button onPress={onPressGoToExam} styleContainer={styles.styleContainerBtn}
                            title={'Finish reading, go to the exam'}
                            colorText={colors.white}
                            //disabled={isRunning}
                            backgroundColor={isRunning ? '#D0D0D0' : colors.orange}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        maxWidth: 280,
        width: '100%',
        marginBottom: 10
    },
})
export default EducationalTextS;