import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {NavigationContainerRef} from "@react-navigation/native";
import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {InitialNotification} from "@notifee/react-native";

export class NavigationStore {
    navigation: NavigationContainerRef<ReactNavigation.RootParamList> | null = null
    notification: Notification | null = null
    setNavigation = (navigation: NavigationContainerRef<ReactNavigation.RootParamList>) => {
        this.navigation = navigation
    }
    setNotification = (notificationResponse:  Notification | null) => {
        this.notification = notificationResponse
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new NavigationStore()
