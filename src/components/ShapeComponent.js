import React from 'react';

class Shape extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		fill: React.PropTypes.string,
		stroke: React.PropTypes.number,
		strokeUnit: React.PropTypes.string,
		strokeSize: React.PropTypes.number
    };

	static defaultProps = {
		width: 100,
		fill: '#000000'
	}

	// onComponentDidMount () {
	//
	// }

    render () {
		var stroke = {};
		if (this.props.stroke) {
			stroke.stroke = this.props.stroke;
			stroke.strokeWidth = this.props.strokeWidth;
			stroke.strokeLinecap = 'round';
		}

		var dimensions = {
			width: this.props.width,
			height: this.props.height || this.props.width
		};

		switch (this.props.type) {
			case 'square':
				return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...dimensions} {...stroke}>
					<rect width="50" height="50"/>
				</svg>;
			return;
			case 'circle':
				return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...dimensions} {...stroke}>
					<circle cx="25" cy="25" r="25"/>
				</svg>;
			return;
		}
	}
}

export default Shape;
