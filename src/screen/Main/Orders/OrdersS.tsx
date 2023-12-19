import React, { useCallback, useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { Box } from 'native-base'
import { observer } from 'mobx-react-lite'
import { CommonScreenPropsType, LAST_STEP_ORDER_ENUM, OrderType } from '../../../api/type'
import BurgerMenuBtn from '../../../components/BurgerMenu/BurgerMenuBtn'
import { colors } from '../../../assets/colors/colors'
import { useGoBack } from '../../../utils/hook/useGoBack'
import { isFutureDate } from '../../../utils/commonUtils'
import AuthStore from '../../../store/AuthStore/auth-store'
import { Dimensions, FlatList, ImageBackground, Platform } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import backgroundOrderImg from '../../../assets/Images/orders/backgroundOrder.png'
import OrderViewer from '../../../components/list-viewer/OrderViewer/OrderViewer'
import { processingNavigationOrderStatus } from './utils'
import rootStore from '../../../store/RootStore/root-store'
import DictionaryStore from '../../../store/DictionaryStore/dictionary-store'
import EmptyComponent from '../../../components/list-viewer/EmptyComponent'

type OrdersSProps = CommonScreenPropsType & {}
const OrdersS = observer(({ navigation, route }: OrdersSProps) => {
	const { dictionary } = DictionaryStore
	const isFocused = useIsFocused()
	const isOpenMenu = route.params?.from === 'open_menu'
	const { executorSettings } = AuthStore
	const { OrdersStoreService } = rootStore
	const goBackPress = () => {
		return true
	}
	useGoBack(goBackPress)
	useEffect(() => {
		if (isFocused) {
			OrdersStoreService.getOrderReportExecutor()
		}
	}, [isFocused])
	const onPressDetails = useCallback((order: OrderType) => {
		OrdersStoreService.getOrderReportDetail(order.id).then((data) => {
			if (data) {
				processingNavigationOrderStatus(navigation, order)
			}
		})
	}, [])
	const renderItem = useCallback(({ item, index }: { item: OrderType; index: number }) => {
		if (
			item.last_step === LAST_STEP_ORDER_ENUM.admin_closed_order ||
			item.last_step === LAST_STEP_ORDER_ENUM.client_confirm ||
			item.last_step === LAST_STEP_ORDER_ENUM.auction_open
		)
			return
		return <OrderViewer onPressDetails={onPressDetails} order={item} index={index} />
	}, [])
	return (
		<>
			<BaseWrapperComponent
				styleSafeArea={{
					paddingTop: 0,
				}}
				isKeyboardAwareScrollView={true}
			>
				<Box>
					<Box style={{ height: 220 }}>
						<ImageBackground
							alt={'mg-header'}
							resizeMode={'contain'}
							style={{
								height: 284,
								zIndex: 2,
							}}
							source={backgroundOrderImg}
						>
							<Box paddingX={4} style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
								<BurgerMenuBtn openingForced={isOpenMenu} />
							</Box>
						</ImageBackground>
						<Box
							backgroundColor={colors.blue}
							style={{
								height: 300,
								width: '100%',
								position: 'absolute',
								top: 0,
							}}
						/>
					</Box>
					<Box
						borderTopLeftRadius={16}
						mb={2}
						style={{ minHeight: Dimensions.get('window').height - 191 }}
						borderTopRightRadius={16}
						backgroundColor={colors.white}
					>
						<FlatList
							scrollEnabled={false}
							contentContainerStyle={
								!executorSettings?.orders.length && {
									flex: 1,
								}
							}
							ListEmptyComponent={EmptyComponent}
							data={executorSettings?.orders}
							renderItem={renderItem}
						/>
					</Box>
				</Box>
			</BaseWrapperComponent>
		</>
	)
})

export default OrdersS
