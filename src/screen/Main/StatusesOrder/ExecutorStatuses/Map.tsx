import React from 'react'
import { Box } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { SvgXml } from 'react-native-svg'
import { homeSvg } from '../../../../assets/Images/Svg'
import { colors } from '../../../../assets/colors/colors'
import Button from '../../../../components/Button'
import { Linking, StyleSheet } from 'react-native'
import { OrderDetailType } from '../../../../api/type'
import DictionaryStore from '../../../../store/DictionaryStore/dictionary-store'
import { DictionaryEnum } from '../../../../store/DictionaryStore/type'

type Coordinates = {
	latitude: number
	longitude: number
}
type MapProps = {
	orderDetail: OrderDetailType
}
const Map = ({ orderDetail }: MapProps) => {
	const latitude = Number(orderDetail?.executor_logistic_partners_points_lat)
	const longitude = Number(orderDetail?.executor_logistic_partners_points_lon)
	const { dictionary } = DictionaryStore

	let initialRegion = {
		latitude: latitude ?? 52.2297,
		longitude: longitude ?? 21.0122,
		latitudeDelta: 1.0221,
		longitudeDelta: 1.0221,
	}
	const onPressNavigate = () => {
		if (!latitude) return
		const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${[
			latitude,
			longitude,
		]}`
		Linking.openURL(googleMapsUrl).catch((err) => console.error('Error opening Google Maps: ', err))
	}

	return (
		<>
			<Box mt={4} h={400}>
				<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
					{!!latitude && (
						<Marker
							focusable={true}
							style={{ width: 30, height: 30 }}
							coordinate={{
								latitude: latitude,
								longitude: longitude,
							}}
							title={''}
						>
							<SvgXml xml={homeSvg} width="100%" height="100%" />
						</Marker>
					)}
				</MapView>
			</Box>
			<Box mb={3} mt={2} alignItems={'center'}>
				{/*  arrowUpSvg*/}
				<Button
					backgroundColor={colors.blue}
					colorText={colors.white}
					styleContainer={styles.btnContainer}
					onPress={onPressNavigate}
					title={dictionary[DictionaryEnum.Navigate]}
				/>
			</Box>
		</>
	)
}
const styles = StyleSheet.create({
	btnContainer: {
		borderRadius: 28,
		maxWidth: 280,
		width: '100%',
	},
	containerLoading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(230,245,255,0.37)',
	},
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
})
export default Map
