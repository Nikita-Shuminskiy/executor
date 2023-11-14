import * as Localization from 'expo-localization'
import NetInfo from '@react-native-community/netinfo'
import { enUS } from 'date-fns/locale'
import { format, isBefore, subYears } from 'date-fns';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deviceStorage} from "./storage/storage";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {Platform} from "react-native";
export const language = Localization.locale;
const checkInternet = async () => {
	const netInfoState = await NetInfo.fetch()
	return netInfoState.isConnected
}
export const dateStringFormat = (date: string, formatDate: string) => {
	if(!date) return ''
	const inputDate = new Date(date);
	return format(inputDate, formatDate, { locale: enUS })
}
export const getCurrentDate = (formats = 'DD/MM/YYYY') => {
	const now = new Date();
	return format(now, formats);
}
export const checkToken = async () => {
	const savedToken = await deviceStorage.getItem('token');
	const tokenDate = await deviceStorage.getItem('tokenDate');
	if (savedToken && tokenDate) {
		const currentDate = new Date();
		const oneYearAgo = subYears(currentDate, 1);
		const tokenDateObject = new Date(tokenDate);
		if (isBefore(tokenDateObject, currentDate) && !isBefore(tokenDateObject, oneYearAgo)) {
			// Token is valid and stored for less than a year
			return true
		}

		// Token expire (state more year)
		console.log('Token expire.');
		await deviceStorage.removeItem('token');
		await deviceStorage.removeItem('tokenDate');
		return false
	}
}
export const convertToFormDataImg = async (img: string) => {
	const resizedImage = await manipulateAsync(
		img,
		[{ resize: { width: 720, height: 1280 } }],
		{ format: 'jpeg' as SaveFormat, compress: 0.5 },
	)
	const formData = new FormData()
	// @ts-ignore
	formData.append('photo', { uri: resizedImage.uri,
		name: 'image.jpg',
		type: 'image/jpeg',
	})
	return formData
}
export const generateBoxShadowStyle = (
	xOffset,
	yOffset,
	shadowColorIos,
	shadowOpacity,
	shadowRadius,
	elevation,
	shadowColorAndroid,
) => {
	if (Platform.OS === 'ios') {
		return {
			shadowColor: shadowColorIos,
			shadowOffset: {width: xOffset, height: yOffset},
			shadowOpacity,
			shadowRadius,
		};
	} else if (Platform.OS === 'android') {
		return {
			elevation,
			shadowColor: shadowColorAndroid,
		};
	}
};