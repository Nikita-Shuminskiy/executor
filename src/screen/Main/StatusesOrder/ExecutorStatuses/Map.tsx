import React, {useEffect, useState} from 'react';
import {Box} from "native-base";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {SvgXml} from "react-native-svg";
import {homeSvg, userSvg} from "../../../../assets/Images/Svg";
import Loaders from "react-native-pure-loaders";
import {colors} from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import {StyleSheet} from "react-native";
import {getCurrentPositionHandler} from "../../../../components/MapViews/utils";

type Coordinates = {
    latitude: number;
    longitude: number;
}
type MapProps = {}
const Map = ({}: MapProps) => {
    const [myPosition, setMyPosition] = useState<Coordinates>(null)
    const getCurrentPosition = async () => {
        try {
            const {latitude, longitude} = await getCurrentPositionHandler()
            setMyPosition({latitude, longitude})
        } catch (e) {
        }
    }
    useEffect(() => {
        getCurrentPosition()
    }, [])
    let initialRegion = {
        latitude: myPosition?.latitude,
        longitude: myPosition?.longitude,
        latitudeDelta: 0.0221,
        longitudeDelta: 0.0221,
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
    return (
        <>
            <Box mt={4} h={200}>
                {
                    myPosition ? <MapView
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
                                <SvgXml xml={homeSvg} width="100%" height="100%"/>
                            </Marker>
                        }
                    </MapView> : <Box style={styles.containerLoading}>
                        <Loaders.Ellipses color={colors.blue}/>
                    </Box>
                }
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
        height: 200,
    },
})
export default Map;