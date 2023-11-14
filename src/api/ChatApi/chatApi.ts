import {instance} from '../config'
import {ResponseDialogType, SendMessagePayloadType} from './type'
import {convertToFormDataImg} from "../../utils/commonUtils";


export const chatApi = {
    async getDialog() {
        return await instance.get<ResponseDialogType>(`executor_dialogs`)
    },
    async messageRead(message_id: string) {
        return await instance.post(`executor_message_read`, {}, {params: {message_id}})
    },
    async sendMessage(payload: SendMessagePayloadType) {
        if (payload.photo) {
            const formData = await convertToFormDataImg(payload.photo)
            return await instance.post(`executor_new_message`, formData, {
                params: {
                    orders_id: payload.orders_id,
                    text: payload.text,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }
        return await instance.post(`executor_new_message`, {}, {
            params: {
                orders_id: payload.orders_id,
                text: payload.text,
            },
        })
    },
}
