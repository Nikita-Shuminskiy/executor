import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors} from "../assets/colors/colors";
import {isNaN} from "formik";
import plusImg from '../assets/Images/BurgerMenu/plus.png'
import minusImg from '../assets/Images/BurgerMenu/minus.png'
import {Image} from "native-base";
const checkValidNumber = (value: string | number) => {
    const convertToNumber: number = typeof value === 'string' ? parseInt(value) : value
    return isNaN(convertToNumber) || convertToNumber < 0
}
type InputNumberProps = {
    onChangeValue: (value: string) => void
    values: number
    styleBtn?: StyleProp<ViewStyle>
    styleInput?: StyleProp<TextStyle>
    imgIcoSize?: 5 | 8
}
const InputNumber = ({onChangeValue, values, styleBtn, styleInput, imgIcoSize = 8}: InputNumberProps) => {
    const handleIncrement = () => {
        if (checkValidNumber(values)) return onChangeValue(String(1))
        onChangeValue(String(values + 1))
    };
    const handleDecrement = () => {
        if (checkValidNumber(values) || values === 0) return onChangeValue(String(1))
        onChangeValue(String(values - 1))
    };
    const onChangeText = (value: string) => {
        if(Number(value) > 365) return
        if (checkValidNumber(value)) return onChangeValue(String(1))
        onChangeValue(String(value))
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styleBtn]} onPress={handleDecrement}>
                <Image alt={'img-minus'} source={minusImg} w={imgIcoSize} h={imgIcoSize}/>
            </TouchableOpacity>
            <TextInput
                style={[styles.input, styleInput]}
                keyboardType="numeric"
                value={values?.toString()}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={[styles.button, styleBtn]} onPress={handleIncrement}>
                <Image alt={'img-plus'} source={plusImg} w={imgIcoSize} h={imgIcoSize}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    input: {
        flex: 1,
        fontSize: 56,
        color: colors.blue,
        fontFamily: 'semiBold',
        textAlign: 'center',
    },
    button: {
        height: 72,
        width: 72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grayBright,
        borderRadius: 36,
    },
});

export default InputNumber;
