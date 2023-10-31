import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {NavigationContainerRef} from "@react-navigation/native";
import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";

export class NavigationStore {
    navigation: NavigationContainerRef<ReactNavigation.RootParamList> | null = null
    notification: FirebaseMessagingTypes.RemoteMessage | null = null
    setNavigation = (navigation: NavigationContainerRef<ReactNavigation.RootParamList>) => {
        this.navigation = navigation
    }
    setNotification = (notificationResponse:  FirebaseMessagingTypes.RemoteMessage | null) => {
        this.notification = notificationResponse
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new NavigationStore()
