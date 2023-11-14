import React from 'react';
import ApprovalInfoS from "../screen/ApprovalScreens/ApprovalInfoS";
import {routerConstants} from "../constants/routerConstants";
import SelectLogisticPointS from "../screen/ApprovalScreens/SelectLogisticPointS";
import DocumentsVerification from "../screen/ApprovalScreens/DocumentsVerification/DocumentsVerification";
import WaitingVerificationS from "../screen/ApprovalScreens/WaitingVerificationS";
import EducationalTestS from "../screen/ApprovalScreens/EducationalTest/EducationalTestS";
import EducationalTextS from "../screen/ApprovalScreens/EducationalTest/EducationalTextS";
import ExamS from "../screen/ApprovalScreens/EducationalTest/ExamS";
import ProfileUserS from "../screen/Main/ProfileUser/ProfileUserS";
import ChangeLanguageS from "../screen/Main/ChangeLanguageS";
import ChangeCountryS from "../screen/Main/ChangeCountryS";
import OrdersS from "../screen/Main/OrdersS";
import ChatS from "../screen/Main/Chat/ChatS";
import OrdersHistoryS from "../screen/Main/OrdersHistory/OrdersHistoryS";
import ReceivingMethodS from "../screen/Main/ReceivingMethodS";
import ShiftS from "../screen/Main/Shift/ShiftS";

type Route = {
    name: string;
    component: React.ComponentType;
};

const authenticatedRoutes: Route[] = [
    {component: ApprovalInfoS, name: routerConstants.APPROVAL},
    {component: SelectLogisticPointS, name: routerConstants.SELECT_LOGISTIC_POINT},
    {component: DocumentsVerification, name: routerConstants.DOCUMENT_VERIFICATION},
    {component: WaitingVerificationS, name: routerConstants.WAITING_VERIFICATION},
    {component: EducationalTestS, name: routerConstants.EDUCATIONAL_TEST},
    {component: EducationalTextS, name: routerConstants.EDUCATIONAL_TEXT},
    {component: ExamS, name: routerConstants.EXAM},
    {component: ProfileUserS, name: routerConstants.PROFILE},
    {component: ChangeLanguageS, name: routerConstants.CHANGE_LANGUAGE},
    {component: ChangeCountryS, name: routerConstants.CHANGE_COUNTRY},
    {component: OrdersS, name: routerConstants.ORDERS},
    {component: ChatS, name: routerConstants.CHAT_SUPPORT},
    {component: OrdersHistoryS, name: routerConstants.ORDERS_HISTORY},
    {component: ReceivingMethodS, name: routerConstants.RECEIVING_METHOD},
    {component: ShiftS, name: routerConstants.OPEN_SHIFT},
];

export default authenticatedRoutes;
