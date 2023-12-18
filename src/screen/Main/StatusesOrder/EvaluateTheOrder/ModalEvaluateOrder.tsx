import React from 'react'
import { Box, Text } from 'native-base'
import { priceDataPayloadType } from './EvaluateTheOrderS'
import { colors } from '../../../../assets/colors/colors'
import { Image, Modal, ScrollView, StyleSheet } from 'react-native'
import Button from '../../../../components/Button'
import { getInfoPriceElement } from '../../../../components/list-viewer/PriceViewer/utils'
import DictionaryStore from '../../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../../store/DictionaryStore/type'

type ModalEvaluateOrderProps = {
	priceDataUnits: priceDataPayloadType
	onClose: () => void
	onSave: () => void
	isOpen: boolean
}
const ModalEvaluateOrder = ({
	priceDataUnits,
	onClose,
	onSave,
	isOpen,
}: ModalEvaluateOrderProps) => {
	const { dictionary } = DictionaryStore
	const dataArrayUnits = Object.entries(priceDataUnits).map(([key, value]) => ({
		[key]: String(value),
	}))
	return (
		<Modal
			visible={isOpen}
			style={{
				backgroundColor: colors.white,
			}}
		>
			<ScrollView
				contentContainerStyle={{ width: '100%', flexGrow: 1, justifyContent: 'space-between' }}
				showsVerticalScrollIndicator={false}
			>
				<Box paddingX={4} mt={2}>
					<Text fontSize={22} mb={2} fontFamily={'semiBold'}>
						{dictionary[DictionaryEnum.ConfirmYourOrder]}
					</Text>
					{dataArrayUnits.map((unit, index) => {
						const [key, value] = Object.entries(unit)[0]
						if (value === '0') return
						const getInfo = getInfoPriceElement(key)
						return (
							<Box
								key={`${index}-${key}`}
								p={3}
								style={styles.shadow}
								borderRadius={20}
								flexDirection={'row'}
								mt={2}
								mb={2}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Box alignItems={'center'} flexDirection={'row'}>
									<Image alt={'img'} style={styles.img} source={getInfo?.img} />
									<Text ml={2} fontSize={15} fontFamily={'semiBold'}>
										{getInfo?.name}
									</Text>
								</Box>
								<Text fontSize={15} fontFamily={'semiBold'}>
									x{value}
								</Text>
							</Box>
						)
					})}
				</Box>
				<Box flexDirection={'row'} mt={2} mb={2} paddingX={4} justifyContent={'space-between'}>
					<Box flex={1} mr={2}>
						<Button
							styleContainer={{ ...styles.styleContainerBtn, ...styles.btnYes }}
							colorText={colors.blue}
							onPress={onClose}
							title={dictionary[DictionaryEnum.Cansel]}
						/>
					</Box>
					<Box flex={1}>
						<Button
							styleContainer={styles.styleContainerBtn}
							backgroundColor={colors.blue}
							colorText={colors.white}
							onPress={onSave}
							title={dictionary[DictionaryEnum.Continue]}
						/>
					</Box>
				</Box>
			</ScrollView>
		</Modal>
	)
}
const styles = StyleSheet.create({
	shadow: {
		backgroundColor: colors.white,
		margin: 5,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.21,
		shadowRadius: 2.68,
		elevation: 3,
	},
	styleContainerBtn: {
		borderRadius: 28,
		height: 56,
	},
	img: {
		width: 48,
		height: 48,
	},
	btnYes: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
})
export default ModalEvaluateOrder
