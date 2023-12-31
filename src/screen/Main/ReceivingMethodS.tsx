import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { CommonScreenPropsType } from '../../api/type'
import { Box } from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import InputCustom from '../../components/TextInput'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { useBurgerMenu } from '../../components/BurgerMenu/BurgerMenuContext'
import { Keyboard } from 'react-native'
import { routerConstants } from '../../constants/routerConstants'
import { useGoBack } from '../../utils/hook/useGoBack'
import { observer } from 'mobx-react-lite'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type ReceivingMethodSProps = CommonScreenPropsType & {}
const ReceivingMethodS = observer(({ navigation }: ReceivingMethodSProps) => {
	const { dictionary } = DictionaryStore
	const [data, setData] = useState({
		accNumber: '',
		name: '',
	})
	const isDisabledBtn = !data.accNumber || !data.name
	const { setIsMenuOpen } = useBurgerMenu()
	const { AuthStoreService } = rootStore
	const goBack = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBack)
	const onChangeData = (text: string, key) => {
		setData((prev) => {
			return {
				...data,
				[key]: text,
			}
		})
	}
	const onPressSave = () => {
		Keyboard.dismiss()
		const { accNumber, name } = data
		AuthStoreService.updateExecutor({ account_number: accNumber, full_name: name }).then((data) => {
			if (data) {
				setIsMenuOpen(true)
			}
		})
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			<Box paddingX={4} mt={3} mb={5}>
				<HeaderGoBackTitle
					title={dictionary[DictionaryEnum.AddReceivingMethod]}
					goBackPress={goBack}
				/>
			</Box>
			<Box paddingX={4}>
				<Box mb={4}>
					<InputCustom
						borderRadius={12}
						borderColor={colors.grayBright}
						placeholder={dictionary[DictionaryEnum.AccountNumber]}
						label={dictionary[DictionaryEnum.AccountNumber]}
						value={data.accNumber}
						placeholderTextColor={'#B0BAC1'}
						onChangeText={(e) => onChangeData(e, 'accNumber')}
						//maxLength={19}
					/>
				</Box>
				<Box>
					<InputCustom
						borderRadius={12}
						borderColor={colors.grayBright}
						placeholder={dictionary[DictionaryEnum.FullName]}
						label={dictionary[DictionaryEnum.AccountOwner]}
						value={data.name}
						placeholderTextColor={'#B0BAC1'}
						onChangeText={(e) => onChangeData(e, 'name')}
					/>
				</Box>
				<Box mt={10} flex={1} w={'100%'} alignItems={'center'}>
					<Button
						styleContainer={{ maxWidth: 280, width: '100%', borderRadius: 28 }}
						backgroundColor={isDisabledBtn ? colors.bluePale : colors.blue}
						colorText={colors.white}
						onPress={onPressSave}
						title={dictionary[DictionaryEnum.AddReceivingMethod]}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ReceivingMethodS
