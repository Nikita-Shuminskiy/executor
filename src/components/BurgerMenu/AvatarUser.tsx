import React from 'react'
import {Box, Text} from 'native-base'
import {Image, TouchableOpacity} from 'react-native'
import arrowBlue from '../../assets/Images/order/arrowRightBlue.png'
import {colors} from '../../assets/colors/colors'
import {useNavigation} from '@react-navigation/native'
import {BASE_URL} from '../../api/config'
import {observer} from "mobx-react-lite";
import {routerConstants} from "../../constants/routerConstants";
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";

type AvatarProps = {
    photo: string
    name: string
    onClose: () => void
}

const AvatarUser = observer(({photo, name, onClose}: AvatarProps) => {
    const {dictionary} = DictionaryStore

    const navigation = useNavigation<any>()
    const onPressGoProfile = () => {
        navigation.navigate(routerConstants.PROFILE)
        onClose()
    }
    return (
        <TouchableOpacity onPress={onPressGoProfile} style={{paddingTop: 10}}>
            <Box justifyContent={'space-between'}
                 alignItems={'center'}
                 flexDirection={'row'} mb={5}>
                <Box alignItems={'center'}
                     flexDirection={'row'}>
                    {
                        photo && <Image style={{width: 48, height: 48, borderRadius: 28}}
                                        source={{uri: photo}}/>
                    }
                    <Box ml={3} flex={1} mr={4}>
                        <Text fontSize={13} fontFamily={'regular'} color={colors.grayLight}> {dictionary[DictionaryEnum.WelcomeBack]}</Text>
                        <Text fontSize={17} fontFamily={'semiBold'}>{name}</Text>
                    </Box>
                </Box>

                <Image alt={'img'} style={{position: 'relative', right: 15}} source={arrowBlue}/>
            </Box>
        </TouchableOpacity>
    )
})

export default AvatarUser
