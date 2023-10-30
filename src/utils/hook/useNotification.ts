import {useEffect, useRef} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, Platform} from 'react-native';
import {authApi} from "../../api/authApi";
import * as Notifications from 'expo-notifications';
import {AndroidNotificationPriority, AndroidNotificationVisibility} from 'expo-notifications';
import * as Device from 'expo-device';
//+ "📬"
export const onDisplayNotification = async (data) => {
    await Notifications.scheduleNotificationAsync({
        identifier: 'default2',
        content: {
            sound: Platform.OS === "android" ? null : "default",
            categoryIdentifier: 'default2',
            body: data.notification.body,
            title: data.notification.title ,
            priority: AndroidNotificationPriority.HIGH,
            color: '#33469a',
        },
        trigger: {
            seconds: 1,
        },
    })
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
                            //console.log(token)
                            sendToken(token);
                        });
                }
            })

            const unsubscribe = messaging().onMessage((data) => {
                onDisplayNotification(data)
            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                console.log(notification, 'addNotificationReceivedListener')

            });
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                if (response.actionIdentifier === 'NO') {
                    alert('NO')
                    Notifications.dismissNotificationAsync(
                        response.notification.request.identifier
                    );
                }
                console.log('addNotificationResponseReceivedListener')
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
}

const requestUserPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default2', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
       /* await Notifications.setNotificationCategoryAsync('default2', [
            {
                buttonTitle: 'Yess',
                identifier: 'YES',
            },
            {
                buttonTitle: 'NO',
                identifier: 'NO',
            }
        ])*/
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
messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
            );
        }
    });*/
