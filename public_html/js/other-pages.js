jQuery(document).ready(function($) {
    'use strict';

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            alert("bottom!");
        }
    });
});