import RootStore from '../../RootStore'import {LoadingEnum} from '../../types/types'import {deviceStorage} from '../../../utils/storage/storage'import {checkToken} from "../../../utils/commonUtils";import {routerConstants} from "../../../constants/routerConstants";import {ApprovedEnum, AuthGooglePayload, PhotoPayloadType, UpdateExecutorPayloadType} from "../../../api/type";export class AuthStoreService {    rootStore: typeof RootStore    constructor(rootStore: typeof RootStore) {        this.rootStore = rootStore    }    async sendVerifyCode(code: string): Promise<any | void> {        try {            const {data} = await this.rootStore.AuthStore.sendVerifyCode(code)            /* this.rootStore.Notification.setNotification({                 serverResponse: data?.message,                 status: data.status             })*/            return data        } catch (e) {        } finally {        }    }    async sendCode(formattedPhoneNumber?: string): Promise<boolean | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)        try {            const data = await this.rootStore.AuthStore.sendCode(formattedPhoneNumber)            /*  this.rootStore.Notification.setNotification({                  serverResponse: data?.message,                  status: data.status              })*/            return true        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success)        }    }    async sendConsentDateTime(payload: UpdateExecutorPayloadType): Promise<boolean | void> {        try {            const data = await this.rootStore.AuthStore.updateExecutor(payload)            this.rootStore.Notification.setNotification({                serverResponse: data?.message,                status: data.status            })            return true        } catch (e) {        } finally {        }    }    async updateExecutor(payload: UpdateExecutorPayloadType) {        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)        try {            const dataUpdateExecutor = await this.rootStore.AuthStore.updateExecutor(payload)            this.rootStore.Notification.setNotification({                serverResponse: dataUpdateExecutor?.message,                status: dataUpdateExecutor.status            })            const data = await this.rootStore.AuthStore.getSettingExecutor()            if (payload.language) {                //await this.rootStore.DictionaryStore.sendDictionary(payload.language)            }            return data        } catch (e) {            console.log(e)        } finally {            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)        }    }    async sendPhotosForApproval(payload: PhotoPayloadType) {        try {            const dataSavePhoto = await this.rootStore.AuthStore.sendPhotosForApproval(payload)            this.rootStore.Notification.setNotification({                serverResponse: dataSavePhoto?.message,                status: dataSavePhoto.status            })            return await this.rootStore.AuthStore.getSettingExecutor()        } catch (e) {            console.log(e, 'sendPhotosForApproval')        } finally {        }    }    async deletePhoto(photoId: number) {        try {            const dataDeletePhoto = await this.rootStore.AuthStore.deletePhoto(photoId)            this.rootStore.Notification.setNotification({                serverResponse: dataDeletePhoto?.message,                status: dataDeletePhoto.status            })            return await this.rootStore.AuthStore.getSettingExecutor()        } catch (e) {            console.log(e, 'sendPhotosForApproval')        } finally {        }    }    async updatePhoto(photo: string): Promise<boolean | void> {        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)        try {            await this.rootStore.AuthStore.updatePhoto(photo)            await this.rootStore.AuthStore.getSettingExecutor()            return true        } catch (e) {            return false        } finally {            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)        }    }    async logout(): Promise<boolean | void> {        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)        try {            await this.rootStore.AuthStore.logout()            await deviceStorage.removeItem('token')            this.rootStore.AuthStore.clearStore()            await deviceStorage.removeItem('tokenDate')            this.rootStore.AuthStore.setAuth(false)            return true        } catch (e) {            return false        } finally {            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)        }    }    async authWithGoogle(payload: AuthGooglePayload): Promise<boolean | void> {//		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)        try {            const data = await this.rootStore.AuthStore.authWithGoogle(payload)            return data?.token        } catch (e) {            this.rootStore.Notification.setNotification({serverResponse: e?.message})            return false        } finally {        }    }    async getSettingExecutor(navigate?: (key: string, config?: any) => void) {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)        try {            const checkValidToken = await checkToken()            if (!checkValidToken) return 'not_token'            const data = await this.rootStore.AuthStore.getSettingExecutor()            if (data?.message === 'Incorrect token.') return navigate && navigate(routerConstants.LOGIN)            if (data?.message === 'User not found.') return navigate && navigate(routerConstants.LOGIN)            this.rootStore.AuthStore.setAuth(true)            await this.rootStore.AuthStore.getLogisticPoints()            if (!data?.executors?.phone_verify_datetime) return navigate && navigate(routerConstants.PHONE_VERIFY)            if (!data?.executors?.consent_datetime) return navigate && navigate(routerConstants.TERMS_OF_USE)            if (!data?.executors?.executor_logistic_partners_points_id) return navigate && navigate(routerConstants.SELECT_LOGISTIC_POINT)          /*  if (!data?.executors?.executor_approve_datetime) {                const typesToCheck = ['doc', 'face', 'wash', 'iron', 'room', 'address'];                const allTypesExist = typesToCheck.every(typeToCheck => {                    return data.executor_photos_for_approval?.some(category => category.type_of_photo === typeToCheck);                });                if (!allTypesExist) return navigate && navigate(routerConstants.APPROVAL)                if (allTypesExist) {                    const findDontApprovedPhoto = data.executor_photos_for_approval.find((photo) => photo.approved === ApprovedEnum.DONT_APPROVED)                    if (findDontApprovedPhoto) {                        return navigate && navigate(routerConstants.WAITING_VERIFICATION, {error: true}) //photos are missing                    }                    return navigate && navigate(routerConstants.WAITING_VERIFICATION, {error: false}) // waiting                }            }*/           /* if(!data?.executors?.executor_exam_datetime) {            }*/            if(this.rootStore?.NavigationStore?.notification) {                console.log(this.rootStore.NavigationStore.notification.data, 'this.rootStore.NavigationStore.notification.data')                navigate && navigate(this.rootStore.NavigationStore.notification.data.key as string)                this.rootStore.NavigationStore.setNotification(null)            }            return navigate && navigate(routerConstants.EDUCATIONAL_TEST, {exam_passed: false})        } catch (e) {        } finally {            setTimeout(() => {                this.rootStore.Notification.setIsLoading(LoadingEnum.success)            }, 3000)        }    }}export default AuthStoreService