import {instance} from '../config'
import {convertToFormDataImg} from "../../utils/commonUtils";

export const ordersApi = {
    async deleteOrderPhoto(payload: { photo_id: string, order_number: string }) {
        return await instance.post(`order_client_photo_delete`, payload)
    },
    async saveOrderPhoto(payload: { orders_id: string, photo: string }) {
        const { orders_id, photo } = payload
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
        return await instance.post(`order_client_delete`, {}, { params: payload })
    },
    async getOrderReportDetail(payload: { orders_id: string }) {
        return await instance.get(`order_report_client_detail`, { params: payload })
    },

    async startOrder(payload: any) {
        return await instance.post(`order_client_start`, payload)
    },
    async updOrder(payload: any) {
        return await instance.post(`order_client_register`, payload)
    },
    async reviewOrder(payload: any) {
        return await instance.post(`order_client_review`, {}, { params: payload })
    },

    async getOrdersHistory() {
        return await instance.get(`order_report_executor`)
    },
}
