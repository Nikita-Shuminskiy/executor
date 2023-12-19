import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { Box, Image, Text } from 'native-base'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { CommonScreenPropsType } from '../../../api/type'
import { useGoBack } from '../../../utils/hook/useGoBack'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../../store/AuthStore'
import rootStore from '../../../store/RootStore/root-store'
import { useBurgerMenu } from '../../../components/BurgerMenu/BurgerMenuContext'
import arrowBackImg from '../../../assets/Images/arrowBackBlue.png'
import InputNumber from '../../../components/InputNumber'
import { routerConstants } from '../../../constants/routerConstants'
import DictionaryStore from '../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

type ShiftSProps = CommonScreenPropsType & {}
const OpenShiftS = observer(({ navigation }: ShiftSProps) => {
	const { setIsMenuOpen } = useBurgerMenu()
	const { dictionary } = DictionaryStore
	const { executorSettings } = AuthStore
	const { AuthStoreService } = rootStore
	const [openShiftsValue, setOpenShiftsValue] = useState('1')
	const [isConfirmation, setIsConfirmation] = useState(false)
	const goBack = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBack)

	const onPressOpenShift = () => {
		AuthStoreService.sendShiftSetup({ ready_for_orders: openShiftsValue }).then((data) => {
			if (data) {
				setIsMenuOpen(true)
			}
		})
	}

	return (
		<BaseWrapperComponent>
			<Box paddingX={4} mt={3}>
				<HeaderGoBackTitle title={''} goBackPress={goBack} />
			</Box>
			<Box
				paddingX={4}
				borderColor={'#E4E4E4'}
				backgroundColor={colors.white}
				flex={1}
				justifyContent={'center'}
				alignItems={'center'}
			>
				{isConfirmation ? (
					<>
						<Text fontSize={34} fontFamily={'semiBold'}>
							{dictionary[DictionaryEnum.Confirmation]}
						</Text>
						<Text fontSize={16} color={colors.gray} textAlign={'center'} fontFamily={'regular'}>
							{dictionary[DictionaryEnum.AreYouSureYouWantToOpenAShiftWith]}
							<Text fontSize={17} fontFamily={'semiBold'} color={colors.black}>
								{` ${openShiftsValue} ${dictionary[DictionaryEnum.Orders]}`}?
							</Text>{' '}
							{dictionary[DictionaryEnum.ThisNumberCannotBeChangedLater]}
						</Text>
						<Box
							w={'80%'}
							mt={4}
							justifyContent={'center'}
							flexDirection={'row'}
							alignItems={'center'}
						>
							<Button
								styleContainer={{
									borderWidth: 1,
									width: 56,
									height: 56,
									borderColor: colors.blue,
									borderRadius: 28,
									marginRight: 8,
								}}
								onPress={() => setIsConfirmation(false)}
							>
								<Image alt={'arrow-back'} source={arrowBackImg} w={5} h={5} />
							</Button>
							<Button
								onPress={onPressOpenShift}
								styleContainer={styles.styleContainerBtn}
								title={dictionary[DictionaryEnum.Confirm]}
								colorText={colors.white}
								backgroundColor={colors.blue}
							/>
						</Box>
					</>
				) : (
					<>
						<Box alignItems={'center'}>
							<Text fontSize={34} fontFamily={'semiBold'}>
								{dictionary[DictionaryEnum.OpenShift]}
							</Text>
							<Text fontSize={16} color={colors.gray} fontFamily={'regular'}>
								{dictionary[DictionaryEnum.EnterNumberOfOrders]}
							</Text>
						</Box>
						{openShiftsValue && (
							<Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
								<InputNumber values={Number(openShiftsValue)} onChangeValue={setOpenShiftsValue} />
								<Box w={'100%'} mt={4} justifyContent={'center'} alignItems={'center'}>
									<Button
										onPress={() => setIsConfirmation(true)}
										styleContainer={styles.styleContainerBtn}
										title={dictionary[DictionaryEnum.Open]}
										colorText={colors.white}
										backgroundColor={colors.blue}
									/>
								</Box>
							</Box>
						)}
					</>
				)}
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	styleContainerBtn: {
		width: '100%',
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 10,
	},
})
export default OpenShiftS
