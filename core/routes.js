import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from '../src/containers/Main';
import Home from '../src/containers/Home';
import About from '../src/containers/About';

export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Home}/>
		<Route path="/about" component={About}/>
	</Route>
);
