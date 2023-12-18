import React from 'react'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import logoImg from '../assets/Images/logoSwash.png'
import {Box, Image, Text} from 'native-base'
import {StyleSheet} from 'react-native'
import {openBrowserAsync} from "expo-web-browser";
import {BaseWrapperComponent} from "../components/baseWrapperComponent";
import HeaderGoBackTitle from "../components/HeaderGoBackTitle";
import Button from "../components/Button";
import {colors} from "../assets/colors/colors";
import DictionaryStore from "../store/DictionaryStore/dictionary-store";
import {observer} from "mobx-react-lite";
import {DictionaryEnum} from "../store/DictionaryStore/type";

type AboutUsSProps = {
    navigation: NavigationProp<ParamListBase>
}
const AboutUsS = observer(({navigation}: AboutUsSProps) => {
    const {dictionary} = DictionaryStore
    const goBack = () => {
        navigation.goBack()
    }
    const onPressLink = async (link: string) => {
        try {
            await openBrowserAsync(link)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'space-between'}>
                <Box>
                    <HeaderGoBackTitle title={dictionary[DictionaryEnum.AboutSwash]} goBackPress={goBack}/>
                </Box>
                <Box mt={8} mb={6} alignItems={'center'}>
                    <Image source={logoImg} alt={'logo'} style={{width: 128, height: 57}}/>
                </Box>
                <Box>
                    <Text mb={4} fontFamily={'regular'}
                          fontSize={15}>
                        {dictionary[DictionaryEnum.OurGoalIsToMakeProcessSimpleAndAffordable]}
                    </Text>

                    <Text mb={4} fontFamily={'regular'}
                          fontSize={15}>{dictionary[DictionaryEnum.WeNeedLifeVeryBusy__long]}</Text>

                    <Text mb={4} fontFamily={'regular'}
                          fontSize={15}>{dictionary[DictionaryEnum.OrderLaundryServicesInFewClicks]}</Text>

                    <Text mb={6} fontFamily={'regular'}
                          fontSize={15}>{dictionary[DictionaryEnum.HighQualityWashingAndIroning]}</Text>
                </Box>
                <Box mt={6} alignItems={'center'}>
                    <Button backgroundColor={colors.aliceBlue} colorText={colors.blue}
                            styleContainer={styles.styleContainerBtn} styleText={{fontFamily: 'regular'}}
                            onPress={() => onPressLink('https://www.s-wash.com/docs/termofservice.html')}
                            title={dictionary[DictionaryEnum.TermsOfService]}/>
                </Box>
                <Box mt={2} alignItems={'center'}>
                    <Button backgroundColor={colors.aliceBlue} colorText={colors.blue}
                            styleContainer={styles.styleContainerBtn} styleText={{fontFamily: 'regular'}}
                            onPress={() => onPressLink('https://www.s-wash.com/docs/privacy.html')}
                            title={dictionary[DictionaryEnum.PrivaceStatment]}/>
                </Box>
                <Box mt={6} alignItems={'center'}>
                    <Text color={colors.grayLight} fontFamily={'regular'} fontSize={15}>v 1.45.234</Text>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        maxWidth: 280,
        width: '100%',
    }
})
export default AboutUsS
