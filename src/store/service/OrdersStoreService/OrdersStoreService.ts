import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { SendOrderRegisterType } from '../../../api/OrdersApi/type'

export class OrdersStoreService {
	rootStore: typeof RootStore

	constructor(rootStore: typeof RootStore) {
		this.rootStore = rootStore
	}

	async getOrderReportExecutor() {
		try {
			await this.rootStore.OrdersStore.getOrderReportClient()
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
		}
	}
	async sendOrderRegister(payload: SendOrderRegisterType) {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			await this.rootStore.OrdersStore.sendOrderRegister(payload)
			await this.rootStore.OrdersStoreService.getOrderReportExecutor()
			return true
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}

	async deleteOrderPhoto(photo_id: number) {
		try {
			const data = await this.rootStore.OrdersStore.deleteOrderPhoto(photo_id)
			await this.rootStore.OrdersStore.getOrderReportDetail(
				this.rootStore.OrdersStore.orderDetail.orders_id
			)
			return true
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
		}
	}

	async saveOrderPhoto(photo) {
		try {
			const data = await this.rootStore.OrdersStore.sendOrderReviewPhoto(photo)
			await this.rootStore.OrdersStore.getOrderReportDetail(
				this.rootStore.OrdersStore.orderDetail.orders_id
			)
			return true
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
		}
	}

	async getOrderReportDetail(orders_id: number) {
		try {
			await this.rootStore.OrdersStore.getOrderReportDetail(orders_id)
			return true
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
		}
	}

	async getOrdersHistory() {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.OrdersStore.getOrdersHistory()
			//const closedOrders = .filter((order) => order.last_step === LAST_STEP_ORDER_ENUM.admin_closed_order)
			await this.rootStore.OrdersStore.setClosedOrder(data.orders)
			return true
		} catch (e) {
			this.rootStore.Notification.setServerResponse({ serverResponse: e?.message })
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}
}

export default OrdersStoreService
