import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {ordersApi} from "../../api/OrdersApi/ordersApi";

export class OrdersStore {
	orderDetail: any = {} as any
	orders: any[] = [] as any[]
	closedOrders: any[] = [] as any[]

	setOrderDetail(order: any) {
		this.orderDetail = order
	}

	setOrders(orders: any[]) {
		this.orders = orders
	}
	setClosedOrder(orders: any[]) {
		this.closedOrders = orders
	}
	clearStore() {
		this.orders = []
		this.orderDetail = {} as any
	}
	 createOrderClient = async (payload: any) => {
		const { data } = await ordersApi.createOrderClientPrev({
			services: { ...payload },
		})
		return data.order_id
	}

	 deleteOrder  = async  (comment: string, orders_id: string) => {
		const { data } = await ordersApi.deleteOrder({
			orders_id,
			comment,
		})
	}

	 getOrderReportDetail  = async (orders_id: string): Promise<any> => {
		const { data } = await ordersApi.getOrderReportDetail({
			orders_id,
		})
		this.setOrderDetail(data)
		return data
	}

	 saveOrderPhoto = async(photo) => {
		const { data } = await ordersApi.saveOrderPhoto({
			orders_id: this.orderDetail?.orders_id,
			photo,
		})
	}

	 startOrder = async() => {
		const { data } = await ordersApi.startOrder({
			orders_id: this.orderDetail.orders_id,
			client_logistic_parents_points_id: this.orderDetail.client_logistic_partners_points_id,
			services: {
				iron: +this.orderDetail.add_iron,
				hypo: +this.orderDetail.add_hypo,
			},
		})
	}

	 updateOrder = async(payload: any) => {
		const data = await ordersApi.updOrder({
			...payload,
		})
		return data
	}

	 reviewOrder = async(payload: Omit<any, 'orders_id'>) => {
		const data = await ordersApi.reviewOrder({
			orders_id: this.orderDetail.orders_id,
			...payload,
		})
	}

	 deleteOrderPhoto = async(photo_id) => {
		await ordersApi.deleteOrderPhoto({
			photo_id,
			order_number: this.orderDetail.orders_id,
		})
	}
	setOrdersHistory = (data: any) => {
			this.closedOrders = data
	}

	getOrdersHistory = async () => {
		const {data} = await ordersApi.getOrdersHistory()
		return data
	}
	 getOrderReportClient = async() => {
		//const { data } = await clientApi.getSettingsClient()
		 //this.setOrders(data.orders)
	}

	constructor() {
		makeAutoObservable(this)
	}
}

export default new OrdersStore()