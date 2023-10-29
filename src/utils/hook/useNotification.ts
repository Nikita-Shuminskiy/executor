import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, PermissionsAndroid, PermissionStatus, Platform} from 'react-native';
import notifee, {AndroidImportance, AndroidStyle, AndroidVisibility} from '@notifee/react-native';
import {authApi} from "../../api/authApi";

export const onDisplayNotification = async (data) => {
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
                            sendToken(token);
                        });
                }
            })
            const unsubscribe = messaging().onMessage(onDisplayNotification);
            messaging().setOpenSettingsForNotificationsHandler((data) => {
                console.log(data, 'setOpenSettingsForNotificationsHandler')
            })

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
            return () => {
                unsubscribe()
            }
        }
    }, [isAuth]);
};
const onForegroundEvent = ({type, detail}) => {
    switch (detail?.pressAction?.id) {
        case 'accept':
            console.log('accept')
            break;
        case 'cansel':
            console.log('cansel')
    }
}
const requestUserPermission = async () => {
    try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
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
        await messaging().registerDeviceForRemoteMessages();
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