import React from 'react';
import Shape from './ShapeComponent';

const CANVAS_NAME = 'artboard';

class LivingCanvas extends React.Component {

	// static propTypes = {
    //     type: React.PropTypes.string.isRequired
    // };

	// static defaultProps = {
	// }

	componentDidMount () {
		var artboard = document.getElementById(CANVAS_NAME);
		// console.log(artboard);
	}



    render () {
		return (
			<div id={CANVAS_NAME} className="absolute top-0 left-0 w100 h100">
				<Shape width={50} type="square" fill="#FF0000" />
   			</div>
		);
	}
}

export default LivingCanvas;
