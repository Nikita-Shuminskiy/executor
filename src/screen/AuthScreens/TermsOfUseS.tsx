import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import { StatusBar } from 'expo-status-bar'
import { Box, Text } from 'native-base'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import listImg from '../../assets/Images/listTermUse.png'
import imgBack from '../../assets/Images/backWave.png'
import Button from '../../components/Button'
import { CheckBoxs } from '../../components/CheckBox'
import rootStore from '../../store/RootStore/root-store'
import { observer } from 'mobx-react-lite'
import { format } from 'date-fns'
import { openBrowserAsync } from 'expo-web-browser'
import { useGoBack } from '../../utils/hook/useGoBack'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type TermsOfUseSProps = {
	navigation: NavigationProp<ParamListBase>
}
const TermsOfUseS = observer(({ navigation }: TermsOfUseSProps) => {
	const { AuthStoreService } = rootStore
	const [checkToc, setCheckToc] = useState(false)
	const [checkLegal, setCheckLegal] = useState(false)
	const [disBtn, setDisBtn] = useState(false)
	const { dictionary } = DictionaryStore
	const onPressContinue = () => {
		if (!checkLegal || !checkToc) {
			setDisBtn(true)
			return
		}
		const currentDate = new Date()
		const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss')
		AuthStoreService.sendConsentDateTime({
			consent_datetime: formattedDate,
		}).then((data) => {
			if (data) {
				AuthStoreService.getSettingExecutor(navigation.navigate)
			}
		})
	}
	const onPressTocHandler = (value) => {
		setCheckToc(value)
		setDisBtn(false)
	}
	const onPressLegalHandler = (value) => {
		setCheckLegal(value)
		setDisBtn(false)
	}
	const styleDisBtn = !checkLegal || !checkToc ? 'rgba(0,148,255,0.45)' : colors.blue
	const onPressLink = async (link: string) => {
		try {
			await openBrowserAsync(link)
		} catch (error) {
			console.log(error.message)
		}
	}
	const goBackPress = () => {
		return true
	}

	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent
			isKeyboardAwareScrollView={true}
			styleSafeArea={{ backgroundColor: colors.blueLight }}
		>
			<StatusBar backgroundColor={colors.blueLight} />
			<Box
				flex={1}
				w={'100%'}
				justifyContent={'space-between'}
				alignItems={'center'}
				backgroundColor={colors.blueLight}
			>
				<Image style={styles.imgLogo} source={listImg} />
				<Box justifyContent={'space-between'} w={'100%'}>
					<Box alignItems={'center'}>
						<Image style={{ width: '100%' }} source={imgBack} />
					</Box>
					<Box
						paddingX={2}
						h={475}
						w={'100%'}
						alignItems={'center'}
						justifyContent={'space-evenly'}
						backgroundColor={colors.white}
					>
						<Box flex={1} w={'100%'} alignItems={'center'}>
							<Text fontSize={28} fontFamily={'semiBold'}>
								{dictionary[DictionaryEnum.TermsOfUse]}
							</Text>
							<Box mt={3} w={'100%'}>
								<Box
									borderRadius={16}
									flexDirection={'row'}
									justifyContent={'flex-start'}
									alignItems={'center'}
									p={3}
									backgroundColor={colors.blueLight}
								>
									<CheckBoxs value={checkToc} onPress={onPressTocHandler} />

									<Box flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
										<Text ml={2} flex={2} fontSize={15} fontFamily={'regular'}>
											{dictionary[DictionaryEnum.IAgreeWith]}{' '}
										</Text>
										<TouchableOpacity
											onPress={() => onPressLink('https://www.s-wash.com/docs/termofservice.html')}
											style={styles.link}
										>
											<Text color={colors.blue} fontFamily={'regular'}>
												{dictionary[DictionaryEnum.TOC]}
											</Text>
										</TouchableOpacity>
									</Box>
								</Box>
								<Box
									borderRadius={16}
									mt={3}
									flexDirection={'row'}
									justifyContent={'flex-start'}
									alignItems={'center'}
									p={3}
									flexGrow={1}
									backgroundColor={colors.blueLight}
								>
									<CheckBoxs value={checkLegal} onPress={onPressLegalHandler} />
									<Box flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
										<Text ml={2} flex={2} fontSize={15} fontFamily={'regular'}>
											{dictionary[DictionaryEnum.IAgreeWith]}{' '}
										</Text>
										<TouchableOpacity
											onPress={() => onPressLink('https://www.s-wash.com/docs/privacy.html')}
											style={styles.link}
										>
											<Text color={colors.blue} fontFamily={'regular'}>
												{dictionary[DictionaryEnum.LegalNotice]}
											</Text>
										</TouchableOpacity>
									</Box>
								</Box>
							</Box>
						</Box>
						<Box flex={1} alignItems={'center'} w={'100%'} justifyContent={'center'}>
							<Button
								disabled={disBtn}
								onPress={onPressContinue}
								styleContainer={{ ...styles.styleContainerBtn }}
								title={dictionary[DictionaryEnum.Continue]}
								colorText={colors.white}
								backgroundColor={styleDisBtn}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	disBtn: {
		opacity: 0.1,
	},
	borderBottom: { borderBottomWidth: 1, borderBottomColor: colors.blue },
	link: { flex: 1, flexWrap: 'nowrap' },
	imgLogo: {
		width: 230,
		height: 230,
	},
	styleContainerBtn: {
		maxWidth: 280,
		width: '100%',
		borderRadius: 50,
		marginBottom: 20,
	},
})

export default TermsOfUseS
