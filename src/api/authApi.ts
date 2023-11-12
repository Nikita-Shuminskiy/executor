import {instance} from './config'
import {AuthGooglePayload, ExecutorSettingType, PhotoPayloadType, UpdateExecutorPayloadType} from "./type";
import {convertToFormDataImg} from "../utils/commonUtils";
import {Platform} from "react-native";

export const authApi = {
    async sendCodeVerify(payload: { phone_verify_code: string }) {
        return await instance.post(`washapi.php/executor_code_verify`, null, {
            params: payload,
        })
    },
    async updateExecutorPhoto(photo: string) {
        const formData = await convertToFormDataImg(photo)
        return await instance.post(`washapi.php/executor_register`, formData)
    },
    async sendCode(payload: { phone: string }) {
        return await instance.post(`washapi.php/executor_code_send`, {}, {
            params: payload,
        })
    },
    async authWithGoogle(payload: AuthGooglePayload) {
        const URL = Platform.OS === 'ios' ? 'washapi.php/auth_executor_by_google' : 'washapi.php/auth_executor_by_google_for_android'
        return await instance.post(URL, {}, {
            params: {
                ...payload,
                status: 'executor'
            }
        })
    },
    async sendDeviceToken(token: string) {
        return await instance.post(`washapi.php/executor_fcm_token`, {fcm_token: token})
    },
    async getLogisticsPoints(payload: { country: string }) {
        return await instance.get(`washapi.php/get_logistics_points`, {params: payload})
    },
    async getSettingsExecutor() {
        return await instance.get<ExecutorSettingType>(`washapi.php/get_settings_executor`)
    },

    async forgotAboutDevice() {
        return await instance.post(`washapi.php/executor_forget_about_device`)
    },
    async fullDeleteAccount() {
        return await instance.post(`washapi.php/executor_full_delete`)
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

    async getExamEducation(lang: string) {
        return await instance.get<ExamEducationResponseType<string>>(`washapi.php/executor_exam_education`, {params: {lang}})
    },
    async examNextQuestion(lang: string) {
        return await instance.get<ExamNextQuestionWithTotalResponseType>(`washapi.php/executor_exam_next_question`, {params: {lang}})
    },
    async getExamAnswer(lang: string, question: string, answer: string) {
        return await instance.get<ExamEducationResponseType<'ok' | 'Wrong answer'>>(`washapi.php/executor_exam_answer`, {
            params: {
                lang,
                question,
                answer
            }
        })
    },
}
type ExamEducationResponseType<T> = {
    message: T
    status: string
}
type ExamNextQuestionWithTotalResponseType = ExamNextQuestionType & {
    total: number;
};

type ExamNextQuestionType = {
    message: string
    question: string
    status: string
}