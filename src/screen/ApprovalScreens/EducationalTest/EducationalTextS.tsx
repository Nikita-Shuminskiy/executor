import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {CommonScreenPropsType} from "../../../api/type";
import {Box, Progress, Text} from "native-base";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet} from "react-native";
import {routerConstants} from "../../../constants/routerConstants";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore/auth-store";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {StatusBar} from "expo-status-bar";
import {useIsFocused} from "@react-navigation/native";

type EducationalTextSProps = CommonScreenPropsType & {}
const EducationalTextS = observer(({navigation}: EducationalTextSProps) => {
    const {executorSettings} = AuthStore
    const isFocused = useIsFocused()
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    useEffect(() => {
      if(isFocused && !isRunning) {
          setIsRunning(true)
      }
        if(!isFocused) {
            console.log('return')
            setIsRunning(false)
            setSeconds(0)
        }

    }, [isFocused]);
    useEffect(() => {
        if (isRunning && seconds < 60) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        } else if (seconds === 60) {
            setIsRunning(false)
        }
    }, [isRunning, seconds])
    const onPressGoToExam = () => {
        navigation.navigate(routerConstants.EXAM)
    }
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <StatusBar backgroundColor={colors.white}/>
            <Box paddingTop={10} alignItems={'center'} justifyContent={'center'}>
                <Box paddingX={4}>
                    <Text fontFamily={'regular'} mb={7} fontSize={15}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis cursus ex. Vivamus mi
                        est,
                        hendrerit at fermentum at, facilisis id velit. Praesent id sapien vel nibh molestie cursus sed
                        vitae
                        est. Morbi ultrices dolor at cursus mattis. Cras in risus vitae risus porta vulputate. In
                        efficitur
                        enim neque, nec faucibus mi sollicitudin quis. Etiam sit amet tempor orci, sit amet ultricies
                        erat.
                        Vestibulum feugiat, quam et dignissim mollis, metus est pretium tellus, vel euismod tortor enim
                        sit
                        amet elit. Ut imperdiet ante sed velit dignissim bibendum.
                    </Text>
                    <Text fontFamily={'regular'} mb={7} fontSize={15}>
                        Sed maximus arcu ac dui placerat, ac cursus tellus pretium. Nullam porttitor ac arcu ut euismod.
                        Vivamus pulvinar, magna at accumsan maximus, arcu arcu maximus arcu, non sagittis mi lectus eget
                        lorem. Vivamus accumsan pretium justo ac vulputate. Quisque at metus et massa pulvinar accumsan.
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam risus
                        magna, pharetra dignissim dignissim id, imperdiet eu tellus. Donec hendrerit neque id massa
                        iaculis,
                        ut aliquam diam tempus. Proin tellus est, pellentesque et rhoncus sed, tincidunt quis ante.
                        Pellentesque dapibus justo eu porta sodales. Quisque risus risus, pretium vitae volutpat eget,
                        posuere a ipsum. Nam et nibh eu risus iaculis consequat at vitae dolor. Aliquam vulputate sed
                        odio
                        id mattis. Mauris dictum eget mi quis feugiat. Donec viverra eros aliquet aliquam sodales.
                    </Text>
                    <Text fontFamily={'regular'} fontSize={15}>
                        Donec eu leo id dolor tincidunt varius. Nulla quis luctus sem, ultrices varius sapien. Integer
                        erat
                        augue, rutrum a lectus ac, viverra tincidunt nisi. In hac habitasse platea dictumst. Sed
                        fermentum
                        ligula vel enim accumsan, ac gravida leo sollicitudin. Mauris ut fringilla nisl, ac vestibulum
                        nulla. Aliquam sed ultrices orci, ac feugiat sem. Nam augue ipsum, facilisis vitae tempor id,
                        tincidunt vel mauris. Ut tempor malesuada nisl, ut rutrum sem aliquam vel.
                        Donec eu leo id dolor tincidunt varius. Nulla quis luctus sem, ultrices varius sapien. Integer
                        erat
                        augue, rutrum a lectus ac, viverra tincidunt nisi. In hac habitasse platea dictumst. Sed
                        fermentum
                        ligula vel enim accumsan, ac gravida leo sollicitudin. Mauris ut fringilla nisl, ac vestibulum
                        nulla. Aliquam sed ultrices orci, ac feugiat sem. Nam augue ipsum, facilisis vitae tempor id,
                        tincidunt vel mauris. Ut tempor malesuada nisl, ut rutrum sem aliquam vel.Donec eu leo id dolor
                        tincidunt varius. Nulla quis luctus sem, ultrices varius sapien. Integer erat augue, rutrum a
                        lectus
                        ac, viverra tincidunt nisi. In hac habitasse platea dictumst. Sed fermentum ligula vel enim
                        accumsan, ac gravida leo sollicitudin. Mauris ut fringilla nisl, ac vestibulum nulla. Aliquam
                        sed
                        ultrices orci, ac feugiat sem. Nam augue ipsum, facilisis vitae tempor id, tincidunt vel mauris.
                        Ut
                        tempor malesuada nisl, ut rutrum sem aliquam vel.
                    </Text>

                </Box>
                <Box w={'100%'} mb={3} mt={5}>
                    <Progress position={'absolute'} max={60} w={'100%'} height={3} _filledTrack={{
                        bg: "#0DA62F"
                    }} value={seconds}/>
                </Box>
                <Box flex={1} w={'100%'} alignItems={'center'} mt={5} mb={5}>

                    <Button onPress={onPressGoToExam} styleContainer={styles.styleContainerBtn}
                            title={'Finish reading, go to the exam'}
                            colorText={colors.white} disabled={isRunning}
                            backgroundColor={ isRunning ? '#D0D0D0' :colors.orange}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    styleContainerBtn: {
        borderRadius: 28,
        maxWidth: 280,
        width: '100%',
        marginBottom: 10
    },
})
export default EducationalTextS;