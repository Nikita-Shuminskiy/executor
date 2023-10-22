import * as Location from 'expo-location'
import NotificationStore from "../../store/NotificationStore/notification-store";

export const allowLocation = async () => {
	const {setServerErrorText} = NotificationStore
	try {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			setServerErrorText('Permission to access location was denied')
			return
		}
		return status
	} catch (e) {
		console.log('error', e)
	} finally {
	}
}
export const getCurrentPositionHandler = async () => {
	try {
		const status = await allowLocation()
		if (status) {
			let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation })
			const { latitude, longitude } = currentLocation.coords
			return { latitude, longitude }
		}
	} catch (e) {
		console.log(e, 'getCurrentPositionHandler')
	} finally {
	}
}
