import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, PermissionsAndroid, PermissionStatus, Platform} from 'react-native';
import AuthStore from "../../store/AuthStore/auth-store";
import notifee, {AndroidColor, AndroidImportance, AndroidVisibility} from '@notifee/react-native';
import {authApi} from "../../api/authApi";
import * as Notifications from 'expo-notifications';
Notifications.scheduleNotificationAsync({
    content: {
        title: "Time's up!",
        body: 'Change sides!',
    },
    trigger: {
        seconds: 2,
    },
});


const onDisplayNotification = async (data) => {
    const channelId = await notifee.createChannel({
        id: 'TEST_1',
        name: 'TEST_1',
        bypassDnd: true,
        importance: AndroidImportance.HIGH,
        lightColor: AndroidColor.BLUE,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'test',
    });

    await notifee.displayNotification({
        title: data?.notification.title,
        body: data?.notification.body,
        android: {
            channelId: channelId,
            lightUpScreen: true, // подсветка экрана
            loopSound: true,
            onlyAlertOnce: false, // хз
            timeoutAfter: 1000000000,
            visibility: AndroidVisibility.PUBLIC,
            importance: AndroidImportance.HIGH,
            ongoing: true, // предотвращает закрытие
            actions: [
                {
                    title: '<p style="color:#164aab;"<b>accept</b></p>',
                    pressAction: {id: 'accept'}
                },
                {
                    title: '<p style="color:#000000;"<b>cansel</b></p>',
                    pressAction: {id: 'cansel'}
                }
            ]
        },
    });
}
export const useNotification = (isAuth) => {
    useEffect(() => {
        if (isAuth) {
            requestUserPermission().then((data) => {
                if (data) {
                    messaging()
                        .getToken()
                        .then((token) => {
                            console.log(token)
                            sendToken(token);
                            notificationListeners()
                        });
                }
            })
        }
    }, [isAuth]);
};

export async function notificationListeners() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        onDisplayNotification(remoteMessage)
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            await onDisplayNotification(remoteMessage)
        });
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
    return unsubscribe
}

const requestUserPermission = async () => {
    try {
        const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        const authStatus = await messaging().requestPermission();
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

/*{
    alert: true,
        sound: true,
    badge: true,
    criticalAlert: true,
    carPlay: true,
    announcement: true,
    providesAppNotificationSettings: true,
    provisional: true,
}*/
/*   const handleNotificationClick = () => {
        console.log('addNotificationResponseReceivedListener')
        // Обработайте действия пользователя при нажатии на уведомление
    };
    const notificationClickSubscription =
        Notifications.addNotificationResponseReceivedListener(handleNotificationClick);*/