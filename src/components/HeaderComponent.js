import React from 'react';
import {Link} from 'react-router';

import Wrapper from './WrapperComponent';

class Header extends React.Component {
	render () {
		return (
			<Wrapper wide={true} elastic={true} type="header" className="relative">
				<nav className="flex py1 line-height-1 mxn1">
					<Link to="/" className="block px1 py1 mr-auto bold uppercase spaced decoration-none">
						Flovan
					</Link>
					<a href="//github.com/flovan" className="block px1 py1 bold decoration-none">
						Github
					</a>
					<a href="//twitter.com/prplps" className="block px1 py1 bold decoration-none">
						Twitter
					</a>
				</nav>
			</Wrapper>
		);
	}
}

export default Header;
