import React from 'react';

import Nav from '../components/nav';

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
