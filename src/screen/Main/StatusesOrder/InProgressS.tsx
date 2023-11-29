import React from 'react';
import {CommonScreenPropsType} from "../../../api/type";
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import ArrowBack from "../../../components/ArrowBack";
import {Box, Text} from "native-base";
import {StatusesHeader} from "./ExecutorStatuses/ExecutorStatusesS";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import {observer} from "mobx-react-lite";
type InProgressSProps = CommonScreenPropsType & {

}
const InProgressS = observer(({navigation, route}:InProgressSProps) => {
    const goBackPress = () => {
        navigation.goBack()
    }
    const onPressComplete = () => {

    }
    return (
        <BaseWrapperComponent>
            <Box paddingX={4}>
                <ArrowBack goBackPress={goBackPress}/>
                <Box mt={4} mb={2}>
                    <Text fontSize={28} fontFamily={'semiBold'}>Swash #id</Text>
                </Box>
                <Text mb={2} fontSize={17} color={'#657C8D'} fontFamily={'regular'}>
                    Be careful. If you have completed the order, the system will check the customer's
                    payment and may ask you to take the completed order to the post office. This is an irreversible step.
                </Text>
                <StatusesHeader text={'The order is in progress'}/>
                <Box mb={3} mt={6} alignItems={'center'}>
                    <Button backgroundColor={colors.blue} colorText={colors.white}
                            styleContainer={styles.btnContainer} onPress={onPressComplete} title={'Completed'}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 28,
        maxWidth: 280,
        width: '100%',
    },
})
export default InProgressS;