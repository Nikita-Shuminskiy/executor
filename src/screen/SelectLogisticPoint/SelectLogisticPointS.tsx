import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { CommonScreenPropsType, LogisticsPointType } from '../../api/type'
import { Box, Text } from 'native-base'
import AuthStore from '../../store/AuthStore/auth-store'
import { colors } from '../../assets/colors/colors'
import { MapViews } from '../../components/MapViews/MapViews'
import rootStore from '../../store/RootStore/root-store'
import { Platform } from 'react-native'
import { useGoBack } from '../../utils/hook/useGoBack'
import { StatusBar } from 'expo-status-bar'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import { routerConstants } from '../../constants/routerConstants'
import ConfirmationLogisticsPointModal from './ConfirmationLogisticsPointModal'
import OrdersStore from '../../store/OrdersStore/orders-store'
import { DictionaryEnum } from '../../store/DictionaryStore/type'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'

type SelectLogisticPointProps = CommonScreenPropsType & {}
const SelectLogisticPointS = observer(({ navigation, route }: SelectLogisticPointProps) => {
	const isFromUpdate = route?.params?.from === 'update'
	const isFromUpdateOrder = route?.params?.from === 'update_order'
	const [chosenPaczkomat, setChosenPaczkomat] = useState<LogisticsPointType | null>(null)
	const { logisticPoints } = AuthStore
	const { AuthStoreService, OrdersStoreService } = rootStore
	const { orderDetail } = OrdersStore
	const { dictionary } = DictionaryStore
	const onPressPaczkomat = (point: LogisticsPointType) => {
		setChosenPaczkomat(point)
	}
	const onPressSavePaczkomat = () => {
		AuthStoreService.updateExecutor({
			executor_logistic_partners_points_id: chosenPaczkomat.id,
		}).then((data) => {
			if (data) {
				setChosenPaczkomat(null)
				if (isFromUpdateOrder) {
					OrdersStoreService.getOrderReportDetail(+orderDetail.orders_id).then((data) => {
						if (data) {
							goBackPress()
						}
					})
					return
				}
				AuthStoreService.getSettingExecutor(!isFromUpdate && navigation.navigate)
				isFromUpdate && navigation.navigate(routerConstants.ORDERS, { from: 'open_menu' })
			}
		})
	}
	const goBackPress = (routes?: string) => {
		if (isFromUpdateOrder) {
			navigation.navigate(routerConstants.ORDER_PLACEMENT, { from: route?.params?.status })
			return true
		}
		routes && navigation.navigate(routes)
		return true
	}
	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent>
			<StatusBar backgroundColor={colors.white} />
			<Box
				paddingX={3}
				h={58}
				backgroundColor={colors.white}
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				{isFromUpdate || isFromUpdateOrder ? (
					<HeaderGoBackTitle
						title={dictionary[DictionaryEnum.SelectYourNearestPaczkomat]}
						goBackPress={() => goBackPress(routerConstants.ORDERS)}
					/>
				) : (
					<Text fontSize={17} fontFamily={'semiBold'}>
						{dictionary[DictionaryEnum.SelectYourNearestPaczkomat]}
					</Text>
				)}
			</Box>
			<MapViews onPressPaczkomat={onPressPaczkomat} logisticPoints={logisticPoints} />
			{isFromUpdate || isFromUpdateOrder ? (
				<></>
			) : (
				<Box
					borderRadius={16}
					pb={3}
					pt={2}
					paddingX={10}
					marginY={5}
					marginX={5}
					position={'absolute'}
					bottom={Platform.OS === 'ios' ? 10 : 0}
					backgroundColor={colors.white}
				>
					<Text fontSize={15} textAlign={'center'} fontFamily={'regular'}>
						{dictionary[DictionaryEnum.YouWouldNeedToUseThisPaczkomatToReturnWashedClothes]}
					</Text>
					<Text fontSize={15} mt={3} textAlign={'center'} fontFamily={'regular'}>
						{dictionary[DictionaryEnum.YouWillBeAbleToChangeItLater]}
					</Text>
				</Box>
			)}
			{chosenPaczkomat && (
				<ConfirmationLogisticsPointModal
					onPressSave={onPressSavePaczkomat}
					isOpen={!!chosenPaczkomat}
					chosenPaczkomat={chosenPaczkomat}
					onClose={() => setChosenPaczkomat(null)}
				/>
			)}
		</BaseWrapperComponent>
	)
})

export default SelectLogisticPointS
