jQuery('document').ready(function($) {


    var $mobileNavTrigger = $('#mobile-menu-trigger');
    var $nav = $('nav.main-nav');
    var $content = $('.content');

    $mobileNavTrigger.on('click', handleMobileNavTrigger);
    function handleMobileNavTrigger() {
        var $this = $(this);
        $this.toggleClass('opened');
        $nav.toggleClass('active');
        $content.toggleClass('blurred');
    }

    var $navDropdownTrigger = $('.dropdown-trigger');

    $navDropdownTrigger.on('click', handlenNavDropdownTriggerClick);
    function handlenNavDropdownTriggerClick(evt) {
        evt.preventDefault();
        $(this).closest('li').find('.dropdown').toggleClass('active');
    }
    
    $(window).on('resize', windowResize);
    function windowResize() {
        $mobileNavTrigger.removeClass('opened');
        $nav.removeClass('active');
        $content.removeClass('blurred');
    }

    $(window).on('scroll', windowScroll);
    function windowScroll() {
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 60) {
            $nav.addClass('scrolled');
        } else {
            $nav.removeClass('scrolled');
        }
    }

    // var baseLink = 'https://phiglobal.in';
    // var pagesArr = ['index.html', 'about-us.html', 'our-principal.html', '']

    // $(window).scroll(function() {
    //     if($(window).scrollTop() + $(window).height() == $(document).height()) {
    //         // 
    //     }
    // });

});