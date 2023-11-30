import React, {useEffect, useState} from 'react';
import {Box} from "native-base";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {SvgXml} from "react-native-svg";
import {homeSvg, userSvg} from "../../../../assets/Images/Svg";
import Loaders from "react-native-pure-loaders";
import {colors} from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import {StyleSheet} from "react-native";
import {allowLocation, getCurrentPositionHandler} from "../../../../components/MapViews/utils";
import {useFocusEffect} from "@react-navigation/native";
import {OrderDetailType} from "../../../../api/type";

type Coordinates = {
    latitude: number;
    longitude: number;

}
type MapProps = {
    orderDetail: OrderDetailType
}
const Map = ({orderDetail}: MapProps) => {
    const [mapRef, setMapRef] = useState(null)
    const [myPosition, setMyPosition] = useState<Coordinates | null>(null)
    const getCurrentPosition = async () => {
        try {
            const {latitude, longitude} = await getCurrentPositionHandler()
            setMyPosition({latitude, longitude})
        } catch (e) {

        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getCurrentPosition()
        }, [])
    );
    let initialRegion = {
        latitude: 52.2297,
        longitude: 21.0122,
        latitudeDelta: 1.0221,
        longitudeDelta: 1.0221,
    }
    const onPressNavigate = () => {
        /*    if (!myPosition?.latitude) return
            const endLocation = [+orderDetail.client_logistic_partners_points_lat, +orderDetail.client_logistic_partners_points_lon]
            const startLocation = [myPosition.latitude, myPosition.longitude]

            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLocation}&destination=${endLocation}`
            Linking.openURL(googleMapsUrl).catch((err) =>
                console.error('Error opening Google Maps: ', err),
            )*/
    }
    useEffect(() => {
        if (mapRef && myPosition?.latitude) {
            mapRef.fitToCoordinates([{latitude: myPosition.latitude, longitude: myPosition.longitude}], {
                edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                animated: true,
            })
        }
    }, [myPosition])
    return (
        <>
            <Box mt={4} h={400}>
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
                          {/*  <SvgXml xml={userSvg} width="100%" height="100%"/>*/}
                            <SvgXml xml={homeSvg} width="100%" height="100%"/>
                        </Marker>
                    }
                </MapView>
            </Box>
            <Box mb={3} mt={2} alignItems={'center'}>
                {/*  arrowUpSvg*/}
                <Button backgroundColor={colors.blue} colorText={colors.white}
                        styleContainer={styles.btnContainer} onPress={onPressNavigate} title={'Navigate'}/>
            </Box>
        </>
    );
};
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
export default Map;