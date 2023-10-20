import React from 'react'
import {Box, Text} from 'native-base'
import {Image, TouchableOpacity} from 'react-native'
import arrowBlue from '../../assets/Images/order/arrowRightBlue.png'
import {colors} from '../../assets/colors/colors'
import {useNavigation} from '@react-navigation/native'
import {BASE_URL} from '../../api/config'
import {observer} from "mobx-react-lite";

type AvatarProps = {
    photo: string
    name: string
    onClose: () => void
}

const AvatarUser = observer(({photo, name, onClose}: AvatarProps) => {
    const photoUrl = `${BASE_URL}${photo}`
    const navigation = useNavigation<any>()
    const onPressGoProfile = () => {
        //navigation.navigate(routerConstants.PROFILE)
        onClose()
    }
    return (
        <TouchableOpacity onPress={onPressGoProfile} style={{paddingTop: 10}}>
            <Box justifyContent={'space-between'}
                 alignItems={'center'}
                 flexDirection={'row'} mb={9}>
                <Box alignItems={'center'}
                     flexDirection={'row'}>
                    <Image style={{width: 48, height: 48, borderRadius: 28}} resizeMode={'cover'}
                           source={{uri: photoUrl}}/>
                    <Box ml={3} flex={1} mr={4}>
                        <Text fontSize={13} fontFamily={'regular'} color={colors.grayLight}>Welcome back</Text>
                        <Text fontSize={17} fontFamily={'semiBold'}>{name}</Text>
                    </Box>
                </Box>

                <Image alt={'img'} style={{position: 'relative', right: 15}} source={arrowBlue}/>
            </Box>
        </TouchableOpacity>
    )
})

export default AvatarUser
