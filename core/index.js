import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';

import routes from './routes';

// Client render
if (typeof document !== 'undefined') {
	ReactDOM.render(
		<Router history={browserHistory} routes={routes} />,
		document.getElementById('root')
	);
}

export default ({assets, template, path}, callback) => {
	const history = createMemoryHistory();
	const location = history.createLocation(path);

	match({routes, location}, (err, redirect, props) => {
		callback(null, template({
			html: ReactDOMServer.renderToStaticMarkup(<RouterContext {...props}/>),
			assets: assets
		}));
	});
};
