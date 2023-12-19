import React from 'react'
import { Box, Text } from 'native-base'
import { Image } from 'react-native'
import smileSleepImg from '../../assets/Images/smileSleep.png'
import { DictionaryEnum } from '../../store/DictionaryStore/type'
import DictionaryStore from '../../store/DictionaryStore/dictionary-store'
import { observer } from 'mobx-react-lite'

const EmptyComponent = observer(() => {
	const { dictionary } = DictionaryStore
	return (
		<Box alignItems={'center'} justifyContent={'center'} flex={1} w={'100%'}>
			<Image style={{ width: 186, height: 180 }} alt={'img-sleep'} source={smileSleepImg} />
			<Text fontSize={28} mt={8} textAlign={'center'} fontFamily={'semiBold'}>
				{dictionary[DictionaryEnum.YouStillHaveNotMadeASwash]}!
			</Text>
		</Box>
	)
})

export default EmptyComponent
