import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import HeaderGoBackTitle from "../../../components/HeaderGoBackTitle";
import {CommonScreenPropsType} from "../../../api/type";
import {useGoBack} from "../../../utils/hook/useGoBack";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore";
import rootStore from "../../../store/RootStore/root-store";
import {useBurgerMenu} from "../../../components/BurgerMenu/BurgerMenuContext";
import arrowBackImg from "../../../assets/Images/arrowBackBlue.png";
import InputNumber from "../../../components/InputNumber";

type ShiftSProps = CommonScreenPropsType & {}
const OpenShiftS = observer(({navigation}: ShiftSProps) => {
    const {setIsMenuOpen} = useBurgerMenu()
    const {executorSettings} = AuthStore
    const {AuthStoreService} = rootStore
    const [openShiftsValue, setOpenShiftsValue] = useState('1')
    const [isConfirmation, setIsConfirmation] = useState(false)
    const goBack = () => {
        navigation.goBack()
        return true
    }
    useGoBack(goBack)

    const onPressOpenShift = () => {
        AuthStoreService.sendShiftSetup({ready_for_orders: openShiftsValue}).then((data) => {
            if (data) {
                setIsMenuOpen(true)
            }
        })
    }

    return (
        <BaseWrapperComponent>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={''}
                                   goBackPress={goBack}/>
            </Box>
            <Box paddingX={4}
                 borderColor={'#E4E4E4'} backgroundColor={colors.white}
                 flex={1}
                 justifyContent={'center'}
                 alignItems={'center'}>
                {
                    isConfirmation ? <>
                        <Text fontSize={34} fontFamily={'semiBold'}>Confirmation</Text>
                        <Text fontSize={16} color={colors.gray} textAlign={'center'} fontFamily={'regular'}>
                            Are you sure you want to open a shift with{' '}
                            <Text fontSize={17} fontFamily={'semiBold'}
                                  color={colors.black}>{openShiftsValue} orders?</Text> This number cannot be changed
                            later
                        </Text>
                        <Box w={'80%'} mt={4} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
                            <Button styleContainer={{
                                borderWidth: 1,
                                width: 56,
                                height: 56,
                                borderColor: colors.blue,
                                borderRadius: 28,
                                marginRight: 8
                            }} onPress={() => setIsConfirmation(false)}>
                                <Image alt={'arrow-back'} source={arrowBackImg} w={5} h={5}/>
                            </Button>
                            <Button onPress={onPressOpenShift} styleContainer={styles.styleContainerBtn}
                                    title={'Confirm'}
                                    colorText={colors.white} backgroundColor={colors.blue}/>
                        </Box>
                    </> : <>
                        <Box alignItems={'center'}>
                            <Text fontSize={34} fontFamily={'semiBold'}>Open the shift</Text>
                            <Text fontSize={16} color={colors.gray} fontFamily={'regular'}>Enter the number of
                                orders in this shift</Text>
                        </Box>
                        {
                            openShiftsValue && <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <InputNumber
                                    values={Number(openShiftsValue)}
                                    onChangeValue={setOpenShiftsValue}
                                />
                                <Box w={'100%'} mt={4} justifyContent={'center'} alignItems={'center'}>
                                    <Button onPress={() => setIsConfirmation(true)}
                                            styleContainer={styles.styleContainerBtn}
                                            title={'Open'}
                                            colorText={colors.white} backgroundColor={colors.blue}/>
                                </Box>
                            </Box>
                        }
                    </>
                }

            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
})
export default OpenShiftS;