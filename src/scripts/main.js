import $ from 'jquery';
import RotationCalculator from './RotationCalculator';
import Plate from './Plate';
import imagesLoaded from 'imagesLoaded';

$(function () {

	$( window ).load(function() { 
		// console.log("onload");
		const page = $('html body');
		// const bodyHeight = $('body').height();
		// const footerHeight = $(footer).height();

		const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    if (isSafari) {
       page.addClass('clearfix-safari');

       // footer.addClass('l-stickyFooter--Safari');
    }
		// console.log("body height", bodyHeight);

		// footer.css({ 'margin-top': (bodyHeight - footerHeight) });
	});

	const mainContainer = $('.mainContainer');
	const imageLoad = imagesLoaded( mainContainer );
	
	const preloader = $('.preloadContainer');

	imageLoad.on('always', () => {
	  console.log('Alright, all images are loaded');
	  preloader.addClass('loaded');
	});

	imageLoad.on('done', () => {
	  console.log('Alright, all images are loaded');
	  preloader.addClass('loaded');
	});

	imageLoad.on('fail', () => {
	  console.log('Alright, all images are loaded');
	  preloader.addClass('loaded');
	});

	const windowWidth = $( window ).width();
	const wraper = $('[data-chamber="wraper"]');
	const wraperWidth = wraper.width();

  if (wraperWidth >= windowWidth) {
  	wraper.css("margin-left", -(wraperWidth - windowWidth)/2);
  }
  else {
  	wraper.css("margin-left", "auto");
  }

  setNewsContentTopPosition();
	  
	$( window ).resize(function() {
	  const windowWidth = $( window ).width();
  	const wraper = $('[data-chamber="wraper"]');
  	const wraperWidth = wraper.width();

	  if (wraperWidth >= windowWidth) {
	  	wraper.css("margin-left", -(wraperWidth - windowWidth)/2);
	  }
	  else {
	  	wraper.css("margin-left", "auto");
	  }

	  setNewsContentTopPosition();

	});

	function setNewsContentTopPosition() {
	  const mainContainer = $( '.mainContainer' );
	  const mainContainerParentHeight = mainContainer.parent().height();
	  const newsContent = $( '.chamberContainer__content' );

	  // console.log('mainContainerParent height', mainContainerParentHeight);
	  // console.log('newsContent height', newsContent.height());

		let supplement = 0;
   	switch (true) {
			case mainContainerParentHeight < 550:
				// iphone 5
				supplement = -15;
				break;
			case mainContainerParentHeight >= 480 && mainContainerParentHeight < 550:
				// iPhone 6
				break;
			case mainContainerParentHeight >= 550 && mainContainerParentHeight < 620:
				// iPhone 6 plus
				supplement = -10;
				break;
			case mainContainerParentHeight >= 620 && mainContainerParentHeight < 680:
				// iPad and iPad Mini
				// supplement = 40;
				break;
			default:
				25;
		}

		// if (mainContainerParentHeight < 700) {
  //   console.log('supplement', supplement);

		// 	var newsContentTop = mainContainerParentHeight - newsContent.height() - supplement;
		// 	newsContent.css({ top: newsContentTop });
		// }
		
	}

	$('[data-mobileMenu="open"]').click(function() {
  	const mobileMenu = $('[data-mobileMenu="panel"]');
	  // const windowWidth = $( window ).width();
  	// console.log('windowWidth', windowWidth);

  	mobileMenu.css({'display': 'block'});
  	mobileMenu.css({right: '-320px'});
  	mobileMenu.addClass('magictime slideLeft');
		setTimeout(function(){
	  	mobileMenu.css({right: 0});
			mobileMenu.removeClass('slideLeft');
		}, 1000);

  	// const body = $('body');
  	// body.addClass('is-mobileMenuOpen');

  	$('html, body').on('touchmove', function(evt){ 
  	     //prevent native touch activity like scrolling
  	     evt.preventDefault(); 
  	});

  	// mobileMenu.fadeIn(1000);
	})

	$('[data-mobileMenu="close"]').click(function() {
		// $('html, body').on('touchmove', function(e){ 
		// 	return true;
		// });

		$('html, body').unbind('touchmove');

  	const mobileMenu = $('[data-mobileMenu="panel"]');

  	mobileMenu.addClass('magictime slideRight');
  	setTimeout(function(){
	  	// mobileMenu.css({right: 0});
	  	mobileMenu.css({'display': 'none'});
	  	mobileMenu.removeClass('slideRight');
		}, 1000);

		// const body = $('body');
	  // 	body.removeClass('is-mobileMenuOpen');
  	// mobileMenu.fadeOut(1000);
	})

	$('[data-arrow="left"]').click(function() {
		const plate = $('[data-chamber="container"]');
		
		rotateChamberPlate(plate, "left");
	}) 

	$('[data-arrow="right"]').click(function(){
		const plate = $('[data-chamber="container"]');

		rotateChamberPlate(plate, "right");
	})

  $('[data-chamber="circle"]').click(function(event){
  	const thisImage = $( event.target );
  	const thisCircle = $( event.target ).parent();
    const circleDeg = thisCircle.attr("data-deg");
		const plate = $('[data-chamber="container"]');

    const newsJsonData = thisCircle.attr("data-message");
    const title = JSON.parse(newsJsonData).title;
    const teaser = JSON.parse(newsJsonData).teaser;
    const link = JSON.parse(newsJsonData).link;

    const thisPlate = new Plate(plate);
		thisPlate.hightlightImage(thisImage);

		const newsTitle = $('[data-news="title"]');
		newsTitle.html(title);
		
		const newsTeaser = $('[data-news="teaser"]');
		newsTeaser.html(teaser);

		const newsLink = $('[data-news="link"]');
		newsLink.attr('href', link);

		rotateChambers(plate, circleDeg);
	})

	function rotateChamberPlate(plate, direction) {
    let plateDeg = plate.attr("data-deg");
		plateDeg = parseInt(plateDeg);

    plateDeg = (direction === 'right' ? plateDeg += 60 : plateDeg -= 60);
    plate.attr("data-deg", plateDeg);

		const thisPlate = new Plate(plate);
		thisPlate.rotate(plateDeg, 2);

		thisPlate.selectImageByDirection(direction)
	}

	function rotateChambers(plate, circleDeg) {
    let plateDeg = plate.attr("data-deg");
		plateDeg = parseInt(plateDeg);
		circleDeg = parseInt(circleDeg);

    const calculator = new RotationCalculator();
    const distanceLeft = calculator.distantLeft(plateDeg, circleDeg);
    const distanceRight = calculator.distantRight(plateDeg, circleDeg);

    const routeLeft = plateDeg + distanceLeft;
		const routeRight = plateDeg - distanceRight;
    // console.log("routeLeft", routeLeft);
    // console.log("routeRight", routeRight);

		let rotateDeg = routeRight;
		if (Math.abs(distanceLeft) <= Math.abs(distanceRight)) {
			rotateDeg = routeLeft;
		}

    plate.attr("data-deg", rotateDeg);

		const thisPlate = new Plate(plate);

    console.log("circleDeg", circleDeg);
    console.log("rotateDeg", rotateDeg);

		thisPlate.rotate(rotateDeg, 2);
	}
	
});