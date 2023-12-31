import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import AuthStore from '../../store/AuthStore/auth-store'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import CustomCheckbox from '../../components/CustomCheckbox'
import Button from '../../components/Button'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import rootStore from '../../store/RootStore/root-store'
import { useBurgerMenu } from '../../components/BurgerMenu/BurgerMenuContext'
import { LanguageEnum } from '../../api/type'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'
import { routerConstants } from '../../constants/routerConstants'

type ChangeLanguageSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const ChangeLanguageS = observer(({ navigation, route }: ChangeLanguageSProps) => {
	const from_exam = route?.params?.exam_passed == 'not_passed'
	const { AuthStoreService } = rootStore
	const { dictionary } = DictionaryStore
	const { executorSettings, getExamEducation } = AuthStore
	const [chosenLang, setChosenLang] = useState<LanguageEnum | ''>('')
	const onChangeLang = (key: LanguageEnum) => {
		setChosenLang(key)
	}
	const { setIsMenuOpen } = useBurgerMenu()
	const onPressSave = () => {
		if (chosenLang === executorSettings.executors.language || chosenLang === '') return
		AuthStoreService.updateExecutor({ language: chosenLang }).then((data) => {
			if (data) {
				if (from_exam) {
					getExamEducation()
					navigation.navigate(routerConstants.EDUCATIONAL_TEXT)
					return
				}
				setIsMenuOpen(true)
			}
		})
	}
	const goBackPress = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={4} mt={3}>
				<HeaderGoBackTitle title={dictionary[DictionaryEnum.Language]} goBackPress={goBackPress} />
			</Box>
			<Box paddingX={4} mb={6} mt={5} flex={1} justifyContent={'space-between'}>
				<Box mt={5}>
					{executorSettings?.languages?.map((lang: LanguageEnum, index) => {
						return (
							<Box
								key={`${lang}-${index}`}
								mb={4}
								paddingY={18}
								borderRadius={16}
								paddingX={5}
								flexDirection={'row'}
								alignItems={'center'}
								justifyContent={'flex-start'}
								backgroundColor={colors.grayBright}
							>
								<CustomCheckbox
									checked={
										chosenLang ? chosenLang === lang : lang === executorSettings.executors.language
									}
									onPress={() => onChangeLang(lang)}
								/>
								<Text ml={2} fontSize={15} fontFamily={'regular'}>
									{lang}
								</Text>
							</Box>
						)
					})}
				</Box>
				<Box>
					<Button
						onPress={onPressSave}
						styleContainer={{ borderRadius: 50 }}
						backgroundColor={colors.blue}
						colorText={colors.white}
						title={dictionary[DictionaryEnum.Save]}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ChangeLanguageS
