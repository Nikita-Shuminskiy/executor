import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, PermissionsAndroid, PermissionStatus, Platform} from 'react-native';
import notifee, {AndroidImportance, AndroidVisibility} from '@notifee/react-native';
import {authApi} from "../../api/authApi";

export const onDisplayNotification = async (data) => {
    await notifee.displayNotification({
        title: data?.notification.title,
        body: data?.notification.body,
        android: {
            channelId: 'default3',
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
        if (!isAuth) {
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
            const unsubscribe = messaging().onMessage(onDisplayNotification);
            const unsubscribeNotifee = notifee.onForegroundEvent(onForegroundEvent);
            return () => {
                unsubscribeNotifee()
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