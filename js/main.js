
jQuery(document).ready(function($){

	$('.preloader').css({
		'display': 'none'
	})
	//variables
	var hijacking= $('body').data('hijacking'),
		animationType = $('body').data('animation'),
		delta = 0,
        scrollThreshold = 5,
        actual = 1,
        animating = false;
    
    //DOM elements
    var sectionsAvailable = $('.cd-section'),
    	verticalNav = $('.cd-vertical-nav'),
		prevArrow = verticalNav.find('.cd-prev'),
    	nextArrow = verticalNav.find('.cd-next');

	
	//check the media query and bind corresponding events
	var MQ = deviceType(),
		bindToggle = false;
	
	bindEvents(MQ, true);
	
	$(window).on('resize', function(){
		MQ = deviceType();
		bindEvents(MQ, bindToggle);
		if( MQ == 'mobile' ) bindToggle = true;
		if( MQ == 'desktop' ) bindToggle = false;
	});

    function bindEvents(MQ, bool) {
    	
    	if( MQ == 'desktop' && bool) {   		
    		//bind the animation to the window scroll event, arrows click and keyboard
			if( hijacking == 'on' ) {
				initHijacking();
				$(window).on('DOMMouseScroll mousewheel', scrollHijacking);
			} else {
				scrollAnimation();
				$(window).on('scroll', scrollAnimation);
			}
			prevArrow.on('click', prevSection);
    		nextArrow.on('click', nextSection);

    	/* 	for(var i = 1; i <= sectionsAvailable.length; i++){
    			verticalNav.append('<li><a class="moveSection' + i + '">' + i + '</a></li>');
    		}
 */
    		verticalNav.find('.moveSection1').addClass('active');

			$('.moveSection1').on('click', function(){
				moveSection(1);
			});
			$('.moveSection2').on('click', function(){
				moveSection(2);
			});
			$('.moveSection3').on('click', function(){
				moveSection(3);
			});
			$('.moveSection4').on('click', function(){
				moveSection(4);
			});
			$('.moveSection5').on('click', function(){
				moveSection(5);
			});
			$('.moveSection6').on('click', function(){
				moveSection(6);
			});
			$('.moveSection7').on('click', function(){
				moveSection(7);
			});
			$('.moveSection8').on('click', function(){
				moveSection(8);
			});
			$('.moveSection9').on('click', function(){
				moveSection(9);
			});

            $('.main__body').attr('class', '');
            $('.main__body').addClass('section' + actual);
    		
    		$(document).on('keydown', function(event){
				if( event.which=='40' && !nextArrow.hasClass('inactive') ) {
					event.preventDefault();
					nextSection();
				} else if( event.which=='38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() != sectionsAvailable.eq(0).offset().top) ) ) {
					event.preventDefault();
					prevSection();
				}
			});

			//set navigation arrows visibility
			checkNavigation();
		} else if( MQ == 'mobile' ) {
			//reset and unbind
			resetSectionStyle();
			$(window).off('DOMMouseScroll mousewheel', scrollHijacking);
			$(window).off('scroll', scrollAnimation);
			prevArrow.off('click', prevSection);
    		nextArrow.off('click', nextSection);
    		$(document).off('keydown');
		}
    }

	function scrollAnimation(){
		//normal scroll - use requestAnimationFrame (if defined) to optimize performance
		(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
	}

	function animateSection() {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width();
		
		sectionsAvailable.each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top;

			//according to animation type and window scroll, define animation parameters
			var animationValues = setSectionAnimation(offset, windowHeight, animationType);
			
			transformSection(actualBlock.children('div'), animationValues[0], animationValues[1], animationValues[2], animationValues[3], animationValues[4]);
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('visible') : actualBlock.removeClass('visible');		
		});
		
		checkNavigation();
	}

	function transformSection(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow) {
		//transform sections - normal scroll
		element.velocity({
			translateY: translateY+'vh',
			scale: scaleValue,
			rotateX: rotateXValue,
			opacity: opacityValue,
			boxShadowBlur: boxShadow+'px',
			translateZ: 0,
		}, 0);
	}

	function initHijacking() {
		// initialize section style - scrollhijacking
		var visibleSection = sectionsAvailable.filter('.visible'),
			topSection = visibleSection.prevAll('.cd-section'),
			bottomSection = visibleSection.nextAll('.cd-section'),
			animationParams = selectAnimation(animationType, false),
			animationVisible = animationParams[0],
			animationTop = animationParams[1],
			animationBottom = animationParams[2];

		visibleSection.children('div').velocity(animationVisible, 1, function(){
			visibleSection.css('opacity', 1);
	    	topSection.css('opacity', 1);
	    	bottomSection.css('opacity', 1);
		});
        topSection.children('div').velocity(animationTop, 0);
        bottomSection.children('div').velocity(animationBottom, 0);
	}

	function scrollHijacking (event) {
		// on mouse scroll - check if animate section
        if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) { 
            delta--;
            ( Math.abs(delta) >= scrollThreshold) && prevSection();
        } else {
            delta++;
            (delta >= scrollThreshold) && nextSection();
        }
        return false;
    }

    function prevSection(event) {
    	//go to previous section
    	typeof event !== 'undefined' && event.preventDefault();
    	
    	var visibleSection = sectionsAvailable.filter('.visible'),
    		middleScroll = ( hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
    	visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection;

    	var animationParams = selectAnimation(animationType, middleScroll, 'prev');
    	unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]);

        if( !animating && !visibleSection.is(":first-child") ) {
        	animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[2], animationParams[3], animationParams[4])
            .end().prev('.cd-section').addClass('visible').children('div').velocity(animationParams[0] , animationParams[3], animationParams[4], function(){
            	animating = false;
            	if( hijacking == 'off') $(window).on('scroll', scrollAnimation);
            });
            
            actual = actual - 1;

            verticalNav.find('li.active').removeClass('active');
            verticalNav.find('li.moveSection' + actual).addClass('active');
            $('body').attr('class', '');
            $('body').addClass('section' + actual);
        }

        resetScroll();
    }

    function nextSection(event) {
    	//go to next section
    	typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
    		middleScroll = ( hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;

    	var animationParams = selectAnimation(animationType, middleScroll, 'next');
    	unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

        if(!animating && !visibleSection.is(":last-of-type") ) {
            animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4] )
            .end().next('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function(){
            	animating = false;
            	if( hijacking == 'off') $(window).on('scroll', scrollAnimation);
            });

            actual = actual +1;

            verticalNav.find('a.active').removeClass('active');
            verticalNav.find('a.moveSection' + actual).addClass('active');
            $('body').attr('class', '');
            $('body').addClass('section' + actual);

        }
        resetScroll();
    }

    function moveSection(event) {

        var visibleSection = sectionsAvailable.filter('.visible'),
    		middleScroll = ( hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;

    	var animationParams = selectAnimation(animationType, middleScroll);
    	unbindScroll(visibleSection.find('.cd-section' + event), animationParams[3]);
    	
        if( !visibleSection.hasClass( 'cd-section' + event ) ) {
            animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4] )
            .end();
            $('body').find('.cd-section' + event).addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function(){
            	animating = false;
            	if( hijacking == 'off') $(window).on('scroll', scrollAnimation);
            });

            actual = event;

            verticalNav.find('a.active').removeClass('active');
            verticalNav.find('a.moveSection' + actual).addClass('active');
            $('body').attr('class', '');
            $('body').addClass('section' + actual);
        }
        resetScroll();
    }

    function unbindScroll(section, time) {
    	//if clicking on navigation - unbind scroll and animate using custom velocity animation
    	if( hijacking == 'off') {
    		$(window).off('scroll', scrollAnimation);
    		( animationType == 'catch') ? $('body, html').scrollTop(section.offset().top) : section.velocity("scroll", { duration: time });
    	}
    }

    function resetScroll() {
        delta = 0;
        checkNavigation();
    }

    function checkNavigation() {
    	//update navigation arrows visibility
		( sectionsAvailable.filter('.visible').is(':first-of-type') ) ? prevArrow.addClass('inactive') : prevArrow.removeClass('inactive');
		( sectionsAvailable.filter('.visible').is(':last-of-type')  ) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');
	}

	function resetSectionStyle() {
		//on mobile - remove style applied with jQuery
		sectionsAvailable.children('div').each(function(){
			$(this).attr('style', '');
		});
	}

	function deviceType() {
		//detect if desktop/mobile
		return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}

	function selectAnimation(animationName, middleScroll, direction) {
		// select section animation - scrollhijacking
		var animationVisible = 'translateNone',
			animationTop = 'translateUp',
			animationBottom = 'translateDown',
			easing = 'easeInCirc',
			animDuration = 1000;

		return [animationVisible, animationTop, animationBottom, animDuration, easing];
	}

	function setSectionAnimation(sectionOffset, windowHeight, animationName ) {
		// select section animation - normal scroll
		var scale = 1,
			translateY = 100,
			rotateX = '120deg',
			opacity = 1,
			boxShadowBlur = 0;
		
		if( sectionOffset >= -windowHeight && sectionOffset <= 0 ) {
			// section entering the viewport
			translateY = (-sectionOffset)*100/windowHeight;

		} else if( sectionOffset > 0 && sectionOffset <= windowHeight ) {
			//section leaving the viewport - still has the '.visible' class
			translateY = (-sectionOffset)*100/windowHeight;

		} else if( sectionOffset < -windowHeight ) {
			//section not yet visible
			translateY = 100;

		} else {
			//section not visible anymore
			translateY = -100;
		}

		return [translateY, scale, rotateX, opacity, boxShadowBlur]; 
	}

	$('.fixed-menu .menu-btn').on('click', function(){
		$('body').toggleClass('menu-active');
	});


});

$.Velocity
    .RegisterEffect("translateUp", {
    	defaultDuration: 1,
        calls: [ 
            [ {  scale: '1'}, .3],
            [ {  opacity: '0', translateY: '-250%', translateX: '50%', scale: '1'}, 1]
        ]
    });

$.Velocity
    .RegisterEffect("translateDown", {
    	defaultDuration: 1,
        calls: [ 
            [ {  scale: '1'}, .3],
            [ { opacity: '0', translateY: '250%', translateX: '-50%', scale: '1'}, 1],
        ]
    });

$.Velocity
    .RegisterEffect("translateNone", {
    	defaultDuration: 1,
        calls: [ 
            [ { translateY: '20px', translateX: '0', opacity: '1', scale: '1', rotateX: '0', },  1],
            [ { translateY: '0', scale: '1'},  0.5]
        ]
    });	
/* sliders */

const mobileModalClose = document.querySelector('.modal__menu_close');
const mobileModal= document.querySelector('.modal__menu');
const mobileClickModal= document.querySelector('.modal__icon');

mobileClickModal.addEventListener('click',function() {
	mobileModal.classList.toggle('active')
});
  
	mobileModalClose.addEventListener('click',function() {
		mobileModal.classList.remove('active')
	});
const mobileDropdownPosition = document.querySelector('.modal__menu_inner');
const mobileDropdown= document.querySelector('.auto__dropdown');
const mobileClickDropdown= document.querySelector('.modal__menu_li__auto');


	mobileClickDropdown.addEventListener('click',function() {
		mobileDropdown.classList.toggle('active');
		mobileDropdownPosition.classList.toggle('active');
		mobileClickDropdown.classList.toggle('active')
	});


/* inner page thumb slider top  */


//thumb slik slider
				  $('.row').slick({
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 2,
				nextArrow:'<i class="icon-Rfi-rr-angle-right slider__arrow_next"></i>',
				prevArrow: '<i class="icon-Rfi-rr-angle-left slider__arrow_prev"></i>',
				arrows: true,
				responsive:[
					{
					breakpoint:1669,
					settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint:623,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint:470,
			settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
		] 
  });	
				  
				  
 let slideIndex = 1;
	 showSlides(slideIndex);
				  
				  // Next/previous controls
 function plusSlides(n) {
     showSlides(slideIndex += n);
  }
				  
				  // Thumbnail image controls
  function currentSlide(n) {
     showSlides(slideIndex = n);
  }
				  
  function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("demo");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
		 slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active_slide", "");
		}
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active_slide";

 } 

 /* slide chevrolet */
 let slideIndex2 = 1;
	showSlides2(slideIndex2);
	
 // Next/previous controls
function plusSlides2(n) {
	showSlides2(slideIndex2 += n);
}
 
 // Thumbnail image controls
function currentSlide2(n) {
	showSlides2(slideIndex2 = n);
}
 
function showSlides2(n) {
	let i;
	let slides2 = document.getElementsByClassName("mySlides2");
	let dots2 = document.getElementsByClassName("demo2");
	if (n > slides2.length) {slideIndex2 = 1}
	if (n < 1) {slideIndex2 = slides2.length}
	for (i = 0; i < slides2.length; i++) {
	slides2[i].style.display = "none";
	}
	for (i = 0; i < dots2.length; i++) {
	dots2[i].className = dots2[i].className.replace(" active_slide", "");
	}
	slides2[slideIndex2-1].style.display = "block";
	dots2[slideIndex2-1].className += " active_slide";
} 

 /* slide mazda */
 let slideIndex3 = 1;
	showSlides3(slideIndex3);
	
 // Next/previous controls
function plusSlides3(n) {
	showSlides3(slideIndex3 += n);
}
 
 // Thumbnail image controls
function currentSlide3(n) {
	showSlides3(slideIndex3 = n);
}
 
function showSlides3(n) {
	let i;
	let slides3 = document.getElementsByClassName("mySlides3");
	let dots3 = document.getElementsByClassName("demo3");
	if (n > slides3.length) {slideIndex3 = 1}
	if (n < 1) {slideIndex3 = slides3.length}
	for (i = 0; i < slides3.length; i++) {
	slides3[i].style.display = "none";
	}
	for (i = 0; i < dots3.length; i++) {
	dots3[i].className = dots3[i].className.replace(" active_slide", "");
	}
	slides3[slideIndex3-1].style.display = "block";
	dots3[slideIndex3-1].className += " active_slide";
} 


/*  slide qcheng */
let slideIndex4 = 1;
showSlides4(slideIndex4);

// Next/previous controls
function plusSlides4(n) {
showSlides4(slideIndex4 += n);
}

// Thumbnail image controls
function currentSlide4(n) {
showSlides4(slideIndex4 = n);
}

function showSlides4(n) {
let i;
let slides4 = document.getElementsByClassName("mySlides4");
let dots4 = document.getElementsByClassName("demo4");
if (n > slides4.length) {slideIndex4 = 1}
if (n < 1) {slideIndex4 = slides4.length}
for (i = 0; i < slides4.length; i++) {
slides4[i].style.display = "none";
}
for (i = 0; i < dots4.length; i++) {
dots4[i].className = dots4[i].className.replace(" active_slide", "");
}
slides4[slideIndex4-1].style.display = "block";
dots4[slideIndex4-1].className += " active_slide";
} 


/*  slide wolsvagen*/
let slideIndex5 = 1;
showSlides5(slideIndex5);

// Next/previous controls
function plusSlides5(n) {
showSlides5(slideIndex5 += n);
}

// Thumbnail image controls
function currentSlide5(n) {
showSlides5(slideIndex5 = n);
}

function showSlides5(n) {
let i;
let slides5 = document.getElementsByClassName("mySlides5");
let dots5 = document.getElementsByClassName("demo5");
if (n > slides5.length) {slideIndex5 = 1}
if (n < 1) {slideIndex5 = slides5.length}
for (i = 0; i < slides5.length; i++) {
slides5[i].style.display = "none";
}
for (i = 0; i < dots5.length; i++) {
dots5[i].className = dots5[i].className.replace(" active_slide", "");
}
slides5[slideIndex5-1].style.display = "block";
dots5[slideIndex5-1].className += " active_slide";
} 



/*  slide wolsvagen*/
let slideIndex6 = 1;
showSlides6(slideIndex6);

// Next/previous controls
function plusSlides5(n) {
showSlides6(slideIndex6 += n);
}

// Thumbnail image controls
function currentSlide6(n) {
showSlides6(slideIndex6 = n);
}

function showSlides6(n) {
let i;
let slides6 = document.getElementsByClassName("mySlides6");
let dots6 = document.getElementsByClassName("demo6");
if (n > slides6.length) {slideIndex6 = 1}
if (n < 1) {slideIndex6 = slides6.length}
for (i = 0; i < slides6.length; i++) {
slides6[i].style.display = "none";
}
for (i = 0; i < dots6.length; i++) {
dots6[i].className = dots6[i].className.replace(" active_slide", "");
}
slides6[slideIndex6-1].style.display = "block";
dots6[slideIndex6-1].className += " active_slide";
} 
/* sliders */





/* animation cursor on image */

let mouseCursor = document.querySelector(".main__cursor");
let mouseCursorAnimation = document.querySelectorAll(".main__car_img img")

window.addEventListener('mousemove', cursor);

function cursor (e){
	mouseCursor.style.top = e.pageY + 'px';
	mouseCursor.style.left = e.pageX + 'px';
}

mouseCursorAnimation.forEach(Image => {
	Image.addEventListener("mouseleave", () => {
		mouseCursor.classList.remove("link-grow")
	})
	Image.addEventListener("mouseover", () => {
		mouseCursor.classList.add("link-grow")
	})
});


  
/* left mark bar */


var splide = new Splide( '#splide9', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );
  
var splide2 = new Splide( '#splide2c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );

  var splide3 = new Splide( '#splide3c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );

  var splide4 = new Splide( '#splide4c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );

  var splide5 = new Splide( '#splide5c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );

  var splide6 = new Splide( '#splide6c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );
  var splide7 = new Splide( '#splide7c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );
  var splide8 = new Splide( '#splide8c', {
	perPage: 6,
	perMove: 1,
	direction: 'ttb',
	height   : '30rem',
	wheel    : true,
  } );
  


  splide.mount();
  splide2.mount();
  splide3.mount();
  splide4.mount();
  splide5.mount();
  splide6.mount();
  splide7.mount();
  splide8.mount();

/* mobile menu */



	

	

