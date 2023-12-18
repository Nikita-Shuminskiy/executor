import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore/auth-store";
import {Box, Image, Text} from "native-base";
import HeaderGoBackTitle from "../../../components/HeaderGoBackTitle";
import {CommonScreenPropsType, ShiftSetupPayload} from "../../../api/type";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import snowflakeImg from '../../../assets/Images/snowflake.png'
import DatePicker from "../../../components/date-picker";
import {dateStringFormat} from "../../../utils/commonUtils";
import {isNaN} from "formik";
import {format} from "date-fns";
import rootStore from "../../../store/RootStore/root-store";
import {useBurgerMenu} from "../../../components/BurgerMenu/BurgerMenuContext";
import {routerConstants} from "../../../constants/routerConstants";
import {useGoBack} from "../../../utils/hook/useGoBack";

type CloseShiftSProps = CommonScreenPropsType & {}
const CloseShiftS = observer(({navigation}: CloseShiftSProps) => {
    const {executorSettings} = AuthStore
    const {setIsMenuOpen} = useBurgerMenu()
    const {AuthStoreService} = rootStore
    const [chosenDate, setChosenDate] = useState('')
    const onChangeDateHandler = (chosenDate: string) => {
        setChosenDate(chosenDate)
    }
    const goBack = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBack)
    const sendData = () => {
        const formattedDateString = chosenDate ? chosenDate?.replace(/\//g, '-') + 'T00:00:00.000Z' : ''
        const dateObject = chosenDate ? new Date(formattedDateString) : new Date()
        const formattedDate = isNaN(dateObject.getTime()) ? executorSettings?.executors?.datetime_workshift_until : format(dateObject, 'yyyy-MM-dd');
        AuthStoreService.sendShiftSetup({datetime_freeze_until: formattedDate}).then((data) => {
            if (data) {
                setIsMenuOpen(true)
            }
        })
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={'Snooze shifts until'}
                                   goBackPress={goBack}/>
                <Text mt={4} fontSize={28} fontFamily={'semiBold'}>Suspension</Text>
                <Text mt={2} fontSize={17} fontFamily={'regular'} color={colors.gray}>Specify by what date you will
                    stop
                    receiving notifications with an offer to open a shift</Text>
                {
                    executorSettings?.executors?.datetime_freeze_until &&
                    <Text mt={7} w={'70%'} fontSize={28} borderBottomWidth={1} borderColor={colors.grayLight}
                          fontFamily={'semiBold'}
                          color={colors.blue}>{dateStringFormat(executorSettings?.executors?.datetime_freeze_until, 'dd MMMM yyyy')}</Text>
                }
                <Box mt={3}>
                    <DatePicker
                        onChangeDate={onChangeDateHandler}
                        values={executorSettings?.executors?.datetime_freeze_until}
                    />
                </Box>
                <Box mt={3} w={'100%'}>
                    <Button onPress={sendData} styleContainer={styles.styleContainerBtn}
                            colorText={colors.white} backgroundColor={colors.red}>
                        <Image alt={'img'} style={{width: 24, height: 24}} source={snowflakeImg}/>
                        <Text ml={2} fontSize={15} color={colors.white} fontFamily={'semiBold'}>Suspend work</Text>
                    </Button>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    styleContainerBtn: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default CloseShiftS;