import React from 'react';
import ApprovalInfoS from "../screen/ApprovalScreens/ApprovalInfoS";
import {routerConstants} from "../constants/routerConstants";
import SelectLogisticPointS from "../screen/ApprovalScreens/SelectLogisticPointS";
import DocumentsVerification from "../screen/ApprovalScreens/DocumentsVerification";
import WaitingVerificationS from "../screen/ApprovalScreens/WaitingVerificationS";
import EducationalTestS from "../screen/ApprovalScreens/EducationalTest/EducationalTestS";

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
];

export default authenticatedRoutes;
