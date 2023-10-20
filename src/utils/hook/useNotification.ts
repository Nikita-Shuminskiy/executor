import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";
import {authApi} from "../../api/authApi";
import AuthStore from "../../store/AuthStore/auth-store";

const sendToken = async (token) => {
    try {
        const data = await authApi.sendDeviceToken(token);
        console.log(data)
    } catch (e) {
        console.log(e, 'sendDeviceToken');
    }
}

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

export const useNotification = () => {
    const {isAuth} = AuthStore;

    useEffect(() => {
        if (isAuth) {
            if (requestUserPermission()) {
                messaging()
                    .getToken()
                    .then((token) => {
                        sendToken(token);
                    });
            }

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            const handleNotificationClick = () => {
                // Обработайте действия пользователя при нажатии на уведомление
            };

            const notificationClickSubscription =
                Notifications.addNotificationResponseReceivedListener(
                    handleNotificationClick
                );

            messaging().onNotificationOpenedApp((remoteMessage) => {
                handleNotificationClick();
            });

            messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                    // Обработайте уведомление, если оно открыто из уведомления
                });

            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log("Message handled in the background!");
            });

            const handlePushNotification = async (remoteMessage) => {
                console.log('Handle push notifications when the app is in the foreground');
                const notification = {
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    data: remoteMessage.data, // optional data payload
                };

                // Schedule the notification with a null trigger to show immediately
                await Notifications.scheduleNotificationAsync({
                    content: notification,
                    trigger: null, // Уведомление будет показано немедленно
                });
            };

            const unsubscribe = messaging().onMessage(handlePushNotification);

            return () => {
                unsubscribe();
                notificationClickSubscription.remove();
            };
        }
    }, [isAuth]);
};
