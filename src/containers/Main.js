import React from 'react';

import Nav from '../components/nav';
import main from '../sass/main.scss';

class Main extends React.Component {
	render () {
		return (
			<div>
				<Nav/>
		        {this.props.children}
			</div>
		);
	}
}

export default Main;
