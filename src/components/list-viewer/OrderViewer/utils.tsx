import takeYourThingsImg from '../../../assets/Images/orders/takeThings.png'
import takeYourThingsFromImg from '../../../assets/Images/orders/takeThingsFrom.png'
import paymentRedImg from '../../../assets/Images/orders/payment-red.png'
import waitingImg from '../../../assets/Images/orders/waiting.png'
import {Text} from 'native-base'
import {colors} from '../../../assets/colors/colors'
import {dateStringFormat} from '../../../utils/commonUtils'
import {LAST_STEP_ORDER_ENUM} from "../../../api/type";


export function getLastStepStatusOrder(lastStep: string, date_esimated: string) {
    switch (lastStep) {
        case LAST_STEP_ORDER_ENUM.executor_perfomed:
            return {
                img: takeYourThingsImg,
                text: <Text color={colors.orangeVivid}>Take your things to parsel</Text>,
            }
        case LAST_STEP_ORDER_ENUM.client_must_get:
            return {
                img: takeYourThingsFromImg,
                text: <Text color={colors.greenBright}>TakeThings from parcelLocker</Text>,
            }
        case LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay:
            return {
                img: paymentRedImg,
                text: <Text color={colors.red}>Payment required</Text>,
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
                text: <Text
                    color={colors.greenBright}>Will be ready</Text>,
            }
        case LAST_STEP_ORDER_ENUM.admin_closed_order:
        case LAST_STEP_ORDER_ENUM.client_confirm:
            return {} // не показывать
        default:
            return {
                img: waitingImg,
                text: <Text color={colors.grayLight}>Waiting for continuation</Text>,
            }
    }
}
