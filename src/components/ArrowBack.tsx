import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import arrowLeftBlackImg from "../assets/Images/arrowBackBlue.png";
import {useNavigation} from "@react-navigation/native";

type ArrowBackProps = {
    goBackPress?: () => void,
    img?: ImageSourcePropType
    styleTouchable?: any
}
const ArrowBack = ({goBackPress, img, styleTouchable}: ArrowBackProps) => {
    const navigation = useNavigation()
    const onPressGoBack = () => {
        if (goBackPress) {
            return goBackPress()
        }
        navigation.goBack()
    }
    return (
        <TouchableOpacity style={{marginTop: 10, ...styleTouchable}} onPress={onPressGoBack}>
            <Image style={{width: 20, height: 14}} source={img ?? arrowLeftBlackImg}/>
        </TouchableOpacity>
    );
};

export default ArrowBack;
