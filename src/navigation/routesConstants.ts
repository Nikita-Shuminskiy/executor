import React from 'react';
import TestS from "../screen/Main/TestS";

type Route = {
	name: string;
	component: React.ComponentType;
};

const authenticatedRoutes: Route[] = [
	{component: TestS, name: 'main'}
];

export default authenticatedRoutes;
