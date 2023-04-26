jQuery('document').ready(function() {
    'use strict';

    var $productLink = $('.product-link');
    var $svg = $('svg');
    var $svgBG = $('#svg-bg');
    var $reset = $('.svg-wrap .reset');
    var $galleryBtn = $('#gallery');

    $productLink.hover(handleProductHighlight, handleReset);
    function handleProductHighlight(evt) {
        evt.preventDefault();
        
        var $this = $(this);
        var num = $this.attr('href');
        $productLink.removeClass('active');
        $this.addClass('active');
        var color = $this.data('color') || 'orange';
        
        $('svg path, svg rect, svg circle, svg text, svg polygon').removeClass('inactive active').addClass('inactive');
        $('#film-' + num + '-circle, #film-' + num + '-circle-1, #film-' + num + '-circle-2, #film-' + num + '-circle-3, #film-' + num + '-circle-4, #film-' + num + '-number-1, #film-' + num + '-number-2, #film-' + num + '-number-3, #film-' + num + '-number-4, #film-' + num + '-number, #film-' + num + ', #film-' + num + '-1, #film-' + num + '-2, #film-' + num + '-3, #film-' + num + '-4, #film-' + num + '-5, #film-' + num + '-6, #film-' + num + '-7, #film-' + num + '-8, #film-' + num + '-9, #film-' + num + '-10, #film-' + num + '-11, #film-' + num + '-12, #film-' + num + '-13, #film-' + num + '-14, #film-' + num + '-15, #film-' + num + '-16, #film-' + num + '-17, #film-' + num + '-18, #film-' + num + '-19, #film-' + num + '-20, #film-' + num + '-21, #film-' + num + '-22, #film-' + num + '-23, #film-' + num + '-24, #film-' + num + '-25, #film-' + num + '-26, #film-' + num + '-27, #film-' + num + '-28, #film-' + num + '-29, #film-' + num + '-30, #svg-bg').removeClass('inactive').addClass('active');
        // $galleryBtn.addClass('active').removeClass('orange maroon blue').addClass(color);
    }
    // $productLink.on('mouseleave', handleReset);
    function handleReset(evt) {
        evt.preventDefault();
        
        $productLink.removeClass('active');
        $('svg path, svg rect, svg circle, svg text, svg polygon').removeClass('inactive active');
        $galleryBtn.removeClass('active orange maroon blue');
    }
        
    $svgBG.on('click', handleSVGBgClick);
    $reset.on('click', handleSVGBgClick);
    function handleSVGBgClick(evt) {
        $productLink.removeClass('active');
        $('svg path, svg rect, svg circle, svg text, svg polygon').removeClass('inactive active');
        $galleryBtn.removeClass('active orange maroon blue');
    }


    //=========================================================================== popup gallery functionality
    var galleryLinks = [
        [],
        [ // 01
            {
                src: 'css/img/products-1/01/01-01.jpg'
            },
            {
                src: 'css/img/products-1/01/01-02.jpg'
            },
            {
                src: 'css/img/products-1/01/01-03.jpg'
            }
        ],
        [ // 02
            {
                src: 'css/img/products-1/02/02-01.jpg'
            },
            {
                src: 'css/img/products-1/02/02-02.jpg'
            },
            {
                src: 'css/img/products-1/02/02-03.jpg'
            }
        ],
        [ // 03
            {
                src: 'css/img/products-1/03/03-01.jpg'
            },
            {
                src: 'css/img/products-1/03/03-02.jpg'
            }
        ],
        [ // 04
            {
                src: 'css/img/products-1/04/04-01.jpg'
            },
            {
                src: 'css/img/products-1/04/04-02.jpg'
            },
            {
                src: 'css/img/products-1/04/04-03.jpg'
            }
        ],
        [ // 05
            {
                src: 'css/img/products-1/05/05-01.jpg'
            },
            {
                src: 'css/img/products-1/05/05-02.jpg'
            },
            {
                src: 'css/img/products-1/05/05-03.jpg'
            }
        ],
        [ // 06
            {
                src: 'css/img/products-1/06/06-01.jpg'
            },
            {
                src: 'css/img/products-1/06/06-02.jpg'
            },
            {
                src: 'css/img/products-1/06/06-03.jpg'
            }
        ],
        [ // 07
            {
                src: 'css/img/products-1/07/07-01.jpg'
            },
            {
                src: 'css/img/products-1/07/07-02.jpg'
            },
            {
                src: 'css/img/products-1/07/07-03.jpg'
            }
        ],
        [ // 08
            {
                src: 'css/img/products-1/08/08-01.jpg'
            },
            {
                src: 'css/img/products-1/08/08-02.jpg'
            },
            {
                src: 'css/img/products-1/08/08-03.jpg'
            }
        ],
        [ // 09
            {
                src: 'css/img/products-1/09/09-01.jpg'
            },
            {
                src: 'css/img/products-1/09/09-02.jpg'
            },
            {
                src: 'css/img/products-1/09/09-03.jpg'
            }
        ],
        [ // 10
            {
                src: 'css/img/products-1/10/10-01.jpg'
            },
            {
                src: 'css/img/products-1/10/10-02.jpg'
            },
            {
                src: 'css/img/products-1/10/10-03.jpg'
            },
            {
                src: 'css/img/products-1/10/10-04.jpg'
            }
        ],
        [ // 11
            {
                src: 'css/img/products-1/11/11-01.jpg'
            },
            {
                src: 'css/img/products-1/11/11-02.jpg'
            },
            {
                src: 'css/img/products-1/11/11-03.jpg'
            }
        ],
        [ // 12
            {
                src: 'css/img/products-1/12/12-01.jpg'
            },
            {
                src: 'css/img/products-1/12/12-02.jpg'
            },
            {
                src: 'css/img/products-1/12/12-03.jpg'
            }
        ],
        [ // 13
            {
                src: 'css/img/products-1/13/13-01.jpg'
            },
            {
                src: 'css/img/products-1/13/13-02.jpg'
            },
            {
                src: 'css/img/products-1/13/13-03.jpg'
            }
        ],
        [ // 14
            {
                src: 'css/img/products-1/14/14-01.jpg'
            }
        ],
        [ // 15
            {
                src: 'css/img/products-1/15/15-01.jpg'
            },
            {
                src: 'css/img/products-1/15/15-02.jpg'
            },
            {
                src: 'css/img/products-1/15/15-03.jpg'
            }
        ],
        [ // 16
            {
                src: 'css/img/products-1/16/16-01.jpg'
            },
            {
                src: 'css/img/products-1/16/16-02.jpg'
            },
            {
                src: 'css/img/products-1/16/16-03.jpg'
            }
        ],
        [ // 17
            {
                src: 'css/img/products-1/17/17-01.jpg'
            },
            {
                src: 'css/img/products-1/17/17-02.jpg'
            },
            {
                src: 'css/img/products-1/17/17-03.jpg'
            }
        ],
        [ // 18
            {
                src: 'css/img/products-1/18/18-01.jpg'
            },
            {
                src: 'css/img/products-1/18/18-02.jpg'
            },
            {
                src: 'css/img/products-1/18/18-03.jpg'
            }
        ],
        [ // 19
            {
                src: 'css/img/products-1/19/19-01.jpg'
            }
        ],
        [ // 20
            {
                src: 'css/img/products-1/20/20-01.jpg'
            },
            {
                src: 'css/img/products-1/20/20-02.jpg'
            },
            {
                src: 'css/img/products-1/20/20-03.jpg'
            }
        ],
        [ // 21
            {
                src: 'css/img/products-1/21/21-01.jpg'
            },
            {
                src: 'css/img/products-1/21/21-02.jpg'
            },
            {
                src: 'css/img/products-1/21/21-03.jpg'
            }
        ],
        [ // 22
            {
                src: 'css/img/products-1/22/22-01.jpg'
            }
        ],
        [ // 23
            {
                src: 'css/img/products-1/23/23-01.jpg'
            }
        ]
    ];
    $productLink.click(showPopupGallery);
    $galleryBtn.on('click', showPopupGallery);
    function showPopupGallery(evt) {
        evt.preventDefault();

        var $activeLink = $(this);
        if($activeLink) {
            var galleryNum = $activeLink.attr('href');
            var items = galleryLinks[galleryNum];
            $.magnificPopup.open({
                items: galleryLinks[galleryNum],
                gallery: {
                    enabled: true
                },
                type: 'image'
            });
        }
    }

});