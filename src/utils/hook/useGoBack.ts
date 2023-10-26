import {useCallback, useEffect} from 'react'
import { BackHandler } from 'react-native'
import {useFocusEffect} from "@react-navigation/native";

export const useGoBack = (goBackPress) => {
	useFocusEffect(() => {
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', goBackPress)

			return () => {
				BackHandler.removeEventListener('hardwareBackPress', goBackPress)
			}
		}, [])
	})
}
