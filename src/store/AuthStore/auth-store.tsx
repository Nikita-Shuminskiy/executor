import { makeAutoObservable } from 'mobx'
import { authApi } from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import {
	AuthGooglePayload,
	ExecutorSettingType,
	ExecutorShortDataType,
	GlobalSettingsType,
	LogisticsPointType,
	PhotoPayloadType,
	ShiftSetupPayload,
	UpdateExecutorPayloadType,
} from '../../api/type'
import Constants from 'expo-constants'

export class AuthStore {
	isAuth: boolean = false
	isOnboarding: boolean = false
	phone: string = ''
	isNewVersionApp: boolean = false
	logisticPoints: LogisticsPointType[] = []
	executorSettings: ExecutorSettingType = {} as ExecutorSettingType
	examEducationText: string = ''
	globalSettings: GlobalSettingsType | null = null
	executorShortData: ExecutorShortDataType | null = null
	examData: { question: string; answers: string[]; total?: number; answered: number } | null = null
	clearStore = () => {
		this.phone = ''
		this.examEducationText = ''
		this.executorShortData = null
		this.examData = null
		this.globalSettings = null
		this.executorSettings = {} as ExecutorSettingType
		this.logisticPoints = []
	}
	setExecutorShortData = (dataShort: ExecutorShortDataType): void => {
		this.executorShortData = dataShort
	}
	setAuth = (auth: boolean): void => {
		this.isAuth = auth
	}
	setGlobalSettings = (data: GlobalSettingsType | null): void => {
		this.globalSettings = data
		if (Constants?.expoConfig?.version < data?.executor_app_last_version) {
			this.isNewVersionApp = true
		}
	}
	setExamEducationText = (data: string) => {
		this.examEducationText = data
	}
	setExamData = (data) => {
		this.examData = {
			answers: data.answers,
			question: data.question,
			total: data?.total,
			answered: data.answered,
		}
	}
	setIsOnboarding = (val: boolean) => {
		this.isOnboarding = val
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
		const { data } = await authApi.getSettingsExecutor()
		this.setExecutorSettings(data)
		return data
	}
	getGlobalSetting = async () => {
		const { data } = await authApi.getGlobalSetting()
		this.setGlobalSettings(data?.result)
		const isShowOnboarding = await deviceStorage.getItem('onboarding')
		if (!isShowOnboarding || isShowOnboarding === 'false') {
			this.setIsOnboarding(true)
		}
		return data
	}
	logout = async () => {
		//const { data } = await authApi.logout()
	}

	setUserAuthData = async (token: string) => {
		const currentDate = new Date().toISOString()
		await deviceStorage.saveItem('token', token)
		await deviceStorage.saveItem('tokenDate', currentDate)
	}

	sendCode = async (formattedPhoneNumber?: string) => {
		const { data } = await authApi.sendCode({ phone: formattedPhoneNumber ?? this.phone })
		return data
	}

	sendVerifyCode = async (code: string) => {
		return await authApi.sendCodeVerify({ phone_verify_code: code })
	}

	updateExecutor = async (payload: UpdateExecutorPayloadType) => {
		const { data } = await authApi.updateExecutor(payload)
		return data
	}

	sendPhotosForApproval = async (payload: PhotoPayloadType) => {
		const { data } = await authApi.sendPhotosForApproval(payload)
		return data
	}

	deletePhoto = async (photoId: number) => {
		const { data } = await authApi.deletePhoto(photoId)
		return data
	}

	updateExecutorPhoto = async (photo: string) => {
		const { data } = await authApi.updateExecutorPhoto(photo)
		return data
	}

	authWithGoogle = async (payload: AuthGooglePayload) => {
		const { data } = await authApi.authWithGoogle(payload)
		await this.setUserAuthData(data?.token)
		return data
	}

	getLogisticPoints = async (country = 'PL') => {
		const { data } = await authApi.getLogisticsPoints({ country })
		this.setLogisticPoints(data.points)
	}

	getExamEducation = async () => {
		const { data } = await authApi.getExamEducation(this.executorSettings.executors.language)
		this.setExamEducationText(data.message)
	}
	getExamAnswer = async (answer: string) => {
		const { data } = await authApi.getExamAnswer(
			this.executorSettings.executors.language,
			this.examData.question,
			answer
		)
		return data
	}
	getExamNextQuestion = async () => {
		const { data } = await authApi.examNextQuestion(this.executorSettings.executors.language)
		if (data.message === 'Exam_passed') return 'Exam_passed'
		this.setExamData(data)
		return true
	}
	logOut = async () => {
		const { data } = await authApi.forgotAboutDevice()
		return true
	}
	fullDeleteAccount = async () => {
		const { data } = await authApi.fullDeleteAccount()
		return data
	}
	sendShiftSetup = async (date: ShiftSetupPayload) => {
		const { data } = await authApi.sendShiftSetup(date)
		return data
	}

	constructor() {
		makeAutoObservable(this)
	}
}

export default new AuthStore()
