import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet } from 'react-native'
import { Box, Image, Pressable, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { useBurgerMenu } from './BurgerMenuContext'
import BurgerLink from './BurgerLink'
import countryImg from '../../assets/Images/BurgerMenu/CountryBlue.png'
import exclamationMarkImg from '../../assets/Images/BurgerMenu/exclamationMarkBlue.png'
import questionMarkImg from '../../assets/Images/BurgerMenu/questionMarkBlue.png'
import repeatImg from '../../assets/Images/BurgerMenu/repeatBlue.png'
import walletImg from '../../assets/Images/BurgerMenu/walletBlue.png'
import Button from '../Button'
import AvatarUser from './AvatarUser'
import BaseBottomPopUp from '../pop-up/BaseBottomPopUp'
import rootStore from '../../store/RootStore/root-store'
import AuthStore from '../../store/AuthStore/auth-store'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { routerConstants } from '../../constants/routerConstants'
import { isFutureDate } from '../../utils/commonUtils'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'

const BurgerMenu = observer(() => {
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu()
	const [isOpenLogout, setIsLogout] = useState<boolean>(false)
	const { dictionary } = DictionaryStore
	const toValue = isMenuOpen ? 0 : -1000
	const menuPosition = useRef(new Animated.Value(toValue)).current
	const { AuthStoreService, OrdersStoreService, ChatStoreService } = rootStore
	const { executorSettings, clearStore } = AuthStore
	const navigation = useNavigation<any>()
	const isFreeze =
		isFutureDate(executorSettings?.executors?.datetime_freeze_until) ||
		!executorSettings?.executors?.datetime_workshift_until ||
		!(+executorSettings.executors.ready_for_orders >= 1) // проверка -  если true - исполнитель не принимает заказы и ему нужно открыть смену
	const toggleMenu = () => {
		Animated.timing(menuPosition, {
			toValue,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}

	useEffect(() => {
		toggleMenu()
	}, [isMenuOpen])
	const onPressLogOut = () => {
		setIsLogout(true)
	}
	const logOutHandler = () => {
		AuthStoreService.logout().then((data) => {
			if (data) {
				navigation.navigate(routerConstants.LOGIN)
				setIsMenuOpen(false)
				clearStore()
			}
		})
	}
	const onPressNavigateHandler = (routeName: any, options = {}) => {
		navigation.navigate(routeName, options)
		setIsMenuOpen(false)
	}
	const onPressOrderHistoryHandler = () => {
		OrdersStoreService.getOrdersHistory().then((data) => {
			if (data) {
				onPressNavigateHandler(routerConstants.ORDERS_HISTORY)
			}
		})
	}
	const onPressChatHandler = () => {
		ChatStoreService.getDialog(true).then((data) => {
			if (data) {
				onPressNavigateHandler(routerConstants.CHAT_SUPPORT)
			}
		})
	}
	return (
		<>
			<Animated.View
				style={[
					styles.container,
					{
						transform: [
							{
								translateX: menuPosition,
							},
						],
					},
				]}
			>
				<Pressable onPress={() => setIsMenuOpen(false)} style={styles.background} />

				<Animated.View
					style={[
						styles.menu,
						{
							transform: [
								{
									translateX: menuPosition,
								},
							],
						},
					]}
				>
					<Box pt={10}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<AvatarUser
								photo={executorSettings?.executors?.pic}
								name={`${executorSettings.executors?.first_name} ${executorSettings.executors?.last_name}`}
								onClose={() => setIsMenuOpen(false)}
							/>
							<Box
								justifyContent={'space-between'}
								alignItems={'center'}
								flexDirection={'row'}
								marginY={2}
								borderRadius={16}
								p={4}
								borderWidth={1}
								borderColor={colors.grayBright}
							>
								<Box flexDirection={'row'} alignItems={'center'}>
									<Image w={6} h={6} alt={'img'} source={countryImg} />
									<Text fontSize={14} fontWeight={'regular'} ml={2}>
										{' '}
										{dictionary[DictionaryEnum.Country]}
									</Text>
								</Box>
								<Box alignItems={'center'} flexDirection={'row'}>
									<Text fontSize={14} fontWeight={'regular'} color={colors.grayLight}>
										{executorSettings.executors?.country}
									</Text>
								</Box>
							</Box>

							<BurgerLink
								onPress={onPressOrderHistoryHandler}
								img={repeatImg}
								text={dictionary[DictionaryEnum.OrderHistory]}
							/>
							<BurgerLink
								onPress={() => onPressNavigateHandler(routerConstants.RECEIVING_METHOD)}
								img={walletImg}
								text={dictionary[DictionaryEnum.ReceivingMethod]}
							/>
							<BurgerLink
								onPress={onPressChatHandler}
								isRedDot={executorSettings?.unread_messages > 0}
								img={questionMarkImg}
								text={dictionary[DictionaryEnum.ContactSupport]}
							/>
							<BurgerLink
								onPress={() =>
									onPressNavigateHandler(routerConstants.SELECT_LOGISTIC_POINT, { from: 'update' })
								}
								img={exclamationMarkImg}
								text={dictionary[DictionaryEnum.ChangeOfLogisticsPoint]}
							/>
							<BurgerLink
								onPress={() => onPressNavigateHandler(routerConstants.OPEN_SHIFT)}
								isRedDot={isFreeze}
								img={exclamationMarkImg}
								text={dictionary[DictionaryEnum.OpenShift]}
							/>
							<BurgerLink
								onPress={() => onPressNavigateHandler(routerConstants.CLOSE_SHIFT)}
								img={exclamationMarkImg}
								text={dictionary[DictionaryEnum.FreezeShift]}
							/>
							<BurgerLink
								onPress={() => onPressNavigateHandler(routerConstants.ABOUT_US)}
								img={exclamationMarkImg}
								text={dictionary[DictionaryEnum.AboutSwash]}
							/>
							<Box mt={5} mb={3} alignItems={'center'}>
								<Button
									backgroundColor={colors.white}
									colorText={colors.black}
									styleContainer={styles.btnContainer}
									styleText={{ fontFamily: 'regular' }}
									onPress={onPressLogOut}
									title={dictionary[DictionaryEnum.LogOff]}
								/>
							</Box>
						</ScrollView>
					</Box>
				</Animated.View>
			</Animated.View>
			{isOpenLogout && (
				<BaseBottomPopUp
					text={'Do you want to log off'}
					onDelete={logOutHandler}
					visible={isOpenLogout}
					onClose={() => setIsLogout(false)}
				/>
			)}
		</>
	)
})
const styles = StyleSheet.create({
	btnContainer: {
		borderWidth: 1,
		borderColor: colors.blue,
		borderRadius: 28,
		maxWidth: 280,
		width: '100%',
	},
	background: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: colors.black,
		zIndex: 1,
		opacity: 0.2,
	},
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	menu: {
		position: 'absolute',
		top: 0,
		width: '80%',
		paddingHorizontal: 16,
		height: '100%',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(255, 255, 255, 1)',
		zIndex: 2,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowOffset: { width: 5, height: 0 },
		elevation: 5,
	},
})

export default BurgerMenu
