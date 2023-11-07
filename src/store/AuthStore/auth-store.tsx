import {makeAutoObservable} from 'mobx'
import {authApi} from '../../api/authApi'
import {deviceStorage} from '../../utils/storage/storage'
import {
    AuthGooglePayload,
    ExecutorSettingType,
    LogisticsPointType,
    PhotoPayloadType,
    UpdateExecutorPayloadType
} from "../../api/type";

export class AuthStore {
    isAuth: boolean = false
    phone: string = ''
    logisticPoints: LogisticsPointType[] = []
    executorSettings: ExecutorSettingType = {} as ExecutorSettingType
    examEducationText: string = ''
    examData: { question: string, answers: string[], total?: number, answered: number } | null = null
    clearStore = () => {
        this.phone = ''
        this.examEducationText = ''
        this.examData = null
        this.executorSettings = {} as ExecutorSettingType
        this.logisticPoints = []
    }
    setAuth = (auth: boolean): void => {
        this.isAuth = auth
    }

    setExamEducationText = (data: string) => {
        this.examEducationText = data
    }
    setExamData = (data) => {
        this.examData = {
            answers: data.answers,
            question: data.question,
            total: data?.total,
            answered: data.answered
        }
    }

    setPhone = (phone: string): void => {
        this.phone = phone
    }

    setLogisticPoints = (points: LogisticsPointType[]) => {
        this.logisticPoints = points
    }



    setExecutorSettings = (executor: ExecutorSettingType) => {
        this.executorSettings = executor
    }

    getSettingExecutor = async () => {
        const {data} = await authApi.getSettingsExecutor()
        this.setExecutorSettings(data)
        return data
    }

    logout = async () => {
        //const { data } = await authApi.logout()
    }

    setUserAuthData = async (token: string) => {
        const currentDate = new Date().toISOString();
        await deviceStorage.saveItem('token', token)
        await deviceStorage.saveItem('tokenDate', currentDate)
    }

    sendCode = async (formattedPhoneNumber?: string) => {
        const {data} = await authApi.sendCode({phone: formattedPhoneNumber ?? this.phone})
        return data
    }

    sendVerifyCode = async (code: string) => {
        return await authApi.sendCodeVerify({phone_verify_code: code})
    }

    updateExecutor = async (payload: UpdateExecutorPayloadType) => {
        const {data} = await authApi.updateExecutor(payload)
        return data
    }

    sendPhotosForApproval = async (payload: PhotoPayloadType) => {
        const {data} = await authApi.sendPhotosForApproval(payload)
        return data
    }

    deletePhoto = async (photoId: number) => {
        const {data} = await authApi.deletePhoto(photoId)
        return data
    }

    updateExecutorPhoto = async (photo: string) => {
        const { data } = await authApi.updateExecutorPhoto(photo)
        return data
    }

    authWithGoogle = async (payload: AuthGooglePayload) => {
        const {data} = await authApi.authWithGoogle(payload)
        await this.setUserAuthData(data?.token)
        return data
    }

    getLogisticPoints = async (country = 'PL') => {
        const {data} = await authApi.getLogisticsPoints({country})
        this.setLogisticPoints(data.points)
    }

    getExamEducation = async () => {
        const {data} = await authApi.getExamEducation(this.executorSettings.executors.language)
        this.setExamEducationText(data.message)
    }
    getExamAnswer = async (answer: string) => {
        const {data} = await authApi.getExamAnswer(this.executorSettings.executors.language, this.examData.question, answer)
        return data
    }
    getExamNextQuestion = async () => {
        const {data} = await authApi.examNextQuestion(this.executorSettings.executors.language)
        if (data.message === 'Exam_passed') return 'Exam_passed'
        this.setExamData(data)
        return true
    }
    logOut = async () => {
        const {data} = await authApi.forgotAboutDevice()
        return true
    }
    fullDeleteAccount = async () => {
        const {data} = await authApi.fullDeleteAccount()
        return data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new AuthStore()
