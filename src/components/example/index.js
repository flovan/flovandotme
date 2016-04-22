import React from 'react';

// import styles from './example.css';

class Example extends React.Component {
	handleClick (e) {
		console.log(e);
    }

	render () {
		return (
			<div>
				<h2>Example component</h2>
				<p>
					<button onClick={this.handleClick}>Click me</button>
				</p>
			</div>
		)
	}

	// render () {
	// 	return (
	// 		<div className={styles.example}>
	// 			<h2>Example component</h2>
	// 			<p>
	// 				<button onClick={this.handleClick}>Click me</button>
	// 			</p>
	// 		</div>
	// 	)
	// }
}

export default Example;
