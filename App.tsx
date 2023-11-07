import {StatusBar} from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NativeBaseProvider} from 'native-base'
import {LogBox} from 'react-native'
import {useFonts} from '@expo-google-fonts/inter/useFonts'
import {NavigationContainer} from '@react-navigation/native'
import messaging from "@react-native-firebase/messaging";
import {onDisplayNotification} from "./src/utils/hook/useNotification";
import NavigationStore from "./src/store/NavigationStore/navigation-store";
import notifee, {EventType} from "@notifee/react-native";

LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
import * as Notifications from 'expo-notifications';
import {deviceStorage} from "./src/utils/storage/storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758
/*spy((ev) => {
	if(ev.type === 'action') {
		console.log(ev, 'ev action')
	}
})*/
messaging().onMessage(onDisplayNotification);
messaging().setBackgroundMessageHandler(onDisplayNotification);
Notifications.addNotificationResponseReceivedListener(async response => {
    console.log(' пользователь взаимодействует с уведомление', response);
  await deviceStorage.saveItem('test', '1')
    /*     Слушатели, зарегистрированные этим методом, будут вызываться каждый раз,
             когда пользователь взаимодействует с уведомлением (например, нажимает на него)*/
});
/*
notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    const {setNotification} = NavigationStore
    console.log(type, 'onBackgroundEvent')
    /!*   Фоновые задачи выполняются без контекста React,
           а это означает, что вы не можете обновить пользовательский интерфейс приложения.
           Однако вы можете выполнить логику для обновления удаленной базы данных,*!/
    // Check if the user pressed the "Mark as read" action
    if ((type === EventType.ACTION_PRESS || type === EventType.PRESS) && pressAction.id === 'default') {
        setNotification(detail.notification)
        console.log('onBackgroundEvent press')
        await notifee.cancelNotification(notification.id);
    }
});
*/

export default function App() {
    let [fontsLoaded] = useFonts({
        'regular': require('./assets/font/MyriadPro-Regular.ttf'), //400
        'bold': require('./assets/font/MyriadPro-Bold.ttf'), // 700
        'semiBold': require('./assets/font/MyriadPro-Semibold.ttf'),// 600
    })
    const {setNavigation} = NavigationStore
    if (!fontsLoaded) {
        return null
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NativeBaseProvider>
                <StatusBar hidden={false} style={'auto'} animated={true} translucent={true}/>
                <NavigationContainer ref={(navigationRef) => {
                    setNavigation(navigationRef);
                }}>
                    <RootNavigation/>
                </NavigationContainer>
            </NativeBaseProvider>
        </GestureHandlerRootView>
    )
}

