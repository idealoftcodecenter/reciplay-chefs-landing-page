jQuery('document').ready(function($) {
    var audio = new Audio("css/img/phi-pronunciation.mp3" );
    var $phiPronunciation = $('#phi-pronunciation');

    $phiPronunciation.on('click', handlePhiPronunciations);
    function handlePhiPronunciations() {
        audio.play();
    }

    var $window = $(window);
    var ww = $window.width();

    $window.on('wheel', function() {
        window.location.href = "http://phiglobal.in/about-us.html";
    });
    

    var container = document.querySelector('#home-content');
    var listener = SwipeListener(container);
    container.addEventListener('swipe', function (e) {
        var directions = e.detail.directions;

        if (directions.top || directions.bottom) {
            window.location.href = "http://phiglobal.in/about-us.html";
        }
    });


});