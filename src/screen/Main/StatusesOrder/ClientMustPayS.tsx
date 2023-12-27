import React from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../../components/ArrowBack'
import { CommonScreenPropsType, LAST_STEP_ORDER_ENUM } from '../../../api/type'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import { useGoBack } from '../../../utils/hook/useGoBack'
import { routerConstants } from '../../../constants/routerConstants'
import DictionaryStore from '../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'
import waitingImg from '../../../assets/Images/waiter.jpg'
import { StatusesHeader } from './ExecutorStatuses/StatusesHeader'

type ClientMustPaySProps = CommonScreenPropsType & {}
const ClientMustPayS = observer(({ navigation, route }: ClientMustPaySProps) => {
	const { orderDetail } = OrdersStore
	const { dictionary } = DictionaryStore
	const goBackPress = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBackPress)
	return (
		<BaseWrapperComponent>
			<Box paddingX={4} justifyContent={'space-between'}>
				<ArrowBack goBackPress={goBackPress} />
				<Box mt={4} mb={2}>
					<Text fontSize={28} fontFamily={'semiBold'}>
						Swash #{orderDetail?.orders_id}
					</Text>
				</Box>
				<Box mt={2} alignItems={'center'}>
					<StatusesHeader
						orderDetail={orderDetail}
						statusOrder={LAST_STEP_ORDER_ENUM.executor_done_client_must_pay}
					/>
					<Image mt={2} alt={'img-waiter'} borderRadius={16} source={waitingImg as any} />
					<Text fontSize={28} mb={1} mt={2} textAlign={'center'} fontFamily={'semiBold'}>
						{dictionary[DictionaryEnum.ClientMustPay]}
					</Text>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ClientMustPayS
