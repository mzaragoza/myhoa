!function (window, $, undefined) {

    'use strict';

/*
|--------------------------------------------------------------------------
| Global INKA Obj / Variable Declaration
|--------------------------------------------------------------------------
|
|
|
*/
    var INKA = window.INKA || {},
    $win = $( window );

/*
|--------------------------------------------------------------------------
| Navigation Code
|--------------------------------------------------------------------------
|
|
|
*/
INKA.Navigation = function () {

  // MOBILE NAV
  $('body').addClass('js');
  var $menu = $('#menu'),
      $menulink = $('.menu-link'),
      $menuTrigger = $('.has-subnav > a');

  $menulink.click(function (e) {
      e.preventDefault();
      $menulink.toggleClass('active');
      $menu.toggleClass('active');
  });

  $menuTrigger.click(function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active').next('ul').toggleClass('active');
  });

  // REGULAR NAV - SUPERFISH
  var sf, body;
  var breakpoint = 990;

  body = $('body');
  sf = $('ul.sf-menu');
  if (body.width() >= breakpoint) {
      // enable superfish when the page first loads if we're on desktop
      sf.superfish();
  }
  $(window).resize(function () {
      if (body.width() >= breakpoint && !sf.hasClass('sf-js-enabled')) {
          // you only want SuperFish to be re-enabled once (sf.hasClass)
          sf.superfish('init');
      } else if (body.width() < breakpoint) {
          // smaller screen, disable SuperFish
          sf.superfish('destroy');
      }
  });
  
};
/*
|--------------------------------------------------------------------------
| RevSlider Code
|--------------------------------------------------------------------------
|
|
|
*/

  INKA.RevolutionSlider = function () {

    if( $.fn.revolution ){

      var revapi;

      if ($.fn.cssOriginal !== undefined){ $.fn.css = $.fn.cssOriginal; }

      revapi = $('.tp-banner').revolution({
        
          delay:9000,
          startwidth:1170,
		startheight:550,

          onHoverStop:"off",           

          thumbWidth:100,             
          thumbHeight:50,
          thumbAmount:3,

          hideThumbs:10,
          navigationType:"bullet",        
          navigationArrows:"solo",        

          navigationStyle:"round",        


          navigationHAlign:"center",        
          navigationVAlign:"bottom",         
          navigationHOffset:0,
          navigationVOffset:10,

          soloArrowLeftHalign:"left",
          soloArrowLeftValign:"center",
          soloArrowLeftHOffset:20,
          soloArrowLeftVOffset:0,

          soloArrowRightHalign:"right",
          soloArrowRightValign:"center",
          soloArrowRightHOffset:20,
          soloArrowRightVOffset:0,

          touchenabled:"on",            

          stopAtSlide:-1,             
          stopAfterLoops:-1,           

          hideCaptionAtLimit:0,         
          hideAllCaptionAtLilmit:0,       
          hideSliderAtLimit:0,          


          fullWidth:"on",
          forceFullWidth:"on",
							
          shadow:0                

        });

        revapi.on("revolution.slide.onloaded",function (e) {
            revapi.css('visibility', 'visible');
        });

     

    };

  };
  
 

					


/*
|--------------------------------------------------------------------------
| FlexSlider Builder
|--------------------------------------------------------------------------
|
|
|
*/

INKA.flexController = function (elem) {
  var $elem = $(elem);
  if( $elem.length > 0 ){
    $win.on('load', function () {
      $elem.flexslider({
        animation: "fade",
        animationLoop: true,
        slideshow: true,
        directionNav: false,
        controlNav: true,
        smoothHeight: false,
        start: function (slider){
          $elem.css('background-image', 'none');
        }
      });
    });
  };
};

INKA.flexController2 = function (elem) {
  var $elem = $(elem);
  if( $elem.length > 0 ){
    $win.on('load', function () {
      $elem.flexslider({
        animation: "fade",
        animationLoop: true,
        slideshow: true,
        directionNav: false,
        controlNav: true,
        smoothHeight: false,
    		pauseOnAction: false,
        start: function (slider){
          $elem.css('background-image', 'none');
        }
      });
    });
  };
};





/*
|--------------------------------------------------------------------------
| Instagram Functionality
|--------------------------------------------------------------------------
|
|
|
*/

INKA.instagram = function () {
  $('.instagramFeed').simpleInstagramFancybox({
		mode : 'user', 
		accessToken : 'ENTER-YOUR-ACCESS-TOKEN-HERE', // This a mandatory setting that allows you to specify a user token. 
		userID : '1138644', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
		speed: 700, // Sets the speed of the images fade in effect, default is 700.
		delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
		captionOn : true, // Allows you to turn on captions
		tags: "", // Allows you limit photos based on a given tag
		numberOfImages: 12 // Number of images to display
	});
};




	
/*
|--------------------------------------------------------------------------
| Twitter Functionality 
|--------------------------------------------------------------------------
|
|
|
*/

INKA.twitterFeed = function ( elem, num ) {
  if( $.fn.tweet ) {
    $( elem ).each(function() {
      
      $( this ).tweet({
        modpath: 'php/twitter/index.php', 
        username: 'envato', 
        template: '{text}{time}', 
        count: num, 
        loading_text: 'Loading Tweets...'
      });
    });
  }
};



/*
|--------------------------------------------------------------------------
| Scrolling Functionality 
|--------------------------------------------------------------------------
|
|
|
*/

INKA.ScrollingToSections = function () {
  $('.scroll-me').localScroll();
};



/*
|--------------------------------------------------------------------------
| Isotope Sorting / Columns
|--------------------------------------------------------------------------
|
|
|
*/
INKA.sortingRows = function () {
  var container,
      elem = $('#load-more');
  if( $.fn.isotope ){
    container = $('.fitrows-layout').isotope(
    {
        layoutMode : 'fitRows'
		
    });
	
	
    $('.option-set').on('click', 'a', function (e) {

        var filterValue = $(this).parent('li').data('filter-value');
        container.isotope({ filter: filterValue });

        $('.show-dropdown').text( $(this).text() );
        
        $('.show-dropmenu').slideUp(350, 'easeOutExpo').removeClass('show-dropmenu');
        $( '.drop-down-title' ).removeClass( 'drop-down-title-up' );
        e.preventDefault();
    })

    $('.show-dropdown').on({
        click : function(e) {

          $('.dropmenu').stop().slideToggle(350, 'easeOutExpo').addClass("show-dropmenu");
          $( '.drop-down-title' ).toggleClass( 'drop-down-title-up' );
          e.preventDefault();
        }
      });
  }

  if( elem.length > 0 ){

    elem.on('click', function (e){
      
      var $this = $(this),
          $dataToLoad = $this.data('toload'),
          finishAnimation,
          selfTimer;

      e.preventDefault();

      $this.children('span').addClass('loading-animation');

      selfTimer = setTimeout( function () {
          finishAnimation = $( $dataToLoad ).each( function (i) {
            var elems = $(this).children();
              container
                    .append( elems )
                    .isotope( 'appended', elems );
          }).promise();

          finishAnimation.done(function () {
            $this.fadeOut(400, 'easeOutExpo');
            clearTimeout( selfTimer );
          });
      }, 500);

      

    });
  }
};

INKA.sortmasonry = function () {
  $('.masonry-layout').isotope(
    {
        layoutMode : 'masonry'
		
    });
};



/*
|--------------------------------------------------------------------------
| Testimonials Carousel
|--------------------------------------------------------------------------
|
|
|
*/

INKA.testimonialsCarousel = function ( elem ){
  var $carousel = $(elem);
  if( $.fn.owlCarousel && $carousel.length > 0 ){
    $carousel.owlCarousel({
     
          navigation : true, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem:true,
          navigationText: ['<i class="app-icons-angle-left app-icons-large"></i>','<i class="app-icons-angle-right app-icons-large"></i>'],
          pagination: false,
          transitionStyle: 'fade'
     
      });
  };
  
};

/*
|--------------------------------------------------------------------------
| Collapse Initializers
|--------------------------------------------------------------------------
|
|
|
*/

INKA.collapse = function () {
  $('.collapse').on('show.bs.collapse', function () {
    $(this).closest('.panel').addClass('active-box');
  });

  $('.collapse').on('hide.bs.collapse', function () {
    $(this).closest('.panel').removeClass('active-box');
  });
};


 

/*
|--------------------------------------------------------------------------
| Carousel 2
|--------------------------------------------------------------------------
|
|
|
*/

INKA.carousel2 = function ( elem ){
  var elem = $( elem );
  if( elem.length > 0 && $.fn.owlCarousel ){
    elem.owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        paginationNumbers: true
    });  
  };
  return; 
  
};

/*
|--------------------------------------------------------------------------
| Google Map
|--------------------------------------------------------------------------
|
|
|
*/

INKA.map = function () {
  $('#map_controls').gMap({
			 zoom: 14,
	markers: [{ latitude: 42.3605722, longitude: -71.0651046 }]  
  });
};

/*
|--------------------------------------------------------------------------
| FitVids
|--------------------------------------------------------------------------
|
|
|
*/

INKA.fitvids = function () {
  $(".container").fitVids();
};


/*
|--------------------------------------------------------------------------
| Fancybox
|--------------------------------------------------------------------------
|
|
|
*/

INKA.fancybox = function () {
  $(".fancybox").fancybox();
};




/*
|--------------------------------------------------------------------------
| Accordion Sliders
|--------------------------------------------------------------------------
|
|
|
*/

INKA.accord1 = function ( elem ){
  var elem = $( elem );
  if( elem.length > 0 && $.fn.accordionSlider ){
    var accordion = elem.accordionSlider({
        width: '100%',
    	height: 400,

    	responsiveMode: 'auto',

    	openedPanelSize: 'max',
    	maxOpenedPanelSize: '80%',
    	visiblePanels: 5,
    	closePanelsOnMouseOut: false,
    	autoplay: true,

    	 breakpoints: {
            960: {visiblePanels: 5},
            800: {visiblePanels: 3},
            650: {visiblePanels: 4},
            500: {visiblePanels: 3}
        }
    }).promise();

    accordion.done( function () {
        elem.css('visibility', 'visible');
    });
  };
  return;

};

INKA.accord2 = function ( elem ){
  var elem = $( elem );
  if( elem.length > 0 && $.fn.accordionSlider ){
    var accordion = elem.accordionSlider({
        width: '100%',
			height: 400,

			responsiveMode: 'auto',
			autoplay: true,
			mouseWheel:false,
			breakpoints: {
				700: {visiblePanels: 6},
				500: {visiblePanels: 3}
			}
		}).promise();


    accordion.done( function () {
        elem.css('visibility', 'visible');
    });


  };
  return;

};

INKA.accord3 = function ( elem ){
  var elem = $( elem );
  if( elem.length > 0 && $.fn.accordionSlider ){
    var accordion = elem.accordionSlider({
        width: '100%',
			height: 400,
			responsiveMode: 'custom',
			visiblePanels: 7,
			startPanel: 3,
			closePanelsOnMouseOut: false,
			shadow: false,
			panelDistance: 10,
			autoplay: false,
			mouseWheel: false,
			breakpoints: {
				960: {visiblePanels: 5},
				800: {visiblePanels: 3, orientation: 'vertical', width: 600, height: 500},
				650: {visiblePanels: 4},
				500: {visiblePanels: 3, orientation: 'vertical', aspectRatio: 1.2}
			}
		}).promise();
    accordion.done( function () {
        elem.css('visibility', 'visible');
    });
  };
  return;

};



		
/*
|--------------------------------------------------------------------------
| Load More Action
|--------------------------------------------------------------------------
|
|
|
*/
INKA.loadMore = function (elem){
  var elem = $(elem);
  if( elem.length > 0 ){
    elem.on('click', function (e){
      var $this = $(this);
      var $dataToLoad = $this.data('toload');
      e.preventDefault();

      $this.children('span').addClass('loading-animation');

      $( $dataToLoad ).animate().delay( 1000 ).slideDown(600, 'easeOutExpo', function(){
        $this.fadeOut(300, 'easeOutExpo');
      });

    });
  }
};




 

/*
|--------------------------------------------------------------------------
| Functions Initializers
|--------------------------------------------------------------------------
|
|
|
*/

  INKA.Navigation();
  INKA.RevolutionSlider();
  INKA.flexController('#article-slide');
  INKA.flexController('#portfolio-single-slider');
  INKA.flexController('#homepage-flex-slider');
  INKA.flexController2('#testimonial-slider');
  INKA.ScrollingToSections();
  INKA.instagram();
  INKA.map();
  INKA.fitvids();
  INKA.fancybox();
  INKA.twitterFeed('.twitter-feed', 1);
  INKA.twitterFeed('.twitter-feed-2', 3);
  INKA.sortingRows();
  INKA.sortmasonry();
  
  INKA.testimonialsCarousel('#owl-testimonials');
  INKA.collapse();
  
  INKA.accord1('#accordionStyle1');
  INKA.accord2('#accordionStyle2');
  INKA.accord3('#accordionStyle3');
 
  INKA.carousel2('#owl-portfolio');
  INKA.loadMore('#load-more');

  window.INKA = INKA;
  
} (window, window.jQuery, undefined);