import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Root from './components/Root';
import Home from './components/Home';

export default (
	<Route path='/' component={Root}>
		<IndexRoute component={Home} />
	</Route>
);
