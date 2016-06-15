import $ from 'jquery';
import RotationCalculator from './RotationCalculator';
import Plate from './Plate';

$(function () {
	const windowWidth = $( window ).width();
	const wraper = $('[data-chamber="wraper"]');
	const wraperWidth = wraper.width();

  if (wraperWidth >= windowWidth) {
  	wraper.css("margin-left", -(wraperWidth - windowWidth)/2);
  }
  else {
  	wraper.css("margin-left", "auto");
  }
	  
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
	});

	$('[data-mobileMenu="open"]').click(function() {
  	const mobileMenu = $('[data-mobileMenu="panel"]');
	  const windowWidth = $( window ).width();

  	// mobileMenu.css({right: 0});
  	mobileMenu.show();
  	// mobileMenu.css({right: 0});

  	// mobileMenu.removeClass('magictime slideRight');
  	// mobileMenu.addClass('magictime slideLeft');

  	// mobileMenu.fadeIn(1000);
	})

	$('[data-mobileMenu="close"]').click(function() {
  	const mobileMenu = $('[data-mobileMenu="panel"]');

  	// mobileMenu.removeClass('magictime slideLeft');
  	// mobileMenu.addClass('magictime slideRight');
  	// mobileMenu.css({left: -1000});
  	mobileMenu.hide();

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

    // TODO: Move this section to a separate function
  	const imageList = $( '[data-chamber="image"]');
  	// console.log('imageList',imageList);
  	$.each(imageList, function (index, image) {
		  $(image).css({'opacity': 0.5});
		  $(image).hover(function() {
			  $(this).css({'opacity': 1});
			}, function() {
			  $(this).css({'opacity': 0.5});
			});
		});

  	const defaultImage = $( '.chamberCircle__image');
		defaultImage.css({'opacity': 0.5});
		
    // Move this section to a separate function

    thisImage.css({'opacity': 1});

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

    // console.log("plateDeg", plateDeg);

    plateDeg = (direction === 'right' ? plateDeg += 60 : plateDeg -= 60);
    plate.attr("data-deg", plateDeg);

    // console.log("plateDeg", plateDeg);
	
		const thisPlate = new Plate(plate);
		thisPlate.rotate(plateDeg, 2);
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