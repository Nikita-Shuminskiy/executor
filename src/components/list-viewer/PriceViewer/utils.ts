import Outerwear from '../../../assets/Images/Сlothing/Outerwear.png'
import ShirtsJackets from '../../../assets/Images/Сlothing/ShirtsJackets.png'
import tShirtTop from '../../../assets/Images/Сlothing/T-shirts-tops.png'
import PulloversSweaters from '../../../assets/Images/Сlothing/PulloversSweaters.png'
import PantsShorts from '../../../assets/Images/Сlothing/PantsShorts.png'
import SkirtsDresses from '../../../assets/Images/Сlothing/SkirtsDresses.png'
import UnderWearSocks from '../../../assets/Images/Сlothing/UnderwearSocks.png'
import ChildrenClothing from '../../../assets/Images/Сlothing/ChildrensСlothing.png'
import Bedding from '../../../assets/Images/Сlothing/Bedding.png'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

export const getInfoPriceElement = (id: string, dictionary) => {
	let DATA_PRICES = {
		'1': {
			img: Outerwear,
			description: `${dictionary[DictionaryEnum.CoatsJackets]}`,
			name: `${dictionary[DictionaryEnum.Outerwear]}`,
		},
		'2': {
			img: ShirtsJackets,
			description: `${dictionary[DictionaryEnum.ShirtsBlazersFormalStyle]}`,
			name: `${dictionary[DictionaryEnum.ShirtsJackets]}`,
		},
		'3': {
			description: `${dictionary[DictionaryEnum.TanksTShirtsSleevelessTops]}`,
			img: tShirtTop,
			name: `${dictionary[DictionaryEnum.TShirtsTops]}`,
		},
		'4': {
			description: `${dictionary[DictionaryEnum.SweatersCardigansWarmUpperBodyClothing]}`,
			img: PulloversSweaters,
			name: `${dictionary[DictionaryEnum.PulloversSweaters]}`,
		},
		'5': {
			description: `${dictionary[DictionaryEnum.PantsTrousersJeansLegwear]}`,
			img: PantsShorts,
			name: `${dictionary[DictionaryEnum.PantsShorts]}`,
		},
		'6': {
			description: `${dictionary[DictionaryEnum.GarmentsWithSkirtsOrDresses]}`,
			img: SkirtsDresses,
			name: `${dictionary[DictionaryEnum.SkirtsDresses]}`,
		},
		'7': {
			description: `${dictionary[DictionaryEnum.UnderwearItemsIntimateApparel]}`,
			img: UnderWearSocks,
			name: `${dictionary[DictionaryEnum.UnderwearSocks]}`,
		},
		'8': {
			description: `${dictionary[DictionaryEnum.OnesiesRompersSwaddles]}`,
			img: ChildrenClothing,
			name: `${dictionary[DictionaryEnum.ChildrensClothing]}`,
		},
		'9': {
			description: `${dictionary[DictionaryEnum.SheetsPillowcasesDuvetCoversBedding]}`,
			img: Bedding,
			name: `${dictionary[DictionaryEnum.Bedding]}`,
		},
	}
	return DATA_PRICES[id]
}
