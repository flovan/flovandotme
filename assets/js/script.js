/* GENERIC CODE */

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* CUSTOM CODE */

var Application = function ()
{
	var me					= this;
	
	/* VARS */
	
	me.doc 					= { width: 0, height: 0, sh: 0 };
	
	/* PRIVATE FUNCTIONS */
	var resize = function()
	{
		doc.width = $(window).innerWidth();
		doc.height = $(window).innerHeight();
		doc.sh = $('.scrollhint:first').outerHeight();
	};
	
	var detectUserAgent = function()
	{
		var b = document.documentElement;
	  	b.setAttribute('data-useragent',  navigator.userAgent);
	  	b.setAttribute('data-platform', navigator.platform );
	};
	
	/* PUBLIC FUNCTIONS */
	
	return {
				initiate: function()
				{
					$("h1").slabText();
					//$(window).resize(resize).trigger('resize'); //scroll(scroll)
					//detectUserAgent();
				}
			};
}

var app = new Application();
$(document).ready(app.initiate);

/* */