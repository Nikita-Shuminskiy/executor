import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import closeImage from '../../assets/Images/order/closeCircleGray.png'
import Button from '../Button'
import { colors } from '../../assets/colors/colors'

type BaseModalProps = {
	visible: boolean
	onClose: () => void
	deleteOrderPhoto: () => void
}
const DeletePhotoModal = ({ visible, onClose, deleteOrderPhoto }: BaseModalProps) => {
	const onPressDelete = () => {
		deleteOrderPhoto()
		onClose()
	}
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
					style={{ paddingHorizontal: 16 }}
					borderRadius={16}
					justifyContent={'space-evenly'}
					flex={1}
					backgroundColor={colors.white}
					maxHeight={186}
				>
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Text fontSize={22} fontFamily={'semiBold'}>
							Delete photo ?
						</Text>
						<TouchableOpacity onPress={onClose}>
							<Image source={closeImage} />
						</TouchableOpacity>
					</Box>

					<Box flexDirection={'row'} justifyContent={'space-between'}>
						<Box flex={1} mr={2}>
							<Button
								styleContainer={styles.styleContainerBtn}
								backgroundColor={colors.blue}
								colorText={colors.white}
								onPress={onClose}
								title={'No'}
							/>
						</Box>
						<Box flex={1}>
							<Button
								styleContainer={{ ...styles.styleContainerBtn, ...styles.btnYes }}
								colorText={colors.blue}
								onPress={onPressDelete}
								title={'Yes'}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
const styles = StyleSheet.create({
	styleContainerBtn: {
		borderRadius: 28,
		height: 56,
	},
	btnYes: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
})
export default DeletePhotoModal
