import React from 'react'
import DatePickers, { getFormatedDate } from 'react-native-modern-datepicker'
import { Box } from 'native-base'
import { colors } from '../assets/colors/colors'

type DatePickerPropsType = {
	values: string
	onChangeDate: (date: string) => void
	mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time'
}
const DatePicker = ({ values, mode = 'calendar', onChangeDate }: DatePickerPropsType) => {
	const onValueChangeDatePicker = (date) => {
		onChangeDate(date)
	}
	return (
		<Box w={'100%'} justifyContent={'center'}>
			<DatePickers
				options={{
					backgroundColor: colors.white,
					textHeaderColor: colors.black,
					textDefaultColor: colors.black,
					defaultFont: 'regular',
					textFontSize: 19,
					headerFont: 'regular',
					selectedTextColor: colors.white,
					mainColor: colors.blue,
					textSecondaryColor: colors.gray,
					borderColor: colors.gray,
				}}
				selected={getFormatedDate(values ? new Date(values) : new Date(), 'YYYY/MM/DD')}
				mode={mode}
				style={{ borderRadius: 24 }}
				selectorStartingYear={2000}
				onDateChange={onValueChangeDatePicker}
			/>
		</Box>
	)
}

export default DatePicker
