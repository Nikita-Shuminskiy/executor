import React from 'react';
import {colors} from "../../../assets/colors/colors";
import {Image, StyleSheet} from "react-native";
import {Box, Text} from "native-base";
import hypoallergenicBlueImg from "../../../assets/Images/order/quill-blue.png";
import ironBlueImg from "../../../assets/Images/order/iron-blue.png";
import InputNumber from "../../InputNumber";

const PriceViewer = ({getInfo, onChangeValuesPrice, price, priceDataPayload}: any) => {
    const onChangeValue = (val: string) => {
        onChangeValuesPrice(price.id, price, val)
    }
    return (
        <Box minH={104} p={3}
             style={styles.shadow} borderRadius={20}
        >
            <Box flexDirection={'row'} alignItems={'center'}>
                <Image alt={'img'} style={styles.img} source={getInfo?.img}/>
                <Box ml={2} alignItems={'flex-start'}>
                    <Text fontSize={17} fontFamily={'semiBold'}>{getInfo?.name}</Text>
                </Box>
            </Box>

            <Box flexDirection={'row'} flex={1} mt={2} w={'100%'} alignItems={'center'}
                 justifyContent={'space-between'}>
                <Text fontSize={13} color={colors.gray} fontFamily={'regular'}>Number of items</Text>
                <Box style={{width: 124, height: 40}} flexDirection={'row'} alignItems={'center'}>
                    <InputNumber
                        imgIcoSize={5}
                        styleInput={styles.styleInput}
                        styleBtn={styles.styleBtn}
                        values={priceDataPayload[price.id] ?? 0}
                        onChangeValue={onChangeValue}
                    />
                </Box>
            </Box>
        </Box>
    );
}
const styles = StyleSheet.create({
    styleInput: {
        color: colors.black,
        fontSize: 17
    },
    styleBtn: {
        height: 40,
        width: 40,
    },
    img: {
        width: 48,
        height: 48,
    },
    shadow: {
        backgroundColor: colors.white,
        margin: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 2.68,
        elevation: 3
    },
})
export default PriceViewer;