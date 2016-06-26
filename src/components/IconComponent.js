import React from 'react';

class Icon extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
		presentational: React.PropTypes.bool,
		className: React.PropTypes.string
    };

	static defaultProps = {
		presentational: true
	}

    render() {
		var attributes = {};

		if (this.props.presentational === true) {
			attributes.role = 'presentational';
			attributes.ariaHidden = 'true';
		}

		switch(this.props.type) {
			case 'flovan-mark':
				attributes.className = 'icon icon--flovan-mark ' + this.props.className;

				return <svg xmlns="http://www.w3.org/2000/svg" width="12.49" height="16" viewBox="0 0 12.49 16" {...attributes}>
					<path d="M12.49,9.11a0.77,0.77,0,0,0-.32-0.55l-4-2.8-1.34.95,3.69,2.61L6.21,14.08,5.07,12.83l2.15-2.48A1.42,1.42,0,0,0,5.41,8.21L2.54,10,1.94,9.32l4.31-3,1.34-.95,1.29-.91,0.07-.05a2.64,2.64,0,0,0,.8-1.15,1.89,1.89,0,0,0,0-1.27C9.23,0.68,7.57,0,6.25,0h0c-1.32,0-3,.68-3.46,1.95a1.89,1.89,0,0,0,0,1.27,2.64,2.64,0,0,0,.8,1.15L3.62,4.41,4.91,5.32,0.33,8.56A0.77,0.77,0,0,0,.2,9.72L1.83,11.5a0.77,0.77,0,0,0,1,.14L5.5,10l-2,2.35a0.77,0.77,0,0,0,0,1l2.18,2.39a0.77,0.77,0,0,0,1.09.05l0,0,0,0,5.47-6A0.77,0.77,0,0,0,12.49,9.11ZM4.55,3.17a0.72,0.72,0,0,1-.32-0.68,2.32,2.32,0,0,1,2-.95,2.32,2.32,0,0,1,2,.95c0,0.07.11,0.29-.32,0.68l-1.7,1.2Z"/>
				</svg>;
			break;
		}
    }
}

export default Icon;
