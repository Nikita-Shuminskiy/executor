import React from 'react'
import ApprovalInfoS from '../screen/ApprovalScreens/ApprovalInfoS'
import { routerConstants } from '../constants/routerConstants'
import SelectLogisticPointS from '../screen/SelectLogisticPoint/SelectLogisticPointS'
import DocumentsVerification from '../screen/ApprovalScreens/DocumentsVerification/DocumentsVerification'
import WaitingVerificationS from '../screen/ApprovalScreens/WaitingVerificationS'
import EducationalTestS from '../screen/ApprovalScreens/EducationalTest/EducationalTestS'
import EducationalTextS from '../screen/ApprovalScreens/EducationalTest/EducationalTextS'
import ExamS from '../screen/ApprovalScreens/EducationalTest/ExamS'
import ProfileUserS from '../screen/Main/ProfileUser/ProfileUserS'
import ChangeLanguageS from '../screen/Main/ChangeLanguageS'
import ChangeCountryS from '../screen/Main/ChangeCountryS'
import OrdersS from '../screen/Main/Orders/OrdersS'
import ChatS from '../screen/Main/Chat/ChatS'
import OrdersHistoryS from '../screen/Main/OrdersHistory/OrdersHistoryS'
import ReceivingMethodS from '../screen/Main/ReceivingMethodS'
import OpenShiftS from '../screen/Main/Shift/OpenShiftS'
import CloseShiftS from '../screen/Main/Shift/CloseShiftS'
import ExecutorStatusesS from '../screen/Main/StatusesOrder/ExecutorStatuses/ExecutorStatusesS'
import OrderPlacementS from '../screen/Main/StatusesOrder/OrderPlacement/OrderPlacementS'
import EvaluateTheOrderS from '../screen/Main/StatusesOrder/EvaluateTheOrder/EvaluateTheOrderS'
import ClientMustPayS from '../screen/Main/StatusesOrder/ClientMustPayS'

type Route = {
	name: string
	component: React.ComponentType
}

const authenticatedRoutes: Route[] = [
	{ component: OrdersS, name: routerConstants.ORDERS },
	{ component: ApprovalInfoS, name: routerConstants.APPROVAL },
	{ component: SelectLogisticPointS, name: routerConstants.SELECT_LOGISTIC_POINT },
	{ component: DocumentsVerification, name: routerConstants.DOCUMENT_VERIFICATION },
	{ component: WaitingVerificationS, name: routerConstants.WAITING_VERIFICATION },
	{ component: EducationalTestS, name: routerConstants.EDUCATIONAL_TEST },
	{ component: EducationalTextS, name: routerConstants.EDUCATIONAL_TEXT },
	{ component: ExamS, name: routerConstants.EXAM },
	{ component: ProfileUserS, name: routerConstants.PROFILE },
	{ component: ChangeCountryS, name: routerConstants.CHANGE_COUNTRY },
	{ component: ChatS, name: routerConstants.CHAT_SUPPORT },
	{ component: OrdersHistoryS, name: routerConstants.ORDERS_HISTORY },
	{ component: ReceivingMethodS, name: routerConstants.RECEIVING_METHOD },
	{ component: OpenShiftS, name: routerConstants.OPEN_SHIFT },
	{ component: CloseShiftS, name: routerConstants.CLOSE_SHIFT },
	{ component: OrderPlacementS, name: routerConstants.ORDER_PLACEMENT },
	{ component: ExecutorStatusesS, name: routerConstants.EXECUTOR_STATUSES },
	{ component: EvaluateTheOrderS, name: routerConstants.EVALUATE_ORDER },
	{ component: ClientMustPayS, name: routerConstants.CLIENT_PAY },
]

export default authenticatedRoutes
