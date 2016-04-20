import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {
  Router,
  RouterContext,
  match,
  browserHistory,
  createMemoryHistory
} from 'react-router';

import routes from './routes';
import documentTemplate from './document';

// Client render (optional):
if (typeof document !== 'undefined') {
  require('./css/styles.css');
  ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('content'));
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, documentTemplate(
      ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
    ));
  });
};
