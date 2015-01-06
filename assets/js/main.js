(function(window, $){

'use strict';

// Document -------------------------------------------------------------------

// When using jQuery, use
$(document).ready(function () {

	console.log('## Document ready');

	// VARS -------------------------------------------------------------------
	//

	var
		$window = $(window),
		$body = $('body'),
		$main = $('main'),
		$blocks = $('.block'),
		m = null,
		insta = {
			raw_url: 'https://api.instagram.com/v1/users/%user-id%/media/recent/?client_id=%client-id%&count=2&callback=?',
			user_id: '3281565',
			client_id: '17bfbdd130e845b0879d2a0eb46b4fe2',
			json_url: null,
			img: $('.insta-wrapper img')
		},
		$latestTweet = $('.latest-tweet')
	;

	// ACTIONS ----------------------------------------------------------------
	//

	// Set up Mason
	m = new Maison('main', {
		minWidth: 830
	});
	
	// Get latest Instagram snaps
	insta.json_url = insta.raw_url.replace('%user-id%', insta.user_id).replace('%client-id%', insta.client_id);

	$.getJSON(insta.json_url, function (data) {
		_.each(data.data, function(img_data, key, ref) {
			ref = insta.img.eq(key);
			ref.one('load', function (e) {
				ref.addClass('has-loaded');
			}).each(function () {
				if (this.complete) {
					ref.load();
				}
			});
			ref.attr('src', img_data.images.standard_resolution.url);
		});
	});

	// Get last tweet
	var config1 = {
		id: '542265637566177280',
		domId: 'tweet-container',
		maxTweets: 1,
		enableLinks: true,
		showInteraction: false,
		showUser: false,
		showRetweet: false,
		customCallback: function (data) {
			$latestTweet.append(data);
		}
	};
	twitterFetcher.fetch(config1);

	// Animate blocks
	$blocks.velocity('transition.slideUpIn', { stagger: 150 });

	//
	// FUNCTIONS --------------------------------------------------------------
	//

	

});

// Masonry module

function Maison (container, opts) {
	if (typeof container !== 'string') {
		console.error('Container selector needs to be a String.');
	}
	this.containerSelector = container || this.containerSelector;

	// Merge settings
	opts = opts || {};
	this.settings = $.extend({}, this.settings, opts);

	// Expose API
	this.remove = this.remove;
	this.reset = this.reset;

	// Initialize
	this.init();
}

Maison.prototype = {
	// PRIVATE VARS
	win: null,
	containerSelector: '#container',
	container: null,
	items: null,
	colHeights: null,
	active: false,
	settings: {
		itemSelector: '.block',
		columns: 2,
		minWidth: 0,
		repeatResize: 60
	},

	// PRIVATE FUNCTIONS

	init: function () {
		var self = this,
			t;

		// Identify DOM elements
		this.win = $(window);
		this.container = $(this.containerSelector).css('position', 'relative');
		this.items = $(this.settings.itemSelector);

		// Listen for and trigger resize
		this.win.on('resize', this.windowResizeHandler.bind(this)).resize();

		// Trigger another offset resize for the webfonts
		t = setTimeout(function () {
			self.win.resize();
			clearTimeout(t);
		}, self.settings.repeatResize);

		// Set state to active
		this.active = true;
	},

	windowResizeHandler: function (e) {
		// Get window width
		var iw = window.innerWidth,
			max = this.items.length,
			c = 0,
			currItem = null,
			numCols = this.settings.columns,
			currColIndex = 0,
			colWidth = 100 / numCols;

		// Attach a guard for smaller screens
		if (iw < this.settings.minWidth) {
			this.resetItems();
			return;
		}

		// Prepare a height counter for each column
		this.colHeights = [];
		while (numCols > 0) {
			this.colHeights.push(0);
			numCols--;
		}

		// Loop over items
		while (c < max) {
			currItem = this.items.eq(c);
			// Set item styles
			currItem.css({
				position: 'absolute',
				width: colWidth + '%',
				left: (currColIndex * colWidth) + '%',
				top: this.colHeights[currColIndex] + 'px'
			});

			// Increase column height counter
			this.colHeights[currColIndex] += currItem.outerHeight();

			// Get the next column index
			if (typeof this.colHeights[currColIndex + 1] === 'undefined') {
				currColIndex = 0;
			} else if (this.colHeights[currColIndex] > this.colHeights[currColIndex + 1]) {
					currColIndex++;
			}

			// Increase loop counter
			c++;
		}
	},

	resetItems: function () {
		// Remove the style attribute for a clean reset
		this.items.removeAttr('style');
	},

	// PUBLIC FUNCTIONS

	remove: function () {
		// Reset items and remove resize listener
		this.resetItems();
		this.win.off('resize', this.windowResizeHandler);
	},

	reset: function () {
		// Reset and parse items again
		this.resetItems();
		this.items = $(this.settings.itemSelector);

		// Trigger a resize
		this.win.resize();
	}
};

}(window, $));