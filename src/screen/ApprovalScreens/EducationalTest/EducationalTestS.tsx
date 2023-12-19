import React, { useEffect } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { CommonScreenPropsType } from '../../../api/type'
import { Box, Text } from 'native-base'
import imgBack from '../../../assets/Images/backWave.png'
import imgHat from '../../../assets/Images/EducationTest/Hat.png'
import imgFirework from '../../../assets/Images/EducationTest/firework.png'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { Image, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { routerConstants } from '../../../constants/routerConstants'
import { useGoBack } from '../../../utils/hook/useGoBack'
import AuthStore from '../../../store/AuthStore/auth-store'
import rootStore from '../../../store/RootStore/root-store'
import DictionaryStore from '../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

type EducationalTestSProps = CommonScreenPropsType & {}
const EducationalTestS = observer(({ navigation, route }: EducationalTestSProps) => {
	const isExamPassed = route.params?.exam_passed
	const { getExamEducation, getExamNextQuestion } = AuthStore
	const { dictionary } = DictionaryStore
	const { AuthStoreService } = rootStore
	useEffect(() => {
		getExamEducation()
	}, [])
	const onPressStart = () => {
		if (!isExamPassed) return navigation.navigate(routerConstants.EDUCATIONAL_TEXT)
		AuthStoreService.getSettingExecutor(navigation.navigate)
	}
	const goBackPress = () => {
		return true
	}
	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent
			styleSafeArea={{ backgroundColor: colors.white, paddingTop: 0 }}
			isKeyboardAwareScrollView={true}
		>
			<StatusBar backgroundColor={colors.orangeLight} />
			<Box
				justifyContent={'space-between'}
				pt={20}
				alignItems={'center'}
				backgroundColor={colors.orangeLight}
			>
				<Image style={styles.imgLogo} source={isExamPassed ? imgFirework : imgHat} />
				<Box justifyContent={'space-between'} w={'100%'}>
					<Box alignItems={'center'}>
						<Image style={{ width: '100%', position: 'relative', top: 1 }} source={imgBack} />
					</Box>
					<Box
						paddingX={10}
						h={305}
						w={'100%'}
						alignItems={'center'}
						justifyContent={'space-between'}
						backgroundColor={colors.white}
					>
						<Box>
							<Text fontSize={27} mb={6} textAlign={'center'} fontFamily={'semiBold'}>
								{isExamPassed
									? dictionary[DictionaryEnum.Congratulations]
									: dictionary[DictionaryEnum.IntroductoryCourse]}{' '}
							</Text>
							<Text textAlign={'center'} fontSize={15} fontFamily={'regular'}>
								{isExamPassed
									? dictionary[DictionaryEnum.YouveSuccessfullyTtraining]
									: dictionary[DictionaryEnum.TrainingAim]}
							</Text>
						</Box>
						<Button
							onPress={onPressStart}
							styleContainer={styles.styleContainerBtn}
							title={
								isExamPassed
									? dictionary[DictionaryEnum.ProceedToSwash]
									: dictionary[DictionaryEnum.StartTraining]
							}
							colorText={colors.white}
							backgroundColor={colors.orange}
						/>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	imgLogo: {
		width: 276,
		height: 296,
	},
	styleContainerBtn: {
		borderRadius: 28,
		width: '100%',
		marginBottom: 10,
	},
})
export default EducationalTestS
