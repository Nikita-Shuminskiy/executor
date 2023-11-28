import {routerConstants} from "../../../constants/routerConstants";
import {allowLocation, getCurrentPositionHandler} from "../../../components/MapViews/utils";
import {LastStep} from "../../../api/type";

export const onPressOrderDetails = (navigation, order) => {
    switch (order.last_step?.trim()) {
        case LastStep.client_must_get: {
            getCurrentPositionHandler().then((data) => {
                //awaiting shipment of the order by the client
                if (data) {
                    return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'get'})
                }
            })
            return
        }
    }
}