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