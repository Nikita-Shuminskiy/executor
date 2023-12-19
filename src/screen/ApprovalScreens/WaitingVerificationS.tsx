import React, { useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { CommonScreenPropsType } from '../../api/type'
import AuthStore from '../../store/AuthStore/auth-store'
import { colors } from '../../assets/colors/colors'
import { StatusBar } from 'expo-status-bar'
import { Box, Text } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import imgBack from '../../assets/Images/backWave.png'
import SleepImg from '../../assets/Images/Sleep.png'
import ListRedImg from '../../assets/Images/listRed.png'
import Button from '../../components/Button'
import { routerConstants } from '../../constants/routerConstants'
import { useGoBack } from '../../utils/hook/useGoBack'
import { authApi } from '../../api/authApi'
import { useIsFocused } from '@react-navigation/native'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

type WaitingVerificationProps = CommonScreenPropsType & {}
const WaitingVerificationS = observer(({ navigation, route }: WaitingVerificationProps) => {
	const { dictionary } = DictionaryStore
	const { executorShortData, setExecutorShortData } = AuthStore
	const [intervalId, setIntervalId] = useState<number | null>(null)
	const isFocused = useIsFocused()
	const [status, setStatus] = useState<{
		status: 'ok' | 'waiting' | 'declined'
	} | null>(null)
	const onPressGoAddPhoto = () => {
		navigation.navigate(routerConstants.DOCUMENT_VERIFICATION)
	}
	const isMissingPhoto = route?.params?.error || status?.status === 'declined' //photos are missing
	const goBackPress = () => {
		return true
	}
	useGoBack(goBackPress)
	useEffect(() => {
		if (isFocused) {
			const intervalId = +setInterval(() => {
				authApi.getSettingExecutorShort().then((data) => {
					if (data?.data?.executors.message === 'ok') {
						clearInterval(intervalId)
						return navigation.navigate(routerConstants.EDUCATIONAL_TEST, { exam_passed: false })
					}
					setExecutorShortData(data?.data)
					setStatus({ status: data?.data?.executors?.message })
				})
			}, 10000)
			setIntervalId(intervalId)
		} else {
			clearInterval(intervalId)
		}
	}, [isFocused])
	return (
		<BaseWrapperComponent
			isKeyboardAwareScrollView={true}
			contentContainerStyle={{ flexGrow: 1 }}
			styleSafeArea={{
				backgroundColor: colors.white,
				paddingTop: 0,
			}}
		>
			<StatusBar backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight} />
			<Box
				justifyContent={'space-between'}
				pt={20}
				alignItems={'center'}
				backgroundColor={isMissingPhoto ? colors.redLight : colors.blueLight}
			>
				<Image
					style={isMissingPhoto ? styles.imgListRed : styles.imgWaiting}
					source={isMissingPhoto ? ListRedImg : SleepImg}
				/>
				<Box justifyContent={'space-between'} w={'100%'}>
					<Image style={{ width: '100%', position: 'relative', top: 1 }} source={imgBack} />
					<Box
						paddingX={10}
						h={365}
						w={'100%'}
						alignItems={'center'}
						justifyContent={'space-evenly'}
						backgroundColor={colors.white}
					>
						<Box alignItems={'center'} flex={1} justifyContent={'space-evenly'}>
							<Text fontSize={27} textAlign={'center'} fontFamily={'semiBold'}>
								{isMissingPhoto
									? `${dictionary[DictionaryEnum.MissingPhotos]}`
									: `${dictionary[DictionaryEnum.Wait]}`}
							</Text>
							{!isMissingPhoto && (
								<>
									<Text textAlign={'center'} fontSize={24} fontFamily={'regular'}>
										{dictionary[DictionaryEnum.AdminCheckData]}
									</Text>
									<Text textAlign={'center'} fontSize={24} fontFamily={'regular'}>
										{dictionary[DictionaryEnum.NotificationOnProcess]}
									</Text>
								</>
							)}
							{isMissingPhoto && (
								<Box>
									<Text
										textAlign={'left'}
										fontSize={17}
										fontFamily={'regular'}
										color={colors.black}
									>
										{dictionary[DictionaryEnum.OurAdminMarkedPhotos]}
									</Text>
									<Text
										textAlign={'left'}
										mt={5}
										fontSize={17}
										fontFamily={'regular'}
										color={colors.red}
									>
										“{executorShortData?.executors?.executor_approve_refuse_text ?? ''}”
									</Text>
								</Box>
							)}
						</Box>
						{isMissingPhoto && (
							<Box w={'100%'}>
								<Button
									onPress={onPressGoAddPhoto}
									styleContainer={styles.styleContainerBtn}
									title={dictionary[DictionaryEnum.AddMissingPhotos]}
									colorText={colors.white}
									backgroundColor={colors.blue}
								/>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	imgWaiting: {
		width: 216,
		height: 258,
	},
	imgListRed: {
		width: 250,
		height: 250,
	},
	styleContainerBtn: {
		borderRadius: 50,
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
	},
})
export default WaitingVerificationS
