import React from 'react'
import { Box, Image, Text } from 'native-base'
import arrowImg from '../../assets/Images/BurgerMenu/arrowGray.png'
import { colors } from '../../assets/colors/colors'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'

type BurgerLinkProps = {
	img: ImageSourcePropType
	text: string
	isRedDot?: boolean
	countryName?: string
	onPress?: () => void
}
const BurgerLink = ({ img, text, onPress, countryName, isRedDot }: BurgerLinkProps) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Box
				justifyContent={'space-between'}
				alignItems={'center'}
				flexDirection={'row'}
				marginY={2}
				borderRadius={16}
				p={4}
				borderWidth={1}
				borderColor={colors.grayBright}
			>
				<Box flexDirection={'row'} alignItems={'center'}>
					<Image w={6} h={6} alt={'img'} source={img} />
					<Text fontSize={14} maxWidth={'90%'} fontWeight={'regular'} ml={2}>
						{text}
					</Text>
				</Box>
				<Box alignItems={'center'} flexDirection={'row'}>
					{countryName && (
						<Text fontSize={14} fontWeight={'regular'} color={colors.grayLight}>
							{countryName}
						</Text>
					)}
					<Image w={6} h={6} alt={'img'} source={arrowImg} />
					{isRedDot && (
						<Box
							position={'absolute'}
							zIndex={10}
							right={10}
							borderRadius={50}
							backgroundColor={colors.red}
							w={3}
							h={3}
						/>
					)}
				</Box>
			</Box>
		</TouchableOpacity>
	)
}

export default BurgerLink
