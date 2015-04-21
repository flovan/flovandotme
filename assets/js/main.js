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

	// wave = new Wave();
	// wave.initialize('.header__interactive');

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

function Wave () {
	// The current dimensions of the screen (updated on resize)
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	// Wave settings
	var DENSITY = 0.75;
	var FRICTION = 1.14;
	var MOUSE_PULL = 0.09; // The strength at which the mouse pulls particles within the AOE
	var AOE = 400; // Area of effect for mouse pull
	var DETAIL = Math.round( WIDTH / 60 ); // The number of particles used to build up the wave
	var TWITCH_INTERVAL = 500; // The interval between random impulses being inserted into the wave to keep it moving

	var ms = {x:0, y:0}; // Mouse speed
	var mp = {x:0, y:0}; // Mouse position

	var canvas, $canvas, context, particles;

	var timeUpdateInterval, twitchInterval;

	// Constructor.

	this.initialize = function (selector) {
		canvas = document.querySelector(selector);

		if (canvas && canvas.getContext) {
			context = canvas.getContext('2d');
			$canvas = $(canvas);

			particles = [];

			// Generate our wave particles
			for(var i = 0; i < DETAIL+1; i++) {
				particles.push({
					x: WIDTH / (DETAIL-4) * (i-2), // Pad by two particles on each side
					y: HEIGHT * 0.5,
					original: {x: 0, y: HEIGHT * 0.5},
					velocity: {x: 0, y: Math.random() * 3}, // Random for some initial movement in the wave
					force: {x: 0, y: 0},
					mass: 10
				});
			}

			$canvas.on('resize', resizeCanvasHandler);

			timeUpdateInterval = setInterval(timeUpdate, 40);
			twitchInterval = setInterval(twitch, TWITCH_INTERVAL);

			resizeCanvasHandler();
		}
	};

	// Inserts a random impulse to keep the wave moving.
	// Impulses are only inserted if the mouse is not making
	// quick movements.

	function twitch () {
		if (ms.x < 6 || ms.y < 6) {
			var forceRange = 5; // -value to +value
			insertImpulse(Math.random() * WIDTH, (Math.random() * (forceRange * 2) - forceRange));
		}
	}

	// Inserts an impulse in the wave at a specific position.
	//
	// @param positionX the x coordinate where the impulse
	// should be inserted
	// @param forceY the force to insert

	function insertImpulse (positionX, forceY) {
		var particle = particles[Math.round(positionX / WIDTH * particles.length)];

		if (particle) {
			particle.force.y += forceY;
		}
	}

	function timeUpdate(e) {
		context.clearRect(0, 0, WIDTH, HEIGHT);
		context.strokeStyle = '#EEEFF0';
		context.lineWidth = 10;
		context.beginPath();
		context.moveTo(particles[0].x, particles[0].y);


		var len = particles.length;
		var i;

		var current, previous, next;

		for (i = 0; i < len; i++) {
			current = particles[i];
			previous = particles[i-1];
			next = particles[i+1];

			if (previous && next) {
				var forceY = 0;

				forceY += -DENSITY * ( previous.y - current.y );
				forceY += DENSITY * ( current.y - next.y );
				forceY += DENSITY/15 * ( current.y - current.original.y );

				current.velocity.y += - ( forceY / current.mass ) + current.force.y;
				current.velocity.y /= FRICTION;
				current.force.y /= FRICTION;
				current.y += current.velocity.y;

				var distance = distanceBetween( mp, current );

				if (distance < AOE) {
					distance = distanceBetween( mp, {x:current.original.x, y:current.original.y} );

					ms.x = ms.x * 0.98;
					ms.y = ms.y * 0.98;

					current.force.y += (MOUSE_PULL * ( 1 - (distance / AOE) )) * ms.y;
				}

				// cx, cy, ax, ay
				context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
			}

		}

		context.lineTo(particles[particles.length-1].x, particles[particles.length-1].y);
		context.stroke();
	}

	function getClosestParticle (point) {
		var closestIndex = 0;
		var closestDistance = 1000;

		var len = particles.length;

		for(var i = 0; i < len; i++) {
			var thisDistance = distanceBetween( particles[i], point );

			if(thisDistance < closestDistance) {
				closestDistance = thisDistance;
				closestIndex = i;
			}
		}

		return particles[closestIndex];
	}

	function resizeCanvasHandler (e) {
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;

		canvas.width = WIDTH;
		canvas.height = HEIGHT;

		for(var i = 0; i < DETAIL+1; i++) {
			particles[i].x = WIDTH / (DETAIL-4) * (i-2);
			particles[i].y = HEIGHT * 0.5;

			particles[i].original.x = particles[i].x;
			particles[i].original.y = particles[i].y;
		}
	}

	function distanceBetween (p1,p2) {
		var dx = p2.x-p1.x;
		var dy = p2.y-p1.y;
		return Math.sqrt(dx*dx + dy*dy);
	}
}

}(window, $));
