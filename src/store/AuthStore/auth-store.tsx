import {action, makeObservable, observable} from 'mobx'
import {authApi} from '../../api/authApi'
import {deviceStorage} from '../../utils/storage/storage'
import {AuthGooglePayload, ExecutorSettingType, LogisticsPointType, RegisterPayloadType} from "../../api/type";

export class AuthStore {
    isAuth: boolean = false
    phone: string = ''
    logisticPoints: LogisticsPointType[] = []
    executorSettings: ExecutorSettingType = {} as ExecutorSettingType

    setAuth(auth: boolean): void {
        this.isAuth = auth
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

    async sendRegister(payload: RegisterPayloadType) {
        const {data} = await authApi.updateExecutor(payload)
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

    constructor() {
        makeObservable(this, {
            executorSettings: observable,
            isAuth: observable,
            logisticPoints: observable,
            phone: observable,
            setPhone: action,
            getSettingExecutor: action,
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
