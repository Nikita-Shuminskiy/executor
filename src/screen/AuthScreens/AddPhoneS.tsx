import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { routerConstants } from '../../constants/routerConstants'
import AuthStore from '../../store/AuthStore/auth-store'
import { countryDataDefault } from '../../utils/constants'
import { PhoneNumberInput } from '../../components/PhoneNumberFieldMask'
import { Country } from 'react-native-country-picker-modal'
import { useGoBack } from '../../utils/hook/useGoBack'
import { observer } from 'mobx-react-lite'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type PhoneVerifySProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}

const AddPhoneS = observer(({ navigation, route }: PhoneVerifySProps) => {
	const { AuthStoreService } = rootStore
	const isFromUpdate = route.params?.from === 'update'
	const { setPhone: setVerifyPhone, executorSettings } = AuthStore
	const { dictionary } = DictionaryStore
	const [phone, setPhone] = useState<string>('')
	const [disabledBtn, setDisableBtn] = useState<boolean>(false)

	const [country, setCountry] = useState<Country>(countryDataDefault)
	const [isValidPhone, setIsValidPhone] = useState<boolean>(false)

	const onPressSendSMS = () => {
		if (!isValidPhone || !phone) {
			return setDisableBtn(true)
		}
		const formattedPhoneNumber = `${country.callingCode[0]} ${phone}`
		if (isFromUpdate && !!(isValidPhone && !disabledBtn)) {
			if (executorSettings?.executors.phone === formattedPhoneNumber) {
				return
			}
			AuthStoreService.updateExecutor({
				phone: formattedPhoneNumber,
			}).then((data) => {
				if (data) {
					setVerifyPhone(formattedPhoneNumber)
					navigation.navigate(routerConstants.VERIFY_NUMBER, { from: 'update' })
				}
			})
			return
		}

		if (isValidPhone && !disabledBtn) {
			setVerifyPhone(formattedPhoneNumber)
			AuthStoreService.sendCode(formattedPhoneNumber).then((data) => {
				if (data) {
					navigation.navigate(routerConstants.VERIFY_NUMBER)
				}
			})
		}
	}

	const onChangeTextPhone = (text: string, isValid: boolean) => {
		setIsValidPhone(isValid)
		setDisableBtn(false)
		setPhone(text)
	}

	const onPressChangeCountry = (country: Country) => {
		setCountry(country)
		setIsValidPhone(true)
		setPhone('')
		setDisableBtn(false)
	}
	const goBackPress = () => {
		return true
	}
	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent>
			{/*  {
                isFromUpdate && <Box position={'relative'} top={3} paddingX={5}>
                    <ArrowBack goBackPress={goBackPress}/>
                </Box>
            }*/}
			<Box flex={1} justifyContent={'center'} alignItems={'center'} paddingX={5}>
				<Box alignItems={'center'} mb={10}>
					<Text fontSize={22} mb={2} fontFamily={'semiBold'}>
						{dictionary[DictionaryEnum.PhoneVerification]}
					</Text>
					<Text fontSize={15} color={colors.grayLight} fontFamily={'regular'}>
						{dictionary[DictionaryEnum.WeNeedPhoneNum]}
					</Text>
				</Box>
				<PhoneNumberInput
					phoneValue={phone}
					country={country}
					setCountry={onPressChangeCountry}
					onValidNumber={setIsValidPhone}
					errorMessage={dictionary[DictionaryEnum.IncorrectConfirmationCode]}
					placeholder={dictionary[DictionaryEnum.Phone]}
					onChangeTextPhone={onChangeTextPhone}
					isRequired={true}
					isInvalid={disabledBtn}
					countries={executorSettings.countries}
				/>
				<Box mt={10} w={'100%'} alignItems={'center'}>
					<Button
						styleContainer={{ maxWidth: 280, width: '100%', opacity: disabledBtn ? 0.3 : 1 }}
						backgroundColor={colors.blue}
						colorText={colors.white}
						onPress={onPressSendSMS}
						title={dictionary[DictionaryEnum.SendSMS]}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default AddPhoneS
