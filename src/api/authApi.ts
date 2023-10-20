import { instance } from './config'
import {AuthGooglePayload, ExecutorSettingType, RegisterPayloadType} from "./type";

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
	async getLogisticsPoints(payload: {country: string}) {
		return await instance.get(`washapi.php/get_logistics_points`, {params: payload})
	},
	async getSettingsExecutor() {
		return await instance.get<ExecutorSettingType>(`washapi.php/get_settings_executor`)
	},
	async getDictionary() {
		return await instance.get(`washapi.php/get_dictionary`)
	},
	async updateExecutor(payload: RegisterPayloadType) {
		return await instance.post(`washapi.php/executor_register`, {}, {
			params: payload,
		})
	},
}
