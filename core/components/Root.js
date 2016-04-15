import React from 'react';
import { Router, RouteHandler } from 'react-router';

import Head from './Head';

class Root extends React.Component {
	static propTypes = {
		children: React.PropTypes.element.isRequired
	}

    // constructor(props, context) {
    //     super(props, context);
    // }

	render() {
		return (
			<html>
				<Head title="testing this title" />
				<body>
					{React.cloneElement(this.props.children)}
				</body>
			</html>
		);
    }
}

export default Root;
