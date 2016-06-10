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

  $('[data-chamber="circle"]').click(function(event) {
  	const thisCircle = $( event.target ).parent();
    const circleDeg = thisCircle.attr("data-deg");
		const plate = $('[data-chamber="container"]');

		rotateChambers(plate, circleDeg);
	})

	function rotateChamberPlate(plate, direction) {
    let plateDeg = plate.attr("data-deg");
		plateDeg = parseInt(plateDeg);

		const thisPlate = new Plate(plate);

    // console.log("plateDeg", plateDeg);

    const rotateDirection = (direction === 'right' ? 1 : -1); 

		plateDeg = plateDeg + 60;

    plate.attr("data-deg", plateDeg);

		let rotateDeg = plateDeg * rotateDirection;

    // console.log("plateDeg", plateDeg);
    // console.log("rotateDeg: ", rotateDeg);
	
		// thisPlate.rotate(rotateDeg, 0);
		thisPlate.rotate(rotateDeg, 2);

		if (plateDeg === 360) {
			plateDeg = 0;
			rotateDeg = 0;
			thisPlate.rotate(rotateDeg, 0);

			// console.log("plateDeg 360", plateDeg);
		 //  console.log("rotateDeg 360: ", rotateDeg);

			plate.attr("data-deg", plateDeg);
		}

		
	}

	function rotateChambers(plate, circleDeg) {
		// const plate = $(".chamberContainer");
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

		const thisPlate = new Plate(plate);
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