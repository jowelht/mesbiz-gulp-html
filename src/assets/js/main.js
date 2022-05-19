(function ($) {
    "use strict";

    
    /*=============================================
    =       Menu sticky & Scroll to top          =
    =============================================*/
	var windows = $(window);
	var screenSize = windows.width();
	var sticky = $('.header-sticky');
	var $html = $('html');
	var $body = $('body');

	windows.on('scroll', function () {
		var scroll = windows.scrollTop();
		var headerHeight = sticky.height();

		if (screenSize >= 320) {
			if (scroll < headerHeight) {
				sticky.removeClass('is-sticky');
			} else {
				sticky.addClass('is-sticky');
            }
		}

    });
    /*----------  Scroll to top  ----------*/
    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({scrollTop: 0}, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();
    
    /*===========================================
    =            Submenu viewport position      =
    =============================================*/
    
    if ($(".has-children--multilevel-submenu").find('.submenu').length) {
        var elm = $(".has-children--multilevel-submenu").find('.submenu');
        
        elm.each(function(){
            var off = $(this).offset();
            var l = off.left;
            var w = $(this).width();
            var docH = windows.height();
            var docW = windows.width() - 10;
            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('left');
            }
        });
    }
    /*==========================================
    =            mobile menu active            =
    ============================================*/
    
    $("#mobile-menu-trigger").on('click', function(){
        $("#mobile-menu-overlay").addClass("active");
        $body.addClass('no-overflow');
    });
    
    $("#mobile-menu-close-trigger").on('click', function(){
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });
    
    $(".offcanvas-navigation--onepage ul li a").on('click', function(){
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });
    
    /*Close When Click Outside*/
    $body.on('click', function(e){
        var $target = e.target;
        if (!$($target).is('.mobile-menu-overlay__inner') && !$($target).parents().is('.mobile-menu-overlay__inner') && !$($target).is('#mobile-menu-trigger') && !$($target).is('#mobile-menu-trigger i')){
            $("#mobile-menu-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
        if (!$($target).is('.search-overlay__inner') && !$($target).parents().is('.search-overlay__inner') && !$($target).is('#search-overlay-trigger') && !$($target).is('#search-overlay-trigger i')){
            $("#search-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
    });
    
    
    /*===================================
    =           Menu Activeion          =
    ===================================*/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if((curpage == "" || curpage == "/" || curpage == "admin") && hash=="")
        {
        //$("nav .navbar-nav > li:first-child").addClass("active");
        } else {
            $(".navigation-menu li").each(function()
        {
            $(this).removeClass("active");
        });
        if(hash != "")
            $(".navigation-menu li a[href*='"+hash+"']").parents("li").addClass("active");
        else
        $(".navigation-menu li a[href*='"+curpage+"']").parents("li").addClass("active");
    }
    
    
    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $("#open-off-sidebar-trigger").on('click', function(){
        $("#page-oppen-off-sidebar-overlay").addClass("active");
        $body.addClass('no-overflow');
    });
    
    $("#menu-close-trigger").on('click', function(){
        $("#page-oppen-off-sidebar-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });
    
    
    /*=========================================
    =             open menu Active            =
    ===========================================*/
    var nodeList = document.querySelectorAll('.share-icon');
    nodeList.forEach((el, i)=>{
        el.addEventListener("click", function(e){
            e.target.parentElement.parentElement.classList.toggle("opened")
            e.stopPropagation();
        })
    })

    
    /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });
    
    
    /*=============================================
    =            background image            =
    =============================================*/

    var bgSelector = $(".bg-img");
    bgSelector.each(function (index, elem) {
        var element = $(elem),
            bgSource = element.data('bg');
        element.css('background-image', 'url(' + bgSource + ')');
    });


    $(document).ready(function(){
            
        /*=============================================
        =            swiper slider activation            =
        =============================================*/
                
        // var carouselSlider = new Swiper('.hero-slider__container', {
        //     slidesPerView : 1,
        //     slidesPerGroup: 1,
        //     loop: true,
        //     speed: 150,
        //     effect: 'fade',
        //     spaceBetween : 0,
        //     autoplay: {
        //         delay: 4000,
        //     },
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },
        //     pagination: {
        //         el: '.swiper-pagination-t01',
        //         type: 'bullets',
        //         clickable: true
        //     },
        //     breakpoints: {
        //         1499:{
        //             slidesPerView : 1
        //         },

        //         991:{
        //             slidesPerView : 1
        //         },

        //         767:{
        //             slidesPerView : 1

        //         },

        //         575:{
        //             slidesPerView : 1
        //         }
        //     }
        // });
        // $(".hero-slider__container").hover(function() {
        //     (this).swiper.autoplay.stop();
        // }, function() {
        //     (this).swiper.autoplay.start();
        // });

        /*=====  End of swiper slider activation  ======*/
    });
        
 

})(jQuery);
