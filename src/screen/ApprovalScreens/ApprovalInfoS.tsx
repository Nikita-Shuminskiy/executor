import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Image, StyleSheet } from 'react-native'
import { colors } from '../../assets/colors/colors'
import { StatusBar } from 'expo-status-bar'
import { Box, Text } from 'native-base'
import ListImg from '../../assets/Images/Approval/List.png'
import imgBack from '../../assets/Images/backWave.png'
import Button from '../../components/Button'
import { CommonScreenPropsType } from '../../api/type'
import { routerConstants } from '../../constants/routerConstants'
import { useGoBack } from '../../utils/hook/useGoBack'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { observer } from 'mobx-react-lite'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type ApprovalSProps = CommonScreenPropsType & {}
const ApprovalInfoS = observer(({ navigation }: ApprovalSProps) => {
	const { dictionary } = DictionaryStore
	const onPressStartApprovement = () => {
		navigation.navigate(routerConstants.DOCUMENT_VERIFICATION)
	}
	const goBackPress = () => {
		return true
	}
	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent
			isKeyboardAwareScrollView={true}
			styleSafeArea={{ backgroundColor: colors.white, paddingTop: 0 }}
		>
			<StatusBar backgroundColor={colors.blueLight} />
			<Box flex={1} w={'100%'} pt={12} alignItems={'center'} backgroundColor={colors.blueLight}>
				<Image style={styles.imgLogo} source={ListImg} />

				<Box justifyContent={'space-between'} flex={1} w={'100%'}>
					<Box alignItems={'center'}>
						<Image style={{ width: '100%' }} source={imgBack} />
					</Box>
					<Box
						w={'100%'}
						alignItems={'center'}
						justifyContent={'space-between'}
						backgroundColor={colors.white}
					>
						<Text fontSize={27} textAlign={'center'} fontFamily={'semiBold'}>
							{dictionary[DictionaryEnum.NeedPhotos]}
						</Text>
						<Box mt={3} ml={2} paddingX={7}>
							<Text textAlign={'left'} fontSize={17} fontFamily={'regular'} color={colors.black}>
								{dictionary[DictionaryEnum.PhotosOfID]}
							</Text>
							<Text
								textAlign={'left'}
								ml={4}
								fontSize={17}
								fontFamily={'regular'}
								color={colors.black}
							>
								&#8226; {dictionary[DictionaryEnum.YourIDDocument]}
							</Text>
							<Text
								textAlign={'left'}
								ml={4}
								fontSize={17}
								fontFamily={'regular'}
								color={colors.black}
							>
								&#8226; {dictionary[DictionaryEnum.IDNextToFace]}
							</Text>
							<Text
								textAlign={'left'}
								ml={4}
								fontSize={17}
								fontFamily={'regular'}
								color={colors.black}
							>
								&#8226; {dictionary[DictionaryEnum.WashingMachine]}
							</Text>
							<Text
								textAlign={'left'}
								ml={4}
								fontSize={17}
								fontFamily={'regular'}
								color={colors.black}
							>
								&#8226; {dictionary[DictionaryEnum.IroningEquipment]}
							</Text>
							<Text
								textAlign={'left'}
								ml={4}
								fontSize={17}
								fontFamily={'regular'}
								color={colors.black}
							>
								&#8226; {dictionary[DictionaryEnum.RoomForWork]}
							</Text>
						</Box>

						<Box paddingX={10} mt={3} w={'100%'}>
							<Button
								onPress={onPressStartApprovement}
								styleContainer={styles.styleContainerBtn}
								title={dictionary[DictionaryEnum.StartApprovalProcess]}
								colorText={colors.white}
								backgroundColor={colors.blue}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	imgLogo: {
		width: 316,
		height: 316,
	},
	styleContainerBtn: {
		width: '100%',
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 10,
	},
})
export default ApprovalInfoS
