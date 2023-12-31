import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Container, Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import { DictionaryEnum } from '../store/DictionaryStore/type'
import DictionaryStore from '../store/DictionaryStore/dictionary-store'

type TimerComponentProps = {
	onPressSendCodeAgain: () => void
}
const TimerComponent = ({ onPressSendCodeAgain }: TimerComponentProps) => {
	const [seconds, setSeconds] = useState(40)
	const [isRunning, setIsRunning] = useState(true)
	const { dictionary } = DictionaryStore
	useEffect(() => {
		if (isRunning && seconds > 0) {
			const interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1)
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		} else if (seconds === 0) {
			setIsRunning(false)
		}
	}, [isRunning, seconds])

	const onPress = () => {
		setSeconds(40)
		setIsRunning(true)
		onPressSendCodeAgain()
	}
	return (
		<Container>
			<Box>
				<Box>
					{isRunning ? (
						<Box>
							<Text fontSize={15} fontFamily={'regular'} color={colors.grayLight}>
								{dictionary[DictionaryEnum.SendCodeAgainAfter]}{' '}
								<Text fontSize={15} fontFamily={'regular'} color={colors.black}>
									{seconds} {dictionary[DictionaryEnum.Seconds]}
								</Text>
							</Text>
						</Box>
					) : (
						<TouchableOpacity onPress={onPress}>
							<Text fontSize={15} fontFamily={'regular'} color={colors.blue}>
								{dictionary[DictionaryEnum.SendCodeAgain]}
							</Text>
						</TouchableOpacity>
					)}
				</Box>
			</Box>
		</Container>
	)
}

export default TimerComponent
