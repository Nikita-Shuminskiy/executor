import React from 'react';
import ApprovalS from "../screen/Main/ApprovalS";
import {routerConstants} from "../constants/routerConstants";

type Route = {
	name: string;
	component: React.ComponentType;
};

const authenticatedRoutes: Route[] = [
	{component: ApprovalS, name: routerConstants.APPROVAL}
];

export default authenticatedRoutes;
