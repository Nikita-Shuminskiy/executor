import {action, makeObservable, observable} from 'mobx'
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
    examData: {question: string, answers: string[], total?: number, answered: number} | null = null
    setAuth(auth: boolean): void {
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

    setPhone(phone: string): void {
        this.phone = phone
    }

    setLogisticPoints(points: LogisticsPointType[]) {
        this.logisticPoints = points
    }

    clearStore() {
        this.phone = ''
        this.executorSettings = {} as ExecutorSettingType
        this.logisticPoints = []
    }

    setExecutorSettings(executor: ExecutorSettingType) {
        this.executorSettings = executor
    }

    async getSettingExecutor() {
        const {data} = await authApi.getSettingsExecutor()
        this.setExecutorSettings(data)
        return data
    }

    async logout() {
        //const { data } = await authApi.logout()
    }

    async setUserAuthData(token: string) {
        const currentDate = new Date().toISOString();
        await deviceStorage.saveItem('token', token)
        await deviceStorage.saveItem('tokenDate', currentDate)
    }

    async sendCode(formattedPhoneNumber?: string) {
        const {data} = await authApi.sendCode({phone: formattedPhoneNumber ?? this.phone})
        return data
    }

    async sendVerifyCode(code: string) {
        const payload = {
            phone_verify_code: code,
        }
        return await authApi.sendCodeVerify(payload)
    }

    async updateExecutor(payload: UpdateExecutorPayloadType) {
        const {data} = await authApi.updateExecutor(payload)
        return data
    }

    async sendPhotosForApproval(payload: PhotoPayloadType) {
        const {data} = await authApi.sendPhotosForApproval(payload)
        return data
    }

    async deletePhoto(photoId: number) {
        const {data} = await authApi.deletePhoto(photoId)
        return data
    }

    async updatePhoto(photo: string) {
        //const { data } = await clientApi.updateClientPhoto(photo)
        //return data
    }

    async authWithGoogle(payload: AuthGooglePayload) {
        const {data} = await authApi.authWithGoogle(payload)
        await this.setUserAuthData(data?.token)
        return data
    }

    async getLogisticPoints(country = 'PL') {
        const {data} = await authApi.getLogisticsPoints({country})
        this.setLogisticPoints(data.points)
    }

    getExamEducation =  async () => {
        const {data} = await authApi.getExamEducation(this.executorSettings.executors.language)
        this.setExamEducationText(data.message)
    }
    getExamAnswer =  async (answer: string) => {
        const {data} = await authApi.getExamAnswer(this.executorSettings.executors.language, this.examData.question, answer)
        return data
    }
    getExamNextQuestion =  async () => {
        const {data} = await authApi.examNextQuestion(this.executorSettings.executors.language)
        if(data.message === 'Exam_passed') return 'Exam_passed'
        this.setExamData(data)
        return true
    }
    constructor() {
        makeObservable(this, {
            executorSettings: observable,
            isAuth: observable,
            logisticPoints: observable,
            examData: observable,
            phone: observable,
            setPhone: action,
            setExamData: action,
            setExamEducationText: action,
            getExamEducation: action,
            getSettingExecutor: action,
            getExamAnswer: action,
            authWithGoogle: action,
            updatePhoto: action,
            sendVerifyCode: action,
            getLogisticPoints: action,
            setAuth: action,
            setUserAuthData: action,
            sendCode: action,
            clearStore: action,
            setExecutorSettings: action,
            setLogisticPoints: action,
        })
        this.setAuth = this.setAuth.bind(this)
        this.setLogisticPoints = this.setLogisticPoints.bind(this)
        this.getSettingExecutor = this.getSettingExecutor.bind(this)
        this.updatePhoto = this.updatePhoto.bind(this)
        this.sendCode = this.sendCode.bind(this)
        this.setPhone = this.setPhone.bind(this)
        this.clearStore = this.clearStore.bind(this)
        this.setExecutorSettings = this.setExecutorSettings.bind(this)
        this.sendVerifyCode = this.sendVerifyCode.bind(this)
        this.getLogisticPoints = this.getLogisticPoints.bind(this)
        this.setUserAuthData = this.setUserAuthData.bind(this)
    }
}

export default new AuthStore()
