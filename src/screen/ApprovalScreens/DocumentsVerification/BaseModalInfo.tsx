import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import closeImage from '../../../assets/Images/order/closeCircleGray.png'
import Button from '../../../components/Button'
import DictionaryStore, { DictionaryType } from '../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

type BaseModalInfoProps = {
	visible: boolean
	dictionary: DictionaryType
	onClose: () => void
}

const BaseModalInfo = ({ visible, onClose, dictionary }: BaseModalInfoProps) => {
	return (
		<Modal transparent={true} visible={visible}>
			<Box
				backgroundColor={`rgba(0, 0, 0, 0.3)`}
				opacity={0.7}
				position={'absolute'}
				w={'100%'}
				top={0}
				height={'100%'}
			/>
			<Box w={'100%'} paddingX={3} justifyContent={'center'} height={'100%'}>
				<Box
					paddingX={4}
					paddingY={4}
					borderRadius={16}
					justifyContent={'space-between'}
					flex={1}
					backgroundColor={colors.white}
					maxHeight={144}
				>
					<Text fontSize={15} textAlign={'center'} fontFamily={'semiBold'}>
						{dictionary[DictionaryEnum.AddAtLeastOnePhoto]}
					</Text>
					<Box alignItems={'center'}>
						<Button
							styleContainer={styles.styleContainerBtn}
							backgroundColor={colors.blue}
							colorText={colors.white}
							onPress={onClose}
							title={dictionary[DictionaryEnum.OK]}
						/>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
const styles = StyleSheet.create({
	styleContainerBtn: {
		borderRadius: 50,
		width: 99,
		height: 34,
		padding: 0,
		minHeight: 10,
	},
})
export default BaseModalInfo
