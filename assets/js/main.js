(function(window, $){

'use strict';

// Underscore is bundled in with ender, so just require it
// Comment out this line when using the separated Underscore file,
// eg. when using jQuery
var _ = require('underscore');

// Document -------------------------------------------------------------------

// When using jQuery, use
// $(document).ready(function () {

$.domReady(function () {

	console.log('## Document ready');

	// VARS -------------------------------------------------------------------
	//

	var
		$window = $(window),
		$body = $('body'),
		$lazyLoad = $('.lazy-load'),
		wave
	;

	// ACTIONS ----------------------------------------------------------------
	//

	// Load fonts if needed
	if (!$body.hasClass('fonts-loaded')) {
		var fOne = new FontFaceObserver('Cousine', {})
			.check()
			.then(function(){
				console.log('"Cousine" fonts loaded');
				$body.addClass('doc-fonts-loaded');
				document.cookie = 'docfontsloaded=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; max-age=Infinity';
			}, function () {
				console.log('"Cousine" fonts not available');
			});

		var fTwo = new FontFaceObserver('Campton', {})
			.check()
			.then(function(){
				console.log('"Campton" font loaded');
				$body.addClass('title-font-loaded');
				document.cookie = 'titlefontloaded=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; max-age=Infinity';
			}, function () {
				console.log('"Campton" font not available');
			});
	}

	// Initiate lazy loading if needed
	if ($lazyLoad.length) {
		$window.on('scroll', _.debounce(windowScrollHandler), 150).scroll();
	}

	//
	// FUNCTIONS --------------------------------------------------------------
	//

	function hasClass (el, cls) {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > 0;
	}

	function isRetina () {
		var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

		if (window.devicePixelRatio > 1) {
			return true;
		}

		if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
			return true;
		}

		return false;
	}

	//
	// HANDLERS ------------------------------------------------------------------
	//

	function windowScrollHandler (e) {
		var scrollTop = window.pageYOffset || document.body.scrollTop || $body.scrollTop(),
			windowHeight = window.innerHeight;

		_.each($lazyLoad, function (lazyEl, key, list) {
			if (hasClass(lazyEl, 'has-loaded')) {
				return;
			}

			if (lazyEl.getBoundingClientRect().top < (windowHeight + 50)) {
				lazyEl = $(lazyEl);

				var src = lazyEl.attr('data-src'),
					srcSet = lazyEl.attr('data-srcset'),
					bgSrc = lazyEl.attr('data-bg-src'),
					bgSrcSet = lazyEl.attr('data-bg-srcset'),
					loader,
					loaderCallback = function(){};

				if (!src && !srcSet && !bgSrc && !bgSrcSet) {
					console.error('data-src, data-srcset, data-bg-src or data-bg-srcset attribute not set on lazy element', lazyEl);
					return;
				}

				loader = (bgSrc !== null || bgSrcSet !== null) ? $(new Image()) : lazyEl;
				loader.on('load', function (e) {
					loaderCallback();
					lazyEl.removeClass('is-loading').addClass('has-loaded');
					$window.resize();
				});

				lazyEl.addClass('is-loading');

				if (src !== null) {
					lazyEl.attr('src', src);
				}

				if (srcSet !== null){
					lazyEl.attr('srcset', srcSet);
				}

				if (bgSrcSet !== null){
					bgSrcSet = bgSrcSet.split(',');

					bgSrc = isRetina() ? _.filter(bgSrcSet, function (s) {
						s = s.trim();
						return (s.indexOf(' 2x') > -1) ? true : false;
					}) : _.filter(bgSrcSet, function (s) {
						s = s.trim();
						return (s.indexOf(' 2x') === -1) ? true : false;
					});
				}

				if (bgSrc !== null) {
					loaderCallback = function () {
						lazyEl.css('background-image', 'url(' + bgSrc + ')');
					};
					loader.attr('src', bgSrc);
				}
			}
		});
	}

});

}(window, $));
