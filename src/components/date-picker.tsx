import React from 'react'
import DatePickers, {getFormatedDate} from 'react-native-modern-datepicker'
import {Box} from 'native-base'
import {colors} from "../assets/colors/colors";
import {Modal} from "react-native";
import {BlurView} from "expo-blur";
import Background from "./Background";

type DatePickerPropsType = {
    values: string
    isOpen: boolean
    onClose: () => void
    onChangeDate: (date: string) => void
    mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time'
}
const DatePicker = ({
                        values,
                        onClose,
                        isOpen,
                        mode = 'calendar',
                        onChangeDate
                    }: DatePickerPropsType) => {
    const onValueChangeDatePicker = (date) => {
        onChangeDate(date)
        onClose()
    }
    return (
        <Modal transparent={false} visible={isOpen}>
            <BlurView style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }} intensity={10}>
                <Background onClose={onClose}/>
                <Box w={'100%'} paddingX={4} justifyContent={'center'}>
                    <DatePickers
                        options={{
                            backgroundColor: colors.white,
                            textHeaderColor: colors.black,
                            textDefaultColor: colors.black,
                            selectedTextColor: colors.white,
                            mainColor: colors.blue,
                            textSecondaryColor: colors.grayLight,
                            borderColor: colors.grayLight,
                        }}
                        selected={getFormatedDate(values ? new Date(values) : new Date(), 'YYYY/MM/DD')}
                        mode={mode}
                        style={{borderRadius: 24}}
                        selectorStartingYear={2000}
                        onDateChange={onValueChangeDatePicker}
                    />
                </Box>
            </BlurView>
        </Modal>
    )
}

export default DatePicker
