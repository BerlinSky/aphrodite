import $ from 'jquery';

$(function () {

	$('[data-arrow="left"]').click(function(){
		const plate = $('[data-chamber="container"]');
		rotateChamberPlate(plate, "left");
	}) 

	$('[data-arrow="right"]').click(function(){
		const plate = $('[data-chamber="container"]');
		rotateChamberPlate(plate, "right");
	})

  $(".chamberCircle").click(function(event) {
  	const thisCircle = $( event.target ).parent();
    const circleDeg = thisCircle.attr("data-deg");

		rotateChambers(circleDeg);
	})

	function rotateChamberPlate(plate, direction) {
		const increment = 60;
		// const plate = $(".chamberContainer");
    let plateDeg = plate.attr("data-deg");
    
		plateDeg = parseInt(plateDeg);

		let rotateDeg = plateDeg + increment;
		let circleDeg = rotateDeg;

    let rotateDirection = (direction === 'right' ? 1 : -1); 

		rotateDeg *= rotateDirection;

    // console.log("circle-deg", circleDeg);
    // console.log("plateDeg", plateDeg);
    // console.log("rotateDeg: ", rotateDeg);
	
		let thisPlate = new Plate(plate);
		thisPlate.rotate(rotateDeg, 2);

    plate.attr("data-deg", circleDeg);
	}

	function rotateChambers(circleDeg) {
		const plate = $(".chamberContainer");
    let plateDeg = plate.attr("data-deg");
    
    // console.log("circle-deg: ", circleDeg);
    // console.log("container-deg: ", plateDeg);

		circleDeg = parseInt(circleDeg);
		plateDeg = parseInt(plateDeg);

		if (circleDeg  === plateDeg) {
			return;
		}

		let rotateDeg = circleDeg;
    let rotateDirection = 1; 

  	if (circleDeg < 180) {
    	rotateDirection = -1;
    	rotateDeg *= rotateDirection;
    }
    else {
    	rotateDeg = (360 - rotateDeg) * rotateDirection;
    }
    // console.log("rotateDeg: ", rotateDeg);

		let thisPlate = new Plate(plate);
		thisPlate.rotate(rotateDeg, 2);

    plate.attr("data-deg", circleDeg);
	}

	class Plate {
		constructor(plateElem) {
			this.plate = plateElem;
		}

		rotate(rotateDeg, speed) {
			const transformStyle = "rotate(" + rotateDeg + "deg)";

		  // console.log("transformStyle", transformStyle);

			this.plate.css('-webkit-transform', transformStyle); 
			this.plate.css('-moz-transform', transformStyle);
			this.plate.css('transform', transformStyle);
			this.plate.css('-webkit-transition', '-webkit-transform ' + speed + 's');
			this.plate.css('transition', 'transform ' + speed + 's');
		}
	}

});