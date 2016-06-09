import $ from 'jquery';

$(function () {

	 $('[data-arrow="left"]').click(function(){
	 		console.log("here is left");
			rotateChamberPlate("left");
	 }) 

	 $('[data-arrow="right"]').click(function(){
	 		console.log("here is right");
			rotateChamberPlate("right");
	 })

  $(".chamberCircle").click(function(event) {
 		console.log("here is chamberCircle");

  	const thisCircle = $( event.target ).parent();
    const circleDeg = thisCircle.attr("data-deg");

		rotateChambers(circleDeg);
	})

	function rotateChamberPlate(direction) {
		const increment = 60;
		const plate = $(".chamberContainer");
    let plateDeg = plate.attr("data-deg");
    
		plateDeg = parseInt(plateDeg);


		let rotateDeg = plateDeg + increment;
		let circleDeg = rotateDeg;

    let rotateDirection = (direction === 'right' ? 1 : -1); 

		rotateDeg *= rotateDirection;

    console.log("circle-deg", circleDeg);
    console.log("plateDeg", plateDeg);

  	// if (circleDeg < 180) {
   //  	rotateDirection = -1;
   //  	rotateDeg *= rotateDirection;
   //  }
   //  else {
   //  	rotateDeg = (360 - rotateDeg) * rotateDirection;
   //  }

    console.log("rotateDeg: ", rotateDeg);

		let transformStyle = "rotate(" + rotateDeg + "deg)";

	  console.log("transformStyle", transformStyle);

		// const p = 2;
		const p = 0;

		plate.css('-webkit-transform', transformStyle); 
		plate.css('-moz-transform', transformStyle);
		plate.css('transform', transformStyle);
		plate.css('-webkit-transition', '-webkit-transform ' + p + 's');
		plate.css('transition', 'transform ' + p + 's');

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

    console.log("rotateDeg: ", rotateDeg);

		let transformStyle = "rotate(" + rotateDeg + "deg)";

	  console.log("transformStyle", transformStyle);

		const p = 2;

		plate.css('-webkit-transform', transformStyle); 
		plate.css('-moz-transform', transformStyle);
		plate.css('transform', transformStyle);
		plate.css('-webkit-transition', '-webkit-transform ' + p + 's');
		plate.css('transition', 'transform ' + p + 's');

    plate.attr("data-deg", circleDeg);
	}

});