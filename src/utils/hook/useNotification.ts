import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {Linking, Platform} from 'react-native';
import {authApi} from "../../api/authApi";
import notifee, {AndroidImportance, AndroidVisibility} from "@notifee/react-native";
import {getNotificationIcon, withNotificationIcons} from "expo-notifications/plugin/build/withNotificationsAndroid";
//+ "📬"
export const onDisplayNotification = async (data) => {
    //getNotificationIcon()
    await notifee.displayNotification({
        ...data.data,
        android: {
            ...JSON.parse(data.data.android),
            lightUpScreen: true,
           // smallIcon: 'ic_small_icon',
            badge: false,
            visibility: AndroidVisibility.PUBLIC,
            pressAction: {launchActivity: 'default', id: 'default'},
           // largeIcon: require('../../../assets/icons.png')
        }
    });
}
export const useNotification = (isAuth: boolean) => {
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

const setupAndroidChannel = async () => {
    await notifee.createChannel({
        id: 'one',
        name: 'One',
        visibility: AndroidVisibility.PUBLIC,
        description: 'Default communication channel for the platform',
        lights: true,
        vibration: true,
        badge: true,
        importance: AndroidImportance.HIGH,
    });
};