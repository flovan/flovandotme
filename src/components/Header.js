import React from 'react';
import {Link} from 'react-router';

import Icon from './IconComponent';

class Header extends React.Component {
	render () {
		return (
			<nav className="wrapper wrapper--wide wrapper--elastic mx-auto mb3 py1 line-height-1">
				<div className="flex mxn1">
					<Link to="/" className="logo flex-none block px1 py1 decoration-none">
						<h1 className="h4 font-family-sans uppercase spaced">Flovan</h1>
					</Link>
					<ul className="list-reset flex-grow flex justify-end m0 p0">
						<li>
							<Link to="/blurbs" className="block px1 py1">Blurbs</Link>
						</li>
						<li>
							<a href="//github.com/flovan" className="block px1 py1">Github</a>
						</li>
						<li>
							<a href="//twitter.com/prplps" className="block px1 py1">Twitter</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
