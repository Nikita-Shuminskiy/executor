import {instance} from '../config'
import {convertToFormDataImg} from "../../utils/commonUtils";
import {SendOrderRegisterType} from "./type";

export const ordersApi = {
    async deleteOrderPhoto(payload: { photo_id: number }) {
        return await instance.post(`order_executor_photo_delete`, payload)
    },
    async sendOrderRegister(payload: SendOrderRegisterType) {
        return await instance.post(`order_executor_register`, payload)
    },
    async sendOrderReviewPhoto(payload: { photo: string, order_id: string }) {
        const {order_id, photo} = payload
        const formData = await convertToFormDataImg(photo)
        return await instance.post(`order_executor_photo`, formData, {
            params: {
                order_id,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    async sendOrderComplete(payload: { orders_id: string, executor_logistic_partners_points_id: string }) {
        return await instance.get(`order_executor_completed`, {params: payload})
    },
    async saveOrderPhoto(payload: { orders_id: string, photo: string }) {
        const {orders_id, photo} = payload
        const formData = await convertToFormDataImg(photo)
        return await instance.post(`order_client_photo`, formData, {
            params: {
                orders_id,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    async createOrderClientPrev(payload: any) {
        return await instance.post(`order_client_prev`, payload)
    },
    async deleteOrder(payload: any) {
        return await instance.post(`order_client_delete`, {}, {params: payload})
    },
    async getOrderReportDetail(payload: { orders_id: string }) {
        return await instance.get(`order_report_executor_detail`, {params: payload})
    },
    async getAllOrdersInProgress() {
        return await instance.get(`order_report_executor`)
    },
    async startOrder(payload: any) {
        return await instance.post(`order_client_start`, payload)
    },
    async updOrder(payload: any) {
        return await instance.post(`order_client_register`, payload)
    },
    async reviewOrder(payload: any) {
        return await instance.post(`order_client_review`, {}, {params: payload})
    },

    async getOrdersHistory() {
        return await instance.get(`order_report_executor`)
    },
}
