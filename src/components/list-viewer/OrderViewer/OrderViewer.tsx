import React, { memo } from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import arrowBlue from '../../../assets/Images/order/arrowRightBlue.png'
import { getLastStepStatusOrder } from './utils'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import { LAST_STEP_ORDER_ENUM, OrderType } from '../../../api/type'
import DictionaryStore from '../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

type OrderViewerProps = {
	order: OrderType
	index: number
	onPressDetails: (order: any) => void
}
const OrderViewer = observer(({ order, onPressDetails, index }: OrderViewerProps) => {
	const { dictionary } = DictionaryStore
	const getCurrData = getLastStepStatusOrder(
		order.last_step?.trim(),
		order.date_estimated_ready,
		dictionary
	)
	return (
		<Box p={2} mt={index === 0 ? 6 : 2} style={styles.shadow} borderRadius={20}>
			<Box flexDirection={'row'} mb={2} alignItems={'center'} justifyContent={'flex-start'}>
				<Box mr={2}>
					<Image style={{ width: 40, height: 40 }} source={getCurrData?.img} />
				</Box>
				<Box>
					<Text fontFamily={'semiBold'} fontSize={17}>
						Swash #{order.id}
					</Text>
					<Text fontFamily={'regular'} fontSize={13}>
						{getCurrData?.text}
					</Text>
				</Box>
			</Box>
			<Box>
				<TouchableOpacity onPress={() => onPressDetails(order)}>
					<Box
						paddingY={18}
						borderRadius={16}
						paddingX={5}
						flexDirection={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
						backgroundColor={colors.grayBright}
					>
						<Text fontFamily={'semiBold'} fontSize={13} color={colors.blue}>
							{dictionary[DictionaryEnum.Details]}
						</Text>
						<Image source={arrowBlue} alt={'arrow'} />
					</Box>
				</TouchableOpacity>
			</Box>
		</Box>
	)
})
const styles = StyleSheet.create({
	shadow: {
		backgroundColor: colors.white,
		margin: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.21,
		shadowRadius: 7.68,
		elevation: 5,
	},
})
export default OrderViewer
