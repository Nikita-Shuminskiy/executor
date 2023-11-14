import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import HeaderGoBackTitle from "../../../components/HeaderGoBackTitle";
import {CommonScreenPropsType, ShiftSetupPayload} from "../../../api/type";
import {useGoBack} from "../../../utils/hook/useGoBack";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import DatePicker from "../../../components/date-picker";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore";
import rootStore from "../../../store/RootStore/root-store";
import {format} from "date-fns";
import FreezeModal from "./FreezeModal";
import {useBurgerMenu} from "../../../components/BurgerMenu/BurgerMenuContext";
import {dateStringFormat} from "../../../utils/commonUtils";
import {isNaN} from "formik";

type ShiftSProps = CommonScreenPropsType & {}
const ShiftS = observer(({navigation}: ShiftSProps) => {
    const {setIsMenuOpen} = useBurgerMenu()
    const {executorSettings} = AuthStore
    const {AuthStoreService} = rootStore
    const isFreeze = !!executorSettings?.executors?.datetime_freeze_until
    const isWorkShift = !!executorSettings?.executors?.datetime_workshift_until
    const [showDatePicker, setShowDatePicker] = useState<'open' | 'snooze' | ''>('')
    const [confirmFreeze, setConfirmFreeze] = useState(false)
    const [chosenDate, setChosenDate] = useState(
        isFreeze ? executorSettings?.executors?.datetime_freeze_until : executorSettings?.executors?.datetime_workshift_until
    )
    const [numberShifts, setNumberShifts] = useState('1')
    const goBack = () => {
        if (showDatePicker) {
            setShowDatePicker('')
            setNumberShifts('')
            return true
        }
        navigation.goBack()
        return true
    }
    useGoBack(goBack)
    const onPressOpenShift = () => {
        setChosenDate(executorSettings?.executors?.datetime_workshift_until)
        setShowDatePicker('open')
    }
    const onPresSnoozeShift = () => {
        setChosenDate(executorSettings?.executors?.datetime_freeze_until)
        setShowDatePicker('snooze')
    }
    const onPressChoseDate = () => {
        setConfirmFreeze(false)
        const formattedDateString = chosenDate ? chosenDate?.replace(/\//g, '-') + 'T00:00:00.000Z' : ''
        const dateObject = chosenDate ? new Date(formattedDateString) : new Date()

        const formattedDate = isNaN(dateObject.getTime()) ? showDatePicker === 'snooze' ? executorSettings?.executors?.datetime_freeze_until : executorSettings?.executors?.datetime_workshift_until : format(dateObject, 'yyyy-MM-dd HH:mm:ss');
        const payload: ShiftSetupPayload = {}

        if (showDatePicker === 'open') {
            payload["datetime_workshift_until"] = formattedDate
            if (numberShifts) {
                payload["ready_for_orders"] = numberShifts
            }
        }
        if (showDatePicker === 'snooze') {
            payload["datetime_freeze_until"] = formattedDate
        }
        AuthStoreService.sendShiftSetup(payload).then((data) => {
            if (data) {
                setShowDatePicker('')
                setNumberShifts('1')
                setIsMenuOpen(true)
            }
        })
    }
    const onOpenConfirmModal = () => {
        if (showDatePicker === 'open') {
            onPressChoseDate()
            return
        }
        setConfirmFreeze(true)
    }
    //executorSettings.executors.ready_for_orders
    const currentTitle = showDatePicker === '' ? 'Open a shift' : showDatePicker === 'snooze' ? 'Snooze shifts until' : 'Open a shift'
    return (
        <BaseWrapperComponent>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={currentTitle}
                                   goBackPress={goBack}/>
            </Box>
            <Box paddingX={10} flex={1} w={'100%'} justifyContent={'center'} alignItems={'center'}>

                {
                    showDatePicker ? <DatePicker onPressChoseDate={onOpenConfirmModal}
                                                 onChangeDate={setChosenDate}
                                                 values={chosenDate}
                                                 amount={numberShifts}
                                                 onChangeAmount={(val) => {
                                                     setNumberShifts(String(val))
                                                 }}
                                                 inputNumber={showDatePicker === 'open'}
                        /> :
                        <>
                            {
                                (isFreeze || isWorkShift) && <Box alignItems={'center'} mb={10}>
                                    <Text fontSize={22}
                                          fontFamily={'regular'}>{isFreeze ? 'Snoozed until' : 'Shift is open until'}</Text>
                                    <Text fontSize={32}
                                          fontFamily={'semiBold'}>{dateStringFormat(isFreeze ? executorSettings?.executors?.datetime_freeze_until : executorSettings?.executors?.datetime_workshift_until, 'dd MMMM yyyy')}</Text>
                                </Box>
                            }

                            <Box w={'100%'}>
                                <Button onPress={onPressOpenShift} styleContainer={styles.styleContainerBtn}
                                        title={isFreeze ? 'Stop snooze and open shift' : 'Open a shift'}
                                        colorText={colors.white} backgroundColor={colors.blue}/>
                            </Box>
                            <Box w={'100%'}>
                                <Button onPress={onPresSnoozeShift} styleContainer={styles.styleContainerBtn}
                                        title={isFreeze ? 'Stop snooze' : 'Snooze shifts'}
                                        colorText={colors.white} backgroundColor={colors.red}/>
                            </Box>
                        </>
                }
            </Box>
            {
                confirmFreeze &&
                <FreezeModal onSend={onPressChoseDate} visible={confirmFreeze} onClose={() => setConfirmFreeze(false)}/>
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
export default ShiftS;