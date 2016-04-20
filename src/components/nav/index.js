import React from 'react';
import {Link} from 'react-router';

import styles from './nav.css';

class Nav extends React.Component {
	render () {
		return (
			<ul className={styles.nav}>
				<li><Link to="/">Index</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		);
	}
}

export default Nav;
