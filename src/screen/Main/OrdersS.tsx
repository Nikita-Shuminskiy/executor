import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../api/type";
import BurgerMenuBtn from "../../components/BurgerMenu/BurgerMenuBtn";
import {colors} from "../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {useGoBack} from "../../utils/hook/useGoBack";
import {isFutureDate} from "../../utils/commonUtils";
import AuthStore from "../../store/AuthStore/auth-store";
import Button from "../../components/Button";
import {StyleSheet} from "react-native";

type OrdersSProps = CommonScreenPropsType & {}
const OrdersS = observer(({navigation, route}: OrdersSProps) => {
    const isOpenMenu = route.params?.from === 'open_menu'
    const {executorSettings} = AuthStore
    const goBackPress = () => {
        return true
    }

    useGoBack(goBackPress)
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <StatusBar backgroundColor={colors.white}/>
                <Box paddingX={4}>
                    <BurgerMenuBtn openingForced={isOpenMenu}/>
                    <Text>Orders</Text>
                </Box>
            </BaseWrapperComponent>
            {
                isFutureDate(executorSettings?.executors?.datetime_freeze_until) ||
                !executorSettings?.executors?.datetime_workshift_until ||
                +executorSettings.executors.ready_for_orders >= 1 &&
                <Box position={'absolute'} w={'100%'} alignItems={'center'}
                     paddingX={4}
                     justifyContent={'center'} zIndex={1} bottom={'5%'}
                >
                    <Box alignItems={'center'}
                         h={20}
                         w={'100%'}
                         borderRadius={16}
                         justifyContent={'space-evenly'}
                         flexDirection={'row'}
                         backgroundColor={colors.red}
                    >
                        <Text fontSize={15}
                              color={colors.white}
                              fontFamily={'semiBold'}>
                            Вам нужно открыть смену
                        </Text>
                        <Box  mr={2}>
                            <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
                                    styleText={{ fontSize: 13 }}
                                    colorText={colors.white}
                                    onPress={() => {}} title={'Открыть'}/>
                        </Box>
                    </Box>

                </Box>
            }
        </>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        height: 40,
        minHeight: 0
    },
})
export default OrdersS;