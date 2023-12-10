import RootStore from '../../RootStore'import { LoadingEnum } from '../../types/types'import { SendMessagePayloadType } from '../../../api/ChatApi/type'export class ChatStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async getDialog(isLoading = false): Promise<any | void> {		isLoading && this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.ChatStore.getDialog()			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {			isLoading && this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async sendMessage(payload: SendMessagePayloadType): Promise<any | void> {		try {			await this.rootStore.ChatStore.sendMessage(payload)			await this.rootStore.ChatStore.getDialog()			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {		}	}	async sendMessageRead(message_id: string): Promise<any | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.ChatStore.sendMessageRead(message_id)		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}}export default ChatStoreService