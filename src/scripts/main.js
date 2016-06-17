import $ from 'jquery';
import RotationCalculator from './RotationCalculator';
import Plate from './Plate';
import imagesLoaded from 'imagesLoaded';

$(function () {

	const mainContainer = $('.mainContainer');
	const imageLoad = imagesLoaded( mainContainer );
// 	function onAlways( instance ) {
//   console.log('all images are loaded');
// }
	imageLoad.on('always', function(instance) {
	  console.log('Alright, all images are loaded');
	});

	// $('.mainContainer').imagesLoaded()
	//   .always( function( instance ) {
	//     console.log('all images loaded');
	//   })
	//   .done( function( instance ) {
	//     console.log('all images successfully loaded');
	//   })
	//   .fail( function() {
	//     console.log('all images loaded, at least one is broken');
	//   })
	//   .progress( function( instance, image ) {
	//     let result = image.isLoaded ? 'loaded' : 'broken';
	//     console.log( 'image is ' + result + ' for ' + image.img.src );
 //  });

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

	  if (mainContainerParentHeight < 700) { 
		  const newsContentTop = mainContainerParentHeight - newsContent.height() - 75;
	  	newsContent.css({top: newsContentTop});
	  }
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
  	// mobileMenu.fadeIn(1000);
	})

	$('[data-mobileMenu="close"]').click(function() {
  	const mobileMenu = $('[data-mobileMenu="panel"]');

  	mobileMenu.addClass('magictime slideRight');
  	setTimeout(function(){
	  	// mobileMenu.css({right: 0});
	  	mobileMenu.css({'display': 'none'});
	  	mobileMenu.removeClass('slideRight');
		}, 1000);

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
    let distanceLeft = calculator.distantLeft(plateDeg, circleDeg);
    let distanceRight = calculator.distantRight(plateDeg, circleDeg);

    let routeLeft = plateDeg + distanceLeft;
    // console.log("routeLeft", routeLeft);

		let routeRight = plateDeg - distanceRight;
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