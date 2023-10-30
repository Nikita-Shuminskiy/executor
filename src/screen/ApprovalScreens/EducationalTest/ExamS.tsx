import React from 'react';
import {CommonScreenPropsType} from "../../../api/type";
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import CustomCheckbox from "../../../components/CustomCheckbox";
import {Box, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import Button from "../../../components/Button";
import {StyleSheet} from "react-native";
import BaseModalInfo from "../../../components/modal/BaseModalInfo";
import imgCorrect from '../../../assets/Images/EducationTest/correct.png'
import imgInCorrect from '../../../assets/Images/EducationTest/incorrect.png'
import ModalEducation from "./ModalEducation";
import {StatusBar} from "expo-status-bar";

type QuestionSProps = CommonScreenPropsType & {}
const ExamS = ({navigation}: QuestionSProps) => {
    const onChangeCheckBox = (val: boolean) => {

    }
    const onPressAnswer = () => {

    }
    const onCloseModal = () => {

    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingX={4}>
                <Box backgroundColor={colors.grayBright} borderRadius={20} paddingY={4} paddingX={4}
                     flexDirection={'row'} alignItems={'center'}
                     justifyContent={'flex-start'}
                     mb={3}
                >
                    <CustomCheckbox
                        checked={false}
                        onPress={() => onChangeCheckBox(false)}/>
                    <Box ml={2}>
                        <Text fontSize={15} fontFamily={'regular'}>question</Text>
                    </Box>
                </Box>
                <Box flex={1} w={'100%'} alignItems={'center'} mt={2} mb={5}>
                    <Button onPress={onPressAnswer} styleContainer={styles.styleContainerBtn}
                            title={'Answer'}
                            colorText={colors.white} backgroundColor={colors.orange}/>
                </Box>
            </Box>
           {/* <ModalEducation textBtn={'Next question'} img={imgCorrect} textBody={'Correct!'} visible={true}
                            onClose={onCloseModal}/>*/}
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        maxWidth: 280,
        width: '90%',
    },
})
export default ExamS;