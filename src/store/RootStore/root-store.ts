import {makeAutoObservable} from 'mobx'import AuthStore from '../AuthStore/auth-store'import AuthStoreService from '../service/AuthStoreService/auth-store-service'import NavigationStore from "../NavigationStore";import ChatStoreService from '../service/ChatStoreService/chat-store-service';import ChatStore from '../ChatStore/chat-store';import OrdersStoreService from '../service/OrdersStoreService/OrdersStoreService';import OrdersStore from '../OrdersStore/orders-store';import DictionaryStore from "../DictionaryStore";import NotificationStore from '../CommonStore/common-store'export class RootStore {    // init service    AuthStoreService: AuthStoreService = null as unknown as AuthStoreService    ChatStoreService: ChatStoreService = null as unknown as ChatStoreService    OrdersStoreService: OrdersStoreService = null as unknown as OrdersStoreService    //init store    AuthStore: typeof AuthStore = null as unknown as typeof AuthStore    OrdersStore: typeof OrdersStore = null as unknown as typeof OrdersStore    NavigationStore: typeof NavigationStore = null as unknown as typeof NavigationStore    Notification: typeof NotificationStore = null as unknown as typeof NotificationStore    DictionaryStore: typeof DictionaryStore = null as unknown as typeof DictionaryStore    ChatStore: typeof ChatStore = null as unknown as typeof ChatStore    constructor() {        makeAutoObservable(this)        this.AuthStoreService = new AuthStoreService(this as any)        this.ChatStoreService = new ChatStoreService(this as any)        this.OrdersStoreService = new OrdersStoreService(this as any)        this.AuthStore = AuthStore        this.DictionaryStore = DictionaryStore        this.OrdersStore = OrdersStore        this.NavigationStore = NavigationStore        this.Notification = NotificationStore        this.ChatStore = ChatStore    }}export default new RootStore()