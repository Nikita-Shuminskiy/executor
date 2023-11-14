import RootStore from '../../RootStore'
import {LoadingEnum} from '../../types/types'
import {routerConstants} from '../../../constants/routerConstants'
import {checkToken} from "../../../utils/commonUtils";
import {LastStep, StatusOrder} from "../../../api/type";


export class OrdersStoreService {
    rootStore: typeof RootStore

    constructor(rootStore: typeof RootStore) {
        this.rootStore = rootStore
    }

    async deleteOrder(comment: string, orders_id: string, navigate) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.deleteOrder(comment, orders_id)
            await this.rootStore.AuthStore.getSettingExecutor()
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async getOrderReportExecutor() {
        try {
            await this.rootStore.OrdersStore.getOrderReportClient()
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
        }
    }

    async startOrder() {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.startOrder()
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async reviewOrder(payload: Omit<any, 'orders_id'>) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.reviewOrder(payload)
            const data = await this.rootStore.AuthStore.getSettingExecutor()
           // this.rootStore.OrdersStore.setOrders(data.orders)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async deleteOrderPhoto(photo_id: string) {
        try {
            await this.rootStore.OrdersStore.deleteOrderPhoto(photo_id)
            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async saveOrderPhoto(photo) {
        try {
            const data = await this.rootStore.OrdersStore.saveOrderPhoto(photo)

            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async getOrderReportDetail(orders_id: string) {
        try {
            await this.rootStore.OrdersStore.getOrderReportDetail(orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async updateOrder(payload: any) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
           const data = await this.rootStore.OrdersStore.updateOrder(payload)
            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async getOrdersHistory() {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            const data = await this.rootStore.OrdersStore.getOrdersHistory()
            const closedOrders = data.orders.filter((order) => order.last_step === LastStep.admin_closed_order)
            await this.rootStore.OrdersStore.setClosedOrder(closedOrders)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }


}

export default OrdersStoreService
