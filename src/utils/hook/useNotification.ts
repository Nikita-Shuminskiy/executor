import {useEffect, useRef} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, Platform} from 'react-native';
import {authApi} from "../../api/authApi";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {NotificationContentInput} from "expo-notifications";

export const onDisplayNotification = async (data) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
            autoDismiss: true,
            sticky: true
        },
        trigger: { seconds: 2 },
    });
}
export const useNotification = (isAuth) => {
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    useEffect(() => {
        if (!isAuth) {
            requestUserPermission().then((data) => {
                if (data) {
                    messaging()
                        .getToken()
                        .then((token) => {
                            sendToken(token);
                        });
                }
            })
            const unsubscribe = messaging().onMessage((data) => {
                console.log(data, 'onMessage')
                onDisplayNotification(data)
            });

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
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                console.log(notification, 'addNotificationReceivedListener')
                // dismiss notification
                Notifications.dismissNotificationAsync(
                    notification.request.identifier
                );
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response, 'responseresponseresponse');
            });
            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
                unsubscribe()
            }
        }
    }, [isAuth]);
};

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('DEFAULT', {
            name: 'DEFAULT',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            enableLights: true,
            enableVibrate: true
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus
    } else {
        alert('Must use physical device for Push Notifications');
    }
}

const requestUserPermission = async () => {
    try {
        await Notifications.setNotificationCategoryAsync('default', [
            {
                buttonTitle: 'Yes',
                identifier: 'YES',
                options: {
                    opensAppToForeground: true
                }
            },
            {
                buttonTitle: 'NO',
                identifier: 'NO',
                options: {
                    opensAppToForeground: true
                }
            }
        ])
        await registerForPushNotificationsAsync()
        //await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
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
        //await messaging().registerDeviceForRemoteMessages();
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
if (Platform.OS == 'ios') {
    await notifee.requestPermission()
}
const channelId = await notifee.createChannel({
    id: 'default5',
    name: 'default5',
    visibility: AndroidVisibility.PUBLIC,
    importance: AndroidImportance.HIGH,
    bypassDnd: true,
    vibration: true,
});
await notifee.displayNotification({
    title: data?.notification.title,
    body: data?.notification.body,
    id: 'default5',
    android: {
        channelId,
        lightUpScreen: true, // подсветка экрана
        loopSound: true,
        onlyAlertOnce: false, // хз
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
    ios: {
        interruptionLevel: 'active',
        sound: 'default',
        critical: true,
    }
});*/
