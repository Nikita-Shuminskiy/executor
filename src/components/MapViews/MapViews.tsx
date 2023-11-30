import React, {useCallback, useEffect, useState} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet} from 'react-native'
import {Box} from 'native-base'
import NotificationStore from '../../store/NotificationStore/notification-store'
import {getCurrentPositionHandler} from './utils'
import AddressAutocomplete from '../AddressAutocomplete'
import MarkerCustom from './MarkerCustom'
import {LogisticsPointType} from "../../api/type";
import {SvgXml} from "react-native-svg";
import {userSvg} from "../../assets/Images/Svg";
import Button from "../Button";
import {colors} from "../../assets/colors/colors";

type MapViewsProps = {
    logisticPoints?: LogisticsPointType[]
    onPressPaczkomat: (point: LogisticsPointType) => void
}
type DataAutoCompleteType = {
    location: { latitude: number, longitude: number },
    positionMarker: { latitude: number, longitude: number },
    address: { name: string, formatted_address: string }
}
export const MapViews = ({logisticPoints, onPressPaczkomat}: MapViewsProps) => {
    const [mapRef, setMapRef] = useState(null)
    const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>()

    const getCurrentPosition = async () => {
        try {
            const {latitude, longitude} = await getCurrentPositionHandler()
            setMyPosition({latitude, longitude})
        } catch (e) {
            console.log(e, 'catch')
        } finally {
            console.log('finally')
        }
    }
    useEffect(() => {
        if (mapRef && myPosition?.latitude) {
            mapRef.fitToCoordinates([{latitude: myPosition.latitude, longitude: myPosition.longitude}], {
                edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                animated: true,
            })
        }
    }, [myPosition])
    useEffect(() => {
        getCurrentPosition()
    }, [])

    const onSaveAutoCompleteHandler = (data: DataAutoCompleteType) => {
        console.log(data)
    }
    const initialRegion = {
        latitude: 52.2297,
        longitude: 21.0122,
        latitudeDelta: 12,
        longitudeDelta: 18,
    }
    const onPressCheckPoint = useCallback((point: LogisticsPointType) => {
        onPressPaczkomat(point)
    }, [])
    return <>
        <Box style={styles.container}>
            <Box zIndex={20} position={'absolute'} top={5} alignItems={'center'} justifyContent={'center'} flex={1}
                 w={'100%'}>
                <AddressAutocomplete onSave={onSaveAutoCompleteHandler}/>
            </Box>
            <MapView
                ref={(ref) => setMapRef(ref)}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
            >
                {
                    !!myPosition?.latitude && <Marker
                        focusable={true}
                        style={{width: 30, height: 30}}
                        coordinate={myPosition}
                        title={''}
                    >
                        <SvgXml xml={userSvg} width="100%" height="100%"/>
                    </Marker>
                }
                {logisticPoints.length && logisticPoints.map((point) => {
                    return <MarkerCustom onPressCheckPoint={onPressCheckPoint} point={point} key={point.id}/>
                })}
            </MapView>
            {/*<Box mt={5} zIndex={10} position={'absolute'} right={0} bottom={10}>
                <TouchableOpacity onPress={getCurrentPosition}>
                    <Image style={{width: 88, height: 88}} source={myPositionImg}/>
                </TouchableOpacity>
            </Box>*/}
        </Box>

    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})