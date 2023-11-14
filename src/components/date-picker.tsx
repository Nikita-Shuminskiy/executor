import React, {useState} from 'react'
import DatePickers, {getFormatedDate} from 'react-native-modern-datepicker'
import {Box, Text} from 'native-base'
import {colors} from "../assets/colors/colors";
import Button from "./Button";
import {StyleSheet} from "react-native";
import InputNumber from "./InputNumber";

type DatePickerPropsType = {
    values: string
    amount: string
    inputNumber: boolean
    onPressChoseDate: () => void
    onChangeDate: (date: string) => void
    onChangeAmount: (val: number) => void
    mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time'
}
const DatePicker = ({
                        values,
                        onPressChoseDate,
                        onChangeAmount,
                        amount,
                        mode = 'calendar',
                        onChangeDate,
                        inputNumber
                    }: DatePickerPropsType) => {
    const onValueChangeDatePicker = (date) => {
        onChangeDate(date)
    }
    return (
        <Box w={'100%'} flex={1} justifyContent={'space-evenly'}>
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
                style={{borderRadius: 10}}
                selectorStartingYear={2000}
                onDateChange={onValueChangeDatePicker}
            />
            <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
                {
                    inputNumber && <Box w={'70%'} justifyContent={'center'} alignItems={'center'}>
                        <Text fontSize={17} fontFamily={'semiBold'}>Number of shifts</Text>
                        <InputNumber
                            values={Number(amount)}
                            onChangeValue={onChangeAmount}
                        />
                    </Box>
                }
            </Box>
            <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Button onPress={onPressChoseDate} styleContainer={styles.styleContainerBtn}
                        title={'Choose date'}
                        colorText={colors.white} backgroundColor={colors.blue}/>
            </Box>
        </Box>
    )
}
const styles = StyleSheet.create({
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default DatePicker
