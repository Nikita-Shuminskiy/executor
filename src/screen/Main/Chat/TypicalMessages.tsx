import React, { useEffect, useState } from 'react'
import { Box, Text } from 'native-base'
import { Dimensions, TouchableOpacity } from 'react-native'
import { colors } from '../../../assets/colors/colors'

type TypicalMessagesProps = {
	onPress: () => void
	typicalMessage: any
	index: number
}
const TypicalMessages = ({ onPress, typicalMessage, index }: TypicalMessagesProps) => {
	return (
		<Box mb={2} flexDirection={'row'}>
			<TouchableOpacity onPress={onPress}>
				<Box p={2} borderRadius={50} borderWidth={1} borderColor={colors.grayBright}>
					<Text color={colors.blue} fontSize={15} fontFamily={'regular'}>
						{typicalMessage.message}
					</Text>
				</Box>
			</TouchableOpacity>
		</Box>
	)
}

export default TypicalMessages
