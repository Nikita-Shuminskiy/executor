import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../api/type";
import BurgerMenuBtn from "../../components/BurgerMenu/BurgerMenuBtn";
import {colors} from "../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {useGoBack} from "../../utils/hook/useGoBack";
type OrdersSProps = CommonScreenPropsType & {

}
const OrdersS = observer(({navigation}:OrdersSProps) => {
    const goBackPress = () => {
        return true
    }

    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white} />
            <Box paddingX={4}>
                <BurgerMenuBtn openingForced={false}/>
                <Text>Orders</Text>
            </Box>
        </BaseWrapperComponent>
    );
});

export default OrdersS;