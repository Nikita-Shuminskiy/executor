import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {CommonScreenPropsType} from "../../../api/type";
import {Box, Text} from "native-base";
import Loaders from 'react-native-pure-loaders'
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {Image, Linking, StyleSheet} from "react-native";
import {arrowUpSvg, homeSvg, timeSvg, userSvg} from "../../../assets/Images/Svg";
import {SvgXml} from "react-native-svg";
import {colors} from "../../../assets/colors/colors";
import {getCurrentPositionHandler} from "../../../components/MapViews/utils";
import Button from "../../../components/Button";
import HeaderGoBackTitle from "../../../components/HeaderGoBackTitle";
import ArrowBack from "../../../components/ArrowBack";
import takeYourThingsImg from '../../../assets/Images/orders/takeThings.png'

type Coordinates = {
    latitude: number;
    longitude: number;
}
type ExecutorMapSProps = CommonScreenPropsType & {}
const ExecutorMapS = ({navigation, route}: ExecutorMapSProps) => {
    //  const isFromExecutorPerfomed = route.params.from === 'takeIt'
    const [myPosition, setMyPosition] = useState<Coordinates>(null)
    const goBackPress = () => {
        navigation.goBack()
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
    return (
        <BaseWrapperComponent>
            <Box paddingX={4}>
                <ArrowBack goBackPress={goBackPress}/>
                <Box mt={2} mb={2}>
                    <Text fontSize={28} fontFamily={'semiBold'}>Swash #id</Text>
                </Box>
                <StatusesHeader text={'123'}/>
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
            </Box>
        </BaseWrapperComponent>
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
export default ExecutorMapS;


type StatusesHeaderProps = {
    date?: string
    backColor?: string
    text: string
    img?: string
}
export const StatusesHeader = ({date, backColor = '#b2a9a9', text, img}: StatusesHeaderProps) => {
    return <Box borderRadius={16} p={4} backgroundColor={backColor} flexDirection={'row'}
                alignItems={'flex-start'} w={'100%'} justifyContent={'center'}>
        <Image source={takeYourThingsImg} style={{width: 40, height: 40}}/>
        <Box ml={2}>
            <Text fontSize={20} fontFamily={'regular'}>{text}</Text>
            {
                date && <Box p={'1.5'} borderRadius={27} alignItems={'center'} justifyContent={'center'}>
                    <SvgXml xml={timeSvg} width="100%" height="100%"/>
                    <Text fontSize={12} fontFamily={'semiBold'}>{`It will be date ${date}`}</Text>
                </Box>
            }
        </Box>
    </Box>
}