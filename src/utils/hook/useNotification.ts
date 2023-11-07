import {useEffect, useRef} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, Platform} from 'react-native';
import {authApi} from "../../api/authApi";
import notifee, {
    AndroidBadgeIconType,
    AndroidImportance,
    AndroidStyle,
    AndroidVisibility,
    EventType
} from "@notifee/react-native";
import {getNotificationIcon, withNotificationIcons} from "expo-notifications/plugin/build/withNotificationsAndroid";
import NavigationStore from "../../store/NavigationStore/navigation-store";
import * as Notifications from 'expo-notifications';
import {deviceStorage} from "../storage/storage";


//+ "📬"
export const onDisplayNotification = async (data) => {
    console.log('1')
    await Notifications.scheduleNotificationAsync({
        content: {
            ...data.data,
            categoryIdentifier: "default"
        },
        identifier: 'default',
        trigger: null,
    });
    /*   await notifee.displayNotification({
           ...data.data,
           android: {
               ...JSON.parse(data.data.android),
               lightUpScreen: true,
               smallIcon: require('../../../assets/ic_notification.png'),
               visibility: AndroidVisibility.PUBLIC,
               pressAction: {launchActivity: 'default', id: 'default'},
               badgeIconType: AndroidBadgeIconType.LARGE,
               importance: AndroidImportance.HIGH,
               //largeIcon: require('../../../assets/icon.png')
           }
       });*/
}
export const useNotification = (isAuth: boolean) => {
    const notificationListener = useRef<any>();
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
        /*const onForegroundEvent = notifee.onForegroundEvent(async ({type, detail}) => {
             const {setNotification} = NavigationStore
             console.log(type, 'onForegroundEvent')
             if((type === EventType.ACTION_PRESS || type === EventType.PRESS)) {
                 console.log('onForegroundEvent press')
                 // @ts-ignore
                 setNotification(detail.notification)
                 await notifee.cancelNotification(detail.notification.id);
             }
         });*/
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // console.log('полученно уведомление')
            /* Слушатели, зарегистрированные этим методом,
                 будут вызываться каждый раз, когда во время работы приложения будет получено уведомление*/
        });
        return () => {
            // onForegroundEvent()
            Notifications.removeNotificationSubscription(notificationListener.current);
        }
    }, [isAuth]);
};


const requestUserPermission = async () => {
    try {
        await setupAndroidChannel()
        await messaging().registerDeviceForRemoteMessages();
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

async function openAppSettings() {
    if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
    } else {
        await Linking.openSettings();
    }
}

const setupAndroidChannel = async () => {
    if(Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
        });
    }
    /*  await notifee.createChannel({
          id: 'one',
          name: 'One',
          visibility: AndroidVisibility.PUBLIC,
          description: 'Default communication channel for the platform',
          lights: true,
          vibration: true,
          badge: true,
          importance: AndroidImportance.HIGH,
      });*/
};