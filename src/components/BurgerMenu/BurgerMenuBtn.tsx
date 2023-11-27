import React, {useEffect} from 'react'
import {Image, TouchableOpacity} from 'react-native'
import burgerImg from '../../assets/Images/burgerMenu.png'
import {useBurgerMenu} from './BurgerMenuContext'
import {Box} from "native-base";
import {colors} from "../../assets/colors/colors";
import {observer} from "mobx-react-lite";
import AuthStore from "../../store/AuthStore/auth-store";
import {isFutureDate} from "../../utils/commonUtils";

const BergerMenuImg = observer(({openingForced}: any) => {
	const {executorSettings} = AuthStore
	const {isMenuOpen, setIsMenuOpen} = useBurgerMenu()
	useEffect(() => {
		if (openingForced) {
			setIsMenuOpen(true)
		}
	}, [openingForced])
	const toggleMenu = () => {
		setIsMenuOpen(true)
	}
	const isFreeze = isFutureDate(executorSettings?.executors?.datetime_freeze_until) ||
		!executorSettings?.executors?.datetime_workshift_until ||
		!(+executorSettings.executors.ready_for_orders >= 1)
	return (
		<TouchableOpacity style={{ position: 'relative' }} onPress={toggleMenu}>
			{
				isFreeze &&
				<Box top={0} position={'absolute'} zIndex={10} left={'7%'} borderRadius={50} backgroundColor={colors.red} w={3} h={3}/>
			}

			<Image style={{width: 38, height: 38}} source={burgerImg}/>
		</TouchableOpacity>
	)
})

export default BergerMenuImg
