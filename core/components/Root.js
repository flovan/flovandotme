import React from 'react';
import { RouteHandler } from 'react-router';

var Root = React.createClass({
	render: function () {
		return (
			<html>
				<head>
					<title>{this.props.title}</title>
				</head>
				<body>
					<h1>Test</h1>
				</body>
			</html>
		);
	}
});

export default Root;

//<RouteHandler {...this.props} />
