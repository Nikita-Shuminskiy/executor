import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {NavigationContainerRef} from "@react-navigation/native";
import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {InitialNotification} from "@notifee/react-native";
import {NotificationResponse} from "../../api/type";
import {routerConstants} from "../../constants/routerConstants";

export class NavigationStore {
    navigation: NavigationContainerRef<any> | null = null
    notification: NotificationResponse | null = null
    setNavigation = (navigation: NavigationContainerRef<ReactNavigation.RootParamList>) => {
        this.navigation = navigation
    }
    setNotification = (notificationResponse:  NotificationResponse | null) => {
        this.notification = notificationResponse
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new NavigationStore()
