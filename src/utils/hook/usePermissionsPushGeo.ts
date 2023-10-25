
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import {PermissionsAndroid, PermissionStatus} from "react-native";


export const usePermissionsPushGeo = () => {

	const [notificationStatus, setNotificationStatus] = useState<string>('undetermined')
	const [locationStatus, setLocationStatus] = useState<string>('undetermined')
	const askNotificationPermissionHandler = async () => {
		const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
		return permission
	}

	const askLocationPermissionHandler = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		setLocationStatus(status)
		return status
	}

	useEffect(() => {
		(async () => {
			try {
				const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
				setNotificationStatus(permission)
				const { status: existingLocationStatus } = await Location.getForegroundPermissionsAsync()
				setLocationStatus(existingLocationStatus)
			} catch (e) {

			} finally {
			}
		})()
	}, [])

	return {
		askLocationPermissionHandler,
		askNotificationPermissionHandler,
		locationStatus,
		notificationStatus,
	}
}
