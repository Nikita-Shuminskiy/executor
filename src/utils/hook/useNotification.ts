import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {authApi} from "../../api/authApi";
import notifee, {AndroidImportance, AndroidVisibility, EventType} from "@notifee/react-native";
import * as Notifications from 'expo-notifications';
import {routerConstants} from "../../constants/routerConstants";

export async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}

const createChannel = async () => {
    return await notifee.createChannel({
        id: 'channel-id',
        name: 'Default channel',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'default',
        importance: AndroidImportance.HIGH,
    }) // return channelId
}
//+ "📬"
export const onDisplayNotification = async (data) => {
    await notifee.requestPermission()
    const channelId = await createChannel()
    await notifee.displayNotification({
        title: data.notification.title,
        body: data.notification.body,
        data: {
            route: data.data.route,
        },
        android: {
            channelId,
            smallIcon: 'notification_icon',
            // pressAction: {
            // 	launchActivity: 'default',
            // 	id: 'default',
            // },
        },
    })
}
export const useNotification = (isAuth: boolean, navigate: (route: string) => void) => {
    useEffect(() => {
        if (isAuth) {
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
    }, [isAuth]);
    useEffect(() => {
        // дергается при открытом приложении
        const unsubscribeForegroundEvent = notifee.onForegroundEvent(async (event) => {
            const {
                type,
                detail: {notification},
            } = event
            if (type === EventType.PRESS) {
                navigate(routerConstants[notification?.data.route as string])
                await notifee.cancelNotification(notification.id)
            }
        })
        // приложение находилось в фоновом режиме и открылось из уведомления
        const unsub = messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('notif opened app:', remoteMessage)
            if (remoteMessage) {
                navigate(routerConstants[remoteMessage?.data.route as string])
            }
        })
        let unsubscribeOnMessage: () => void = () => {
            }
        ;(async () => {
            unsubscribeOnMessage = messaging().onMessage(onDisplayNotification)
        })()
        return () => {
            unsubscribeForegroundEvent()
            unsub()
            unsubscribeOnMessage()
        }
    }, [])
};


const requestUserPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (e) {
        return false
    }
}
const sendToken = async (token: string) => {
    try {
        await authApi.sendDeviceToken(token);
    } catch (e) {
        console.log(e, 'sendDeviceToken');
    }
}