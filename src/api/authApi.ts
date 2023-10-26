import {instance} from './config'
import {AuthGooglePayload, ExecutorSettingType, PhotoPayloadType, UpdateExecutorPayloadType} from "./type";
import {convertToFormDataImg} from "../utils/commonUtils";

export const authApi = {
    async sendCodeVerify(payload: { phone_verify_code: string }) {
        return await instance.post(`washapi.php/executor_code_verify`, null, {
            params: payload,
        })
    },
    async sendCode(payload: { phone: string }) {
        return await instance.post(`washapi.php/executor_code_send`, {}, {
            params: payload,
        })
    },
    async authWithGoogle(payload: AuthGooglePayload) {
        return await instance.post(`washapi.php/auth_executor_by_google_for_android`, {}, {params: payload})
    },
    async sendDeviceToken(token: string) {
        return await instance.post(`washapi.php/client_fcm_token`, {fcm_token: token})
    },
    async getLogisticsPoints(payload: { country: string }) {
        return await instance.get(`washapi.php/get_logistics_points`, {params: payload})
    },
    async getSettingsExecutor() {
        return await instance.get<ExecutorSettingType>(`washapi.php/get_settings_executor`)
    },
    async getDictionary() {
        return await instance.get(`washapi.php/get_dictionary`)
    },
    async updateExecutor(payload: UpdateExecutorPayloadType) {
        return await instance.post(`washapi.php/executor_register`, {}, {
            params: payload,
        })
    },
    async deletePhoto(photo_id: number) {
        return await instance.post(`washapi.php/delete_executor_photos_for_approval`, {}, {
            params: {photo_id},
        })
    },
    async sendPhotosForApproval(payload: PhotoPayloadType) {
        const formData = await convertToFormDataImg(payload.photo)
        return await instance.post(`washapi.php/executor_photos_for_approval`, formData, {
            params: {
                type_of_photo: payload.type_of_photo
            }
        })
    },
}
