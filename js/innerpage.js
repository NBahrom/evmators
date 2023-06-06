

/* inner page thumb slider top  */
$('.row2').slick({
	infinite: false,
	slidesToShow: 5,
	slidesToScroll: 1,
	nextArrow:'<i class="icon-Rfi-rr-angle-right slider__arrow_next"></i>',
	prevArrow: '<i class="icon-Rfi-rr-angle-left slider__arrow_prev"></i>',
	arrows: true,
	responsive:[
		{
		breakpoint:1050,
		settings: {
		slidesToShow: 3,
		slidesToScroll: 1,
			}
	},
	{
	breakpoint:655,
	settings: {
	slidesToShow: 2,
	slidesToScroll: 1,
		}
	},
	{
		breakpoint:471,
		settings: {
		slidesToShow: 1,
		slidesToScroll: 1,
			}
		}
] 
});	





$('.left__slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow:'<i class="icon-Rfi-rr-angle-right slider__arrow_next"></i>',
	prevArrow: '<i class="icon-Rfi-rr-angle-left slider__arrow_prev"></i>',
	arrows: true,
});	







/* about html left slider */


/* header__cars */
/* tesla1 */

function openCarContent(evt, carNumber) {
	// Declare all variables
	var i, tabcontent, tablinks;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(carNumber).style.display = "block";
	evt.currentTarget.className += " active";
	


  }

  // Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click();
	


  function openColorCar(evt, carColor) {
	// Declare all variables
	var i, tabcontentColor, tablinksColor	;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontentColor = document.getElementsByClassName("tabcontentColor");
	for (i = 0; i < tabcontentColor.length; i++) {
	  tabcontentColor[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinksColor = document.getElementsByClassName("tablinksColor");
	for (i = 0; i < tablinksColor.length; i++) {
	  tablinksColor[i].className = tablinksColor[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(carColor).style.display = "block";
	evt.currentTarget.className += " active";
  };
  // Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen2").click();


  function openColorCarTap(evt, carColorTap) {
	// Declare all variables
	var i, tabcontentColorTap, tablinksColorTap	;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontentColorTap = document.getElementsByClassName("tabcontentColorTap");
	for (i = 0; i < tabcontentColorTap.length; i++) {
	  tabcontentColorTap[i].style.visibility = "hidden";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinksColorTap = document.getElementsByClassName("tablinksColorTap");
	for (i = 0; i < tablinksColorTap.length; i++) {
	  tablinksColorTap[i].className = tablinksColorTap[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(carColorTap).style.visibility = "visible";
	evt.currentTarget.className += " active";
  };
  // Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen3").click();
	


/* tesla1 */



/* tesla model s */


function openModelS(evt, carModelS) {
	// Declare all variables
	var i, tabcontentModelS, tablinksModelS	;
  
	// Get all elements with class="tabcontent" and hide them
	tabcontentModelS = document.getElementsByClassName("tabcontentModelS");
	for (i = 0; i < tabcontentModelS.length; i++) {
		tabcontentModelS[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinksModelS = document.getElementsByClassName("tablinksModelS");
	for (i = 0; i < tablinksModelS.length; i++) {
		tablinksModelS[i].className = tablinksModelS[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(carModelS).style.display = "block";
	evt.currentTarget.className += " active";
  }
  // Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultModelS").click();

	
	function openColorCarTapModelS(evt, carColorTapModelS) {
		// Declare all variables
		var i, tabcontentColorTapModelS, tablinksColorTapModelS	;
	  
		// Get all elements with class="tabcontent" and hide them
		tabcontentColorTapModelS = document.getElementsByClassName("tabcontentColorTapModelS");
		for (i = 0; i < tabcontentColorTapModelS.length; i++) {
		  tabcontentColorTapModelS[i].style.display = "none";
		}
	  
		// Get all elements with class="tablinks" and remove the class "active"
		tablinksColorTapModelS = document.getElementsByClassName("tablinksColorTapModelS");
		for (i = 0; i < tablinksColorTapModelS.length; i++) {
		  tablinksColorTapModelS[i].className = tablinksColorTapModelS[i].className.replace(" active", "");
		}
	  
		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(carColorTapModelS).style.display = "block";
		evt.currentTarget.className += " active";
	  }
	  // Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpenModelS2").click();

		
			
		
		

