import $ from 'jquery';

export default class Plate {
	constructor(plateElem) {
		this.plate = plateElem;
		this.arrowLeft = $('[data-arrow="left"]');
		this.arrowRight = $('[data-arrow="right"]');
	}

	_hideArrow() {
		// this.arrowLeft.fadeOut();
		this.arrowLeft.css("display", "none");
		// this.arrowRight.fadeOut();
		this.arrowRight.css("display", "none");
	}

	_showArrow() {
		this.arrowLeft.fadeIn(3000);
		this.arrowRight.fadeIn(3000);
	}

	selectImageByDirection(direction) {
  	const currentImage = $( '[data-image="selected"]' );
  	let thisAngle = currentImage.parent().attr('data-deg');
  	thisAngle = parseInt(thisAngle);

  	console.log('thisAngle', thisAngle);

		let nextAngle;

  	if (direction === 'left') {
  		nextAngle = (thisAngle === 0) ? 300 : (thisAngle - 60);
  	}
  	else {
  		nextAngle = (thisAngle === 300) ? 0 : (thisAngle + 60);
  	}
  	console.log('nextAngle', nextAngle);

  	// const nextImage = $( 'li [data-deg=\"' + nextAngle + '\"]').find( '[data-chamber="image"]' );
  	// const nextImage = $( 'li [data-deg=' + nextAngle + ']').find( 'img');
  	const nextImage = $( 'li[data-deg=' + nextAngle + '] > img' );
  	// const nextImage = $( 'li[data-deg="0"] > img' );
  	console.log('nextImage', nextImage.attr('src'));

  	this.hightlightImage(nextImage);

	}

	hightlightImage(selectImage) {
  	const imageList = $( '[data-chamber="image"]');
  	// console.log('imageList',imageList);
  	$.each(imageList, function (index, image) {
  		$(image).attr('data-image', 'unselected');
		  $(image).css({'opacity': 0.5});
		  $(image).hover(function() {
			  $(this).css({'opacity': 1});
			}, function() {
			  $(this).css({'opacity': 0.5});
			});
		});

		$(selectImage).attr('data-image', 'selected');
  	console.log('selectImage', selectImage);

    selectImage.css({'opacity': 1});
    $(selectImage).hover(function() {
  	  $(this).css({'opacity': 1});
  	}, function() {
  	  $(this).css({'opacity': 1});
  	});
	}

	showNewsTeaser() {

	}

	rotate(rotateDeg, speed) {
		const transformStyle = "rotate(" + rotateDeg + "deg)";

    console.log("transformStyle", transformStyle);

		this._hideArrow();

		this.plate.css('-webkit-transform', transformStyle); 
		this.plate.css('-moz-transform', transformStyle);
		this.plate.css('transform', transformStyle);
		this.plate.css('-webkit-transition', '-webkit-transform ' + speed + 's');
		this.plate.css('transition', 'transform ' + speed + 's');

		this._showArrow();
	}
}