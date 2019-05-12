import React from 'react';

class Wrapper extends React.Component {
	static propTypes = {
        wide: React.PropTypes.bool,
		narrow: React.PropTypes.bool,
		elastic: React.PropTypes.bool,
		className: React.PropTypes.string,
		type: React.PropTypes.string
    };

	static defaultProps = {
		wide: false,
		elastic: false,
		narrow: false,
		className: '',
		type: 'div'
	}

	render () {
		var attributes = {};
		attributes.className = 'wrapper mx-auto';

		if (this.props.wide === true) {
			attributes.className += ' wrapper--wide';
		} else if (this.props.narrow === true) {
			attributes.className += ' wrapper--narrow';
		}

		if (this.props.wide === true) {
			attributes.className += ' wrapper--elastic';
		}

		attributes.className += ' ' + this.props.className;

		switch (this.props.type) {
			case 'header':
				return (
					<header {...attributes}>
						{this.props.children}
					</header>
				);
			break;
			case 'div':
			default:
				return (
					<div {...attributes}>
						{this.props.children}
					</div>
				);
			break;
		}
	}
}

export default Wrapper;
