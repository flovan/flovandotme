import React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';

const Root = require('../components/Root');
const Home = require('../components/Home');

module.exports = function () {
	return (
		<Route path='/' component={Root} />
	);
};

{/*<Route path='/' component={Root}>
	<DefaultRoute component={Home} />
</Route>*/}
