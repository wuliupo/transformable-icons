;(function($) {
	'use strict';
	var markaSet = [
		// Shape
		'circle',
    	'square',
    	'triangle',
    	// Sign & Form
    	'minus',
    	'plus',
    	'times',
    	'asterisk',
    	'check',
		'circle-minus',
		'circle-plus',
		'circle-times',
		'circle-o',
		'circle-o-filled',
		'circle-o-minus',
		'circle-o-plus',
		'circle-o-times',
    	'square-minus',
    	'square-plus',
    	'square-check',
    	'square-times',
    	'square-o',
    	'square-o-filled',
    	'square-o-minus',
    	'square-o-plus',
    	'square-o-check',
    	'square-o-times',
    	// App
    	'sort',
    	'sort-half',
    	'signal-three-one',
    	'signal-three-two',
    	'signal-three',
    	'signal-five-one',
    	'signal-five-two',
    	'signal-five-three',
    	'signal-five-four',
    	'signal-five',
    	// Audio
    	'pause',
    	// Navigation
    	'bars',
    	'angle',
    	'angle-double',
    	'chevron',
    	'arrow',
	];

	$(document).on('ready', function() {
		// Init preview, initLanding
		// Set primary icon for landing page
		var bigMarka = new Marka('#icon');
		var bigIcon = $('#icon');
		setIcon('circle', '', '#F60', Math.min(300, $(window).width()*0.7));
		// Set navigation icon
		$('.box .nav').each(function() {
			new Marka(this).set($(this).data('icon')).rotate($(this).data('rotate'));
		}).on('click', function() {
			var currPos = markaSet.indexOf(bigIcon.data('icon'));
			var newPos = 0;
			if ($(this).data('rotate') === 'left') {
				newPos = currPos - 1;
				if (newPos < 0) {
					newPos = markaSet.length - 1;
				}
			} else {
				newPos = currPos + 1;
				if (newPos > (markaSet.length - 1)) {
					newPos = 0;
				}
			}
			setIcon(markaSet[newPos]);
		});

		var markaRotate = [
			'up',
			'right',
			'down',
			'left'
		];

		// Init icon list
		$('.iconList .item > i').each(function() {
			new Marka(this).set($(this).addClass('icons marka minus marka-set').data('icon'));
		}).on('click', function() {
			var newPos = markaRotate.indexOf($(this).data('rotate')) + 1;
			if (newPos > (markaRotate.length - 1)) {
				newPos = 0;
			}
			var direction = markaRotate[newPos];
			new Marka(this).rotate(direction);
			setIcon($(this).data('rotate', direction).data('icon'), direction);
		});

		function setIcon(icon, direction, color, size){
			bigMarka.set(icon);
			if(direction) {
				bigMarka.rotate(direction);
			}
			if(color) {
				bigMarka.color(color);
			}
			if(size) {
				bigMarka.size(size);
			}
			bigIcon.data('icon', icon).data('rotate', direction);

			//generateCode
			var str = 'm.set(<span class="string">\''+bigIcon.data('icon')+'\'</span>)'
				+ '\n    .color(<span class="string">\''+bigIcon.data('color')+'\'</span>)'
				+ '\n    .size(<span class="string">\''+bigIcon.width()+'\'</span>)'
				+ '\n    .rotate(<span class="string">\''+bigIcon.data('rotate')+'\'</span>)'
				+ ';';
			$('#code .line').empty().append(str);
		}
	});
})(jQuery);