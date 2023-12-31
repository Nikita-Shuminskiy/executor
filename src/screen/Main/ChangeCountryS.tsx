import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import CountriesPicker from '../../components/CountriesPicker'
import { CountryCode } from 'react-native-country-picker-modal/lib/types'
import rootStore from '../../store/RootStore/root-store'
import AuthStore from '../../store/AuthStore/auth-store'
import { observer } from 'mobx-react-lite'
import { useBurgerMenu } from '../../components/BurgerMenu/BurgerMenuContext'
import CountriesPopUp from '../../components/pop-up/CountriesPopUp'
import { CountryType } from '../../api/type'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type ChangeCountrySProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChangeCountryS = observer(({ navigation }: ChangeCountrySProps) => {
	const { executorSettings } = AuthStore
	const { dictionary } = DictionaryStore
	const currentCountry = executorSettings.countries.find(
		(country) => country.country === executorSettings.executors.country
	)

	const { AuthStoreService } = rootStore
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu()
	const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(currentCountry)
	const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false)

	const goBack = () => {
		navigation.goBack()
	}
	const onPressSave = () => {
		if (!selectedCountry.country) return
		AuthStoreService.updateExecutor({ country: selectedCountry.country }).then((data) => {
			if (data) {
				setIsMenuOpen(true)
			}
		})
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={4} mb={6} mt={3} flex={1}>
				<Box>
					<HeaderGoBackTitle title={dictionary[DictionaryEnum.Country]} goBackPress={goBack} />
				</Box>
				<Box mt={4}>
					<Text fontSize={15} fontFamily={'regular'} color={colors.grayLight}>
						{dictionary[DictionaryEnum.YouCanAlwaysChangeCountryInYourProfile]}
					</Text>
					<Box mt={4} mb={4}>
						<CountriesPicker
							openCountriesPopUp={setIsCountryPickerVisible}
							selectedCountry={selectedCountry}
						/>
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
			</Box>
			{isCountryPickerVisible && (
				<CountriesPopUp
					text={dictionary[DictionaryEnum.ChoiceOfCountries]}
					saveCountry={setSelectedCountry}
					currentCountry={selectedCountry.country as CountryCode}
					countries={executorSettings.countries}
					visible={isCountryPickerVisible}
					onClose={() => setIsCountryPickerVisible(false)}
				/>
			)}
		</BaseWrapperComponent>
	)
})

export default ChangeCountryS
