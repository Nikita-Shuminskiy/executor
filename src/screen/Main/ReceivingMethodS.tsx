import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {CommonScreenPropsType} from "../../api/type";
import {Box} from "native-base";
import HeaderGoBackTitle from "../../components/HeaderGoBackTitle";
import InputCustom from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";

type ReceivingMethodSProps = CommonScreenPropsType & {}
const ReceivingMethodS = ({navigation}: ReceivingMethodSProps) => {
    const [data, setData] = useState({
        accNumber: '',
        name: '',
    })
    const isDisabledBtn = !data.accNumber || !data.name
    const goBack = () => {
        navigation.goBack()
    }
    const onChangeData = (text: string, key) => {
        setData(prev => {
            return {
                ...data,
                [key]: text
            }
        })
    }
    const onPressSave = () => {
        console.log(data)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={false}>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={'Add receiving method'} goBackPress={goBack}/>
            </Box>
            <Box paddingX={4}>
                <Box mb={4}>
                    <InputCustom
                        borderRadius={12}
                        borderColor={colors.grayBright}
                        placeholder={'Account number'}
                        label={'Account number'}
                        value={data.accNumber}
                        placeholderTextColor={'#B0BAC1'}
                        onChangeText={(e) => onChangeData(e, 'accNumber')}
                        //maxLength={19}
                    />
                </Box>
                <Box>
                    <InputCustom
                        borderRadius={12}
                        borderColor={colors.grayBright}
                        placeholder={'Full name'}
                        label={'Account owner'}
                        value={data.name}
                        placeholderTextColor={'#B0BAC1'}
                        onChangeText={(e) => onChangeData(e, 'name')}
                    />
                </Box>
                <Box mt={10} flex={1} w={'100%'} alignItems={'center'}>
                    <Button styleContainer={{maxWidth: 280, width: '100%', borderRadius: 28}}
                            backgroundColor={isDisabledBtn ? colors.bluePale : colors.blue}
                            colorText={colors.white}
                            onPress={onPressSave} title={'Add receiving method'}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
};

export default ReceivingMethodS;