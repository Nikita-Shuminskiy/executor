import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {ordersApi} from "../../api/OrdersApi/ordersApi";
import {OrderDetailType, OrderType} from "../../api/type";
import {SendOrderRegisterType} from "../../api/OrdersApi/type";

export class OrdersStore {
    orderDetail: OrderDetailType | null = null
    orders: OrderType[] = []
    closedOrders: OrderType[] = []

    setOrderDetail(order: OrderDetailType) {
        this.orderDetail = order
    }

    setOrders(orders: OrderType[]) {
        this.orders = orders
    }

    setClosedOrder(orders: OrderType[]) {
        this.closedOrders = orders
    }

    clearStore() {
        this.orders = []
        this.orderDetail = null
    }

    getOrderReportDetail = async (orders_id: any): Promise<any> => {
        const {data} = await ordersApi.getOrderReportDetail({
            orders_id,
        })
        this.setOrderDetail(data)
        return data
    }

    sendOrderComplete = async (orders_id: string, executor_logistic_partners_points_id: string) => {
        const {data} = await ordersApi.sendOrderComplete({
            orders_id: orders_id,
            executor_logistic_partners_points_id,
        })
        console.log(data, 'datadatadata')
        return data
    }
    saveOrderPhoto = async (photo) => {
        const {data} = await ordersApi.saveOrderPhoto({
            orders_id: this.orderDetail?.orders_id,
            photo,
        })
    }

    startOrder = async () => {
        const {data} = await ordersApi.startOrder({
            orders_id: this.orderDetail.orders_id,
            client_logistic_parents_points_id: this.orderDetail.client_logistic_partners_points_id,
            services: {
                iron: +this.orderDetail.add_iron,
                hypo: +this.orderDetail.add_hypo,
            },
        })
    }

    updateOrder = async (payload: any) => {
        const data = await ordersApi.updOrder({
            ...payload,
        })
        return data
    }

    reviewOrder = async (payload: Omit<any, 'orders_id'>) => {
        const data = await ordersApi.reviewOrder({
            orders_id: this.orderDetail.orders_id,
            ...payload,
        })
    }

    deleteOrderPhoto = async (photo_id: number) => {
       return await ordersApi.deleteOrderPhoto({
            photo_id
        })
    }
    sendOrderPhoto = async (photo) => {
       return await ordersApi.saveOrderPhoto({
            photo,
            orders_id: this.orderDetail.orders_id,
        })
    }
    sendOrderReviewPhoto = async (photo) => {
        return await ordersApi.sendOrderReviewPhoto({
            photo,
            order_id: this.orderDetail.orders_id,
        })
    }

    setOrdersHistory = (data: any) => {
        this.closedOrders = data
    }

    getOrdersHistory = async () => {
        const {data} = await ordersApi.getOrdersHistory()
        return data
    }
    getOrderReportClient = async () => {
        const {data} = await ordersApi.getAllOrdersInProgress()
        this.setOrders(data.orders)
    }
    sendOrderRegister = async (payload: SendOrderRegisterType) => {
        const {data} = await ordersApi.sendOrderRegister(payload)
        console.log(data)
       // this.setOrders(data.orders)
    }
    constructor() {
        makeAutoObservable(this)
    }
}

export default new OrdersStore()
