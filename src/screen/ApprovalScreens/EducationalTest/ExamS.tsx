import React, {useState} from 'react';
import {CommonScreenPropsType} from "../../../api/type";
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import CustomCheckbox from "../../../components/CustomCheckbox";
import {Box, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";
import {StyleSheet} from "react-native";
import imgCorrect from '../../../assets/Images/EducationTest/correct.png'
import ModalEducation from "./ModalEducation";
import {StatusBar} from "expo-status-bar";
import ArrowBackImg from '../../../assets/Images/arrow-right-orange.png'
import ArrowBack from "../../../components/ArrowBack";
import {generateBoxShadowStyle} from "../../../utils/commonUtils";
import ModalExit from "./ModalExit";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore/auth-store";
import NotificationStore from "../../../store/NotificationStore/notification-store";
import {LoadingEnum} from "../../../store/types/types";
import {routerConstants} from "../../../constants/routerConstants";

type QuestionSProps = CommonScreenPropsType & {}
const ExamS = observer(({navigation}: QuestionSProps) => {
    const {getExamAnswer, examData, getExamNextQuestion} = AuthStore
    const {setLocalLoading} = NotificationStore
    const [exit, setExit] = useState(false)
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [statusAnswer, setStatusAnswer] = useState<'ok' | 'Wrong answer' | ''>('')
    const onChangeAnswer = (answer: string) => {
        setCurrentAnswer(answer)
    }
    const onPressAnswer = () => {
        getExamAnswer(currentAnswer).then((data) => {
            console.log(data, 'datadata')
            setStatusAnswer(data.message)
            setCurrentAnswer('')
        })
    }
    const onPressNextQuestion = () => {
        setStatusAnswer('')
        setLocalLoading(LoadingEnum.fetching)
        getExamNextQuestion()
            .then((data) => {
                if(data === 'Exam_passed') {
                    alert('Exam_passed')
                   // return navigation.navigate(routerConstants.EDUCATIONAL_TEST, {exam_passed: true})
                }
            })
            .finally(() => {
            setLocalLoading(LoadingEnum.success)
        })
    }
    const goBackPress = () => {
        setExit(true)
    }
    console.log(examData?.answered)
    console.log(examData?.total)
    const generateShadow = generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 10, '#171717')
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingX={4}>
                <Box mb={8}>
                    <ArrowBack img={ArrowBackImg} goBackPress={goBackPress}/>
                </Box>
                <Box mb={5} style={generateShadow} backgroundColor={colors.white} borderRadius={16} p={5}>
                    <Text color={colors.orange} mb={3} textAlign={'center'} fontSize={20}
                          fontFamily={'semiBold'}>{`${examData?.answered}/${examData?.total}`}</Text>
                    <Text fontSize={15} textAlign={'left'} fontFamily={'regular'}>
                        {examData?.question}
                    </Text>
                </Box>
                {
                    examData?.answers?.map((answer) => {
                        return <Box backgroundColor={colors.grayBright} borderRadius={20} paddingY={4} paddingX={4}
                                    key={answer}
                                    flexDirection={'row'} alignItems={'center'}
                                    justifyContent={'flex-start'}
                                    mb={3}
                        >
                            <CustomCheckbox
                                checked={currentAnswer === answer}
                                onPress={() => onChangeAnswer(answer)}/>
                            <Box ml={2}>
                                <Text fontSize={15} fontFamily={'regular'}>{answer}</Text>
                            </Box>
                        </Box>
                    })
                }
                <Box flex={1} w={'100%'} alignItems={'center'} mt={2} mb={5}>
                    <Button onPress={onPressAnswer} styleContainer={styles.styleContainerBtn}
                            disabled={!currentAnswer}
                            title={'Answer'}
                            colorText={colors.white}
                            backgroundColor={!currentAnswer ? colors.grayVeryLight : colors.orange}/>
                </Box>
            </Box>
            {
                statusAnswer === 'ok' &&
                <ModalEducation textBtn={'Next question'} img={imgCorrect} textBody={'Correct!'}
                                visible={true}
                                onClose={onPressNextQuestion}/>
            }
            {
                statusAnswer === 'Wrong answer' &&
                <ModalEducation textBtn={'Start over'} img={imgCorrect} textBody={'Incorrect'}
                                visible={true}
                                onClose={() => {
                                    navigation.navigate(routerConstants.EDUCATIONAL_TEXT)
                                    setStatusAnswer('')
                                }}/>
            }
            {
                exit && <ModalExit textBtn={'Yes, exit the exam'}
                                   onCloseModal={() => setExit(false)}
                                   textBody={'Are you sure? You would need to start over the exam'} visible={exit}
                                   onPress={() => {
                                       setCurrentAnswer('')
                                       navigation.navigate(routerConstants.EDUCATIONAL_TEST)
                                   }}/>
            }
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        maxWidth: 280,
        width: '90%',
    },
})

export default ExamS;