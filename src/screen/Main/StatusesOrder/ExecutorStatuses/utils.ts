import {LAST_STEP_ORDER_ENUM} from "../../../../api/type";
import takeThingsImg from '../../../../assets/Images/orders/takeThings.png'
import takeThingsFrom from '../../../../assets/Images/orders/takeThingsFrom.png'
import takeThings from '../../../../assets/Images/orders/takeThingsGray.png'
import packageDeliveryGreen from '../../../../assets/Images/orders/packageDeliveryGreen.png'
import OnTheWay from '../../../../assets/Images/Executor/OnTheWay.png'
import contractorGot from '../../../../assets/Images/Executor/ContractorGot.png'
import {colors} from "../../../../assets/colors/colors";
import {ImageSourcePropType} from "react-native";

type GetStepDataType = {
    date?: string,
    text: string
    img: ImageSourcePropType,
    bigImg?: ImageSourcePropType,
    backColor: string
    textHeader?: string
}
export const getStepData = (status: LAST_STEP_ORDER_ENUM): GetStepDataType => {
    switch (status) {
        case LAST_STEP_ORDER_ENUM.client_sent: {
            return {
                text: 'Order will be returned approximately at',
                date: '22-11-22',
                img: takeThingsImg,
                bigImg: OnTheWay,
                textHeader: 'The order is on its way to you now',
                backColor: colors.orangeVeryLight
            }
        }
        case LAST_STEP_ORDER_ENUM.executor_must_get: {
            return {
                text: 'Pick up the order from the Paczkomat',
                img: takeThingsFrom,
                backColor: colors.greenVeryLight
            }
        }
        case LAST_STEP_ORDER_ENUM.executor_perfomed: {
            return {
                text: 'Waiting for the order to be sent by the customer',
                img: takeThings,
                bigImg: contractorGot,
                textHeader: 'Waiting for the order to be sent by the customer',
                backColor: 'rgba(156,166,173,0.08)'
            }
        }
        case LAST_STEP_ORDER_ENUM.executor_done: {
            return {
                text: 'Take the order to the Paczkomat',
                img: packageDeliveryGreen,
                backColor: colors.greenVeryLight
            }
        }

        default: {
            return {
                text: 'default',
                //date
                img: takeThingsImg,
                backColor: colors.orangeVeryLight
            }
        }
    }
}