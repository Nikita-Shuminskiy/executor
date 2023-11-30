import {routerConstants} from "../../../constants/routerConstants";
import {allowLocation, getCurrentPositionHandler} from "../../../components/MapViews/utils";
import {LAST_STEP_ORDER_ENUM} from "../../../api/type";

export const onPressOrderDetails = (navigation, order) => {
    switch (order.last_step?.trim()) {

        case LAST_STEP_ORDER_ENUM.client_sent: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.client_sent})
        }
        case LAST_STEP_ORDER_ENUM.executor_must_get: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.executor_must_get})
        }
        case LAST_STEP_ORDER_ENUM.executor_perfomed: {
            getCurrentPositionHandler().then((data) => {
                if (data) {
                    return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.executor_perfomed})
                }
            })
            return
        }
        case LAST_STEP_ORDER_ENUM.executor_done: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.executor_done})
        }

        case LAST_STEP_ORDER_ENUM.executor_received: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.executor_received})
        }
        case LAST_STEP_ORDER_ENUM.executor_confirm: {
            return navigation.navigate(routerConstants.ORDER_PLACEMENT, {from: LAST_STEP_ORDER_ENUM.executor_confirm})
        }
        case LAST_STEP_ORDER_ENUM.executor_sent: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: LAST_STEP_ORDER_ENUM.executor_sent})
        }
        case LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay: {
            return navigation.navigate(routerConstants.ORDER_PLACEMENT, {from: LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay})
        }

    /*    case LAST_STEP_ORDER_ENUM.client_received: {
            return navigation.navigate(routerConstants.CLIENT_RECEIVED)
        }
        case LAST_STEP_ORDER_ENUM.executor_confirm_client_must_pay: {
            return navigation.navigate(routerConstants.CLIENT_PAY, {from: 'client_must_pay'})
        }
        case LAST_STEP_ORDER_ENUM.executor_done_client_must_pay: {
            return navigation.navigate(routerConstants.CLIENT_PAY, {from: 'done_client_must_pay'})
        }*/

        case LAST_STEP_ORDER_ENUM.client_must_get: {
            getCurrentPositionHandler().then((data) => {
                if (data) {
                    return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: 'get'})
                }
            })
            return
        }
    }
}