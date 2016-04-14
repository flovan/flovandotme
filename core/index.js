import React from 'react';
import ReactDOM from 'react-dom';
import renderToString from 'react-dom/server';
import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';

import routes from './config/Routes';
// import template from './template.html';

export default (locals, cb) => {
	const history = createMemoryHistory();
	const location = history.createLocation(locals.path);

	match({ routes, location }, (error, redirectLocation, renderProps) => {
		cb(null, renderToString(<RouterContext {...renderProps} />));
	});
}

// Router.run(Routes, locals.path, function (Handler) {
// 	var html = ReactDOMServer.renderToString(React.createElement(Handler, locals))
// 	cb(null, `<!DOCTYPE html>${html}`);
// });
// ReactDOMServer.renderToString(<Router>{Routes}</Router>);

// const history = createMemoryHistory();
// const location = history.createLocation(locals.path);
//
// match({ Routes, location }, (error, redirectLocation, renderProps) => {
//     // cb(null, template({
//     //     html: ReactDOMServer.renderToString(<RoutingContext {...renderProps}/>),
//     //         assets: locals.assets
//     //     })
// 	// );
// 	cb(
// 		null,
// 		'<!DOCTYPE html>' + ReactDOMServer.renderToString(<RouterContext {...renderProps}/>)
// 	);
// });

// Router.run(Routes, locals.path, function (Handler) {
	// cb(
	// 	null,
	// 	`<!DOCTYPE html>
	// 	${React.renderToStaticMarkup(React.createElement(Handler, locals))}`
	// );
// });
