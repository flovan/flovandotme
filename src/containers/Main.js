import React from 'react';
import Header from '../components/HeaderComponent';
import LivingCanvas from '../components/LivingCanvasComponent';

import main from '../sass/main.scss';

class Main extends React.Component {
	componentDidMount () {
		const FontFaceObserver = require('fontfaceobserver');

		const tofinoRegular = new FontFaceObserver('Tofino', { weight: '400' });
		const tofinoBold = new FontFaceObserver('Tofino', { weight: '700' });

		Promise.all([
			tofinoRegular.load(),
			tofinoBold.load()
		]).then(function () {
			document.documentElement.classList.add('fonts-loaded');
			sessionStorage.fontsLoaded = true;
		}).catch(function () {
			sessionStorage.fontsLoaded = false;
		});
	}

	render () {
		return (
			<div className="relative">
				<Header/>
				{this.props.children}
				<LivingCanvas/>
			</div>
		);
	}
}

export default Main;
