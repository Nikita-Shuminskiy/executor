import {useEffect, useRef} from "react";
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {Linking, Platform} from 'react-native';
import {authApi} from "../../api/authApi";
import * as Notifications from 'expo-notifications';
import {AndroidNotificationPriority, AndroidNotificationVisibility} from 'expo-notifications';
import * as Device from 'expo-device';
import {NotificationRequest} from "expo-notifications/src/Notifications.types";
import NavigationStore from "../../store/NavigationStore/navigation-store";
import {routerConstants} from "../../constants/routerConstants";
import AuthStore from "../../store/AuthStore/auth-store";
//+ "📬"
export const onDisplayNotification = async (data: FirebaseMessagingTypes.RemoteMessage) => {
    console.log(data.notification.android.channelId, 'data.notification.android.channelId')
    await Notifications.scheduleNotificationAsync({
        identifier: data.notification.android.channelId,
        content: {
            sound: Platform.OS === "android" ? null : "default",
            categoryIdentifier: data.notification.android.channelId,
            body: data.notification.body,
            title: data.notification.title,
            priority: AndroidNotificationPriority.HIGH,
        },
        trigger: {
            seconds: 1,
        },
    })
}
export const useNotification = (isAuth) => {
    const {navigation, setNotification} = NavigationStore
    const {executorSettings} = AuthStore
    useEffect(() => {
        if(isAuth) {
            requestUserPermission().then((data) => {
                if (data) {
                    messaging()
                        .getToken()
                        .then((token) => {
                            console.log(token)
                            sendToken(token);
                        });
                }
            })
        }
        const unsubscribe = messaging().onMessage((data) => { //expo_notifications_fallback_notification_channel
            onDisplayNotification(data)
            console.log(data, '11')
        });
        // Handle user opening the app from a notification (when the app is in the background)
        //когда приложение открыто , но находится в фоновом режиме .
        const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((remoteMessage) => {
            if(executorSettings?.executors?.email) {
                console.log(remoteMessage.data.key, 'onNotificationOpenedApp')
                navigation && navigation.navigate(remoteMessage.data.key as never)
                return
            }
            setNotification(remoteMessage)
        });

        return () => {
            unsubscribeOnNotificationOpenedApp() // ??
            unsubscribe()
        }
    }, [isAuth]);
};



const requestUserPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250]
            });
        }
        await messaging().registerDeviceForRemoteMessages();
        const authStatus = await messaging().requestPermission({
            provisional: true,
            carPlay: true,
            badge: true,
            sound: true,
            alert: true,
            criticalAlert: true,
            announcement: true,
            providesAppNotificationSettings: true
        });
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (e) {
        return false
    }
}
const sendToken = async (token: string) => {
    try {
        const data = await authApi.sendDeviceToken(token);
    } catch (e) {
        console.log(e, 'sendDeviceToken');
    }
}

async function openAppSettings() {
    if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
    } else {
        await Linking.openSettings();
    }
}
/*
async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                },
                android: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                }
            });
            finalStatus = status;
        }
        return finalStatus
    } else {
    }
}*/

/*  if (Platform.OS === 'android') {
         await Notifications.setNotificationChannelAsync('default', {
             name: 'default',
             importance: Notifications.AndroidImportance.MAX,
             lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
             vibrationPattern: [0, 250, 250, 250],
             lightColor: '#FF231F7C',
         });
     }*/
/* await Notifications.setNotificationCategoryAsync('default', [
     {
         buttonTitle: 'Yess',
         identifier: 'YES',
     },
     {
         buttonTitle: 'NO',
         identifier: 'NO',
     }
 ])*/
//await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)