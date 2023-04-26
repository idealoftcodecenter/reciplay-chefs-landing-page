jQuery('document').ready(function() {
    'use strict';

    $('.product-box.image').magnificPopup({
        type:'image'
    });

	var $videoWrapAfter = $('.video-wrap')
	var $video = document.getElementById('p-v');
	$videoWrapAfter.on('click', function() {
		$video.play();
	});

	$('.product-box.video').magnificPopup({
        type:'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					'</div>',

			srcAction: 'iframe_src',
			}
    });
});