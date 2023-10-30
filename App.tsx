import {StatusBar} from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NativeBaseProvider} from 'native-base'
import {LogBox} from 'react-native'
import {useFonts} from '@expo-google-fonts/inter/useFonts'
import {NavigationContainer} from '@react-navigation/native'
import messaging from "@react-native-firebase/messaging";
import {onDisplayNotification} from "./src/utils/hook/useNotification";
import * as Notifications from 'expo-notifications';
LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758
/*spy((ev) => {
	if(ev.type === 'action') {
		console.log(ev, 'ev action')
	}
})*/
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    onDisplayNotification(remoteMessage)
});
export default function App() {
    let [fontsLoaded] = useFonts({
        'regular': require('./assets/font/MyriadPro-Regular.ttf'), //400
        'bold': require('./assets/font/MyriadPro-Bold.ttf'), // 700
        'semiBold': require('./assets/font/MyriadPro-Semibold.ttf'),// 600
    })
   
    if (!fontsLoaded) {
        return null
    }
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NativeBaseProvider>
                <StatusBar hidden={false} style={'auto'} animated={true} translucent={true}/>
                <NavigationContainer>
                    <RootNavigation/>
                </NavigationContainer>
            </NativeBaseProvider>
        </GestureHandlerRootView>
    )
}

