import { LAST_STEP_ORDER_ENUM } from '../../../../api/type'
import takeThingsImg from '../../../../assets/Images/orders/takeThings.png'
import takeThingsFrom from '../../../../assets/Images/orders/takeThingsFrom.png'
import takeThings from '../../../../assets/Images/orders/takeThingsGray.png'
import packageDeliveryGreen from '../../../../assets/Images/orders/packageDeliveryGreen.png'
import OnTheWay from '../../../../assets/Images/Executor/OnTheWay.png'
import contractorGot from '../../../../assets/Images/Executor/ContractorGot.png'
import checkListPurpureImg from '../../../../assets/Images/check-list-purpure.png'
import handDropStar from '../../../../assets/Images/orders/handDropStar.png'
import { colors } from '../../../../assets/colors/colors'
import { ImageSourcePropType } from 'react-native'
import { dateStringFormat } from '../../../../utils/commonUtils'
import { DictionaryEnum } from '../../../../store/DictionaryStore/type'

type GetStepDataType = {
	date?: string
	text: string
	img: ImageSourcePropType
	bigImg?: ImageSourcePropType
	backColor: string
	textHeader?: string
}
export const getStepData = (
	status: LAST_STEP_ORDER_ENUM,
	dateReady: string,
	dictionary
): GetStepDataType => {
	switch (status) {
		case LAST_STEP_ORDER_ENUM.client_sent: {
			return {
				text: `${dictionary[DictionaryEnum.OrderWillBeReturnedApproximatelyAt]}`,
				date: dateStringFormat(dateReady, 'dd MMMM yyyy'),
				img: takeThingsImg,
				bigImg: OnTheWay,
				textHeader: `${dictionary[DictionaryEnum.OrderOnTheWayToYou]}`,
				backColor: colors.orangeVeryLight,
			}
		}
		case LAST_STEP_ORDER_ENUM.executor_must_get: {
			return {
				text: `${dictionary[DictionaryEnum.PickUpOrderFromPaczkomat]}`,
				img: takeThingsFrom,
				backColor: colors.greenVeryLight,
			}
		}
		case LAST_STEP_ORDER_ENUM.executor_perfomed: {
			return {
				text: `${dictionary[DictionaryEnum.WaitingForOrderToBeSent]}`,
				img: takeThings,
				bigImg: contractorGot,
				textHeader: `${dictionary[DictionaryEnum.WaitingForOrderToBeSent]}`,
				backColor: 'rgba(156,166,173,0.08)',
			}
		}
		case LAST_STEP_ORDER_ENUM.executor_done: {
			return {
				text: `${dictionary[DictionaryEnum.PlaceTheCompletedOrderInTheParcelLocker]}`,
				img: packageDeliveryGreen,
				backColor: colors.greenVeryLight,
			}
		}
		case LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay:
		case LAST_STEP_ORDER_ENUM.executor_confirm: {
			return {
				text: `${dictionary[DictionaryEnum.OrderInProgress]}`,
				img: handDropStar,
				backColor: 'rgba(0,148,255,0.08)',
			}
		}
		case LAST_STEP_ORDER_ENUM.executor_received: {
			return {
				text: `${dictionary[DictionaryEnum.EvaluateOrderComposition]}`,
				img: checkListPurpureImg,
				backColor: 'rgba(164,93,254,0.08)',
			}
		}
		default: {
			return {
				text: 'default',
				//date
				img: takeThingsImg,
				backColor: colors.orangeVeryLight,
			}
		}
	}
}
