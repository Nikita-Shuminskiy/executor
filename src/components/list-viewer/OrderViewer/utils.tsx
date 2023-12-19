import takeYourThingsImg from '../../../assets/Images/orders/takeThings.png'
import takeYourThingsFromImg from '../../../assets/Images/orders/takeThingsFrom.png'
import paymentRedImg from '../../../assets/Images/orders/payment-red.png'
import waitingImg from '../../../assets/Images/orders/waiting.png'
import { Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import { dateStringFormat } from '../../../utils/commonUtils'
import { LAST_STEP_ORDER_ENUM } from '../../../api/type'
import { DictionaryEnum } from '../../../store/DictionaryStore/type'

export function getLastStepStatusOrder(lastStep: string, date_esimated: string, dictionary) {
	switch (lastStep) {
		case LAST_STEP_ORDER_ENUM.executor_perfomed:
			return {
				img: takeYourThingsImg,
				text: (
					<Text color={colors.orangeVivid}>
						{dictionary[DictionaryEnum.TakeYourThingsToParsel]}
					</Text>
				),
			}
		case LAST_STEP_ORDER_ENUM.client_must_get:
			return {
				img: takeYourThingsFromImg,
				text: (
					<Text color={colors.greenBright}>
						{dictionary[DictionaryEnum.TakeThingsFromParcelLocker]}
					</Text>
				),
			}
		case LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay:
			return {
				img: paymentRedImg,
				text: <Text color={colors.red}>{dictionary[DictionaryEnum.PaymentRequired]}</Text>,
			}

		case LAST_STEP_ORDER_ENUM.executor_done_client_must_pay:
		case LAST_STEP_ORDER_ENUM.auction_open:
		case LAST_STEP_ORDER_ENUM.client_received:
		case LAST_STEP_ORDER_ENUM.client_sent:
		case LAST_STEP_ORDER_ENUM.executor_received:
		case LAST_STEP_ORDER_ENUM.executor_confirm:
		case LAST_STEP_ORDER_ENUM.executor_done:
		case LAST_STEP_ORDER_ENUM.executor_must_get:
		case LAST_STEP_ORDER_ENUM.executor_sent:
			return {
				img: takeYourThingsFromImg,
				text: <Text color={colors.greenBright}>{dictionary[DictionaryEnum.WillBeReady]}</Text>,
			}
		case LAST_STEP_ORDER_ENUM.admin_closed_order:
		case LAST_STEP_ORDER_ENUM.client_confirm:
			return {} // не показывать
		default:
			return {
				img: waitingImg,
				text: (
					<Text color={colors.grayLight}>{dictionary[DictionaryEnum.WaitingForContinuation]}</Text>
				),
			}
	}
}
