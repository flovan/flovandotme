(function(window, $){

'use strict';

// underscore is bundled in with ender, so just require it
var _ = require('underscore');

// Document -------------------------------------------------------------------

$.domReady(function() {

	log('_## Document ready_');

	// VARS -------------------------------------------------------------------
	//

	var
		$window = $(window),
		$body = $('body')

	;

	// ACTIONS ----------------------------------------------------------------
	//
	
	WebFont.load({
		google: {
			families: ['Lato:normal,b', 'Merriweather:normal,i,b,bi,900']
		}
	});

	// $elem.on('something', doSomething);

	//
	// FUNCTIONS --------------------------------------------------------------
	//

	// function doSomething () {}

});

}(window, $));