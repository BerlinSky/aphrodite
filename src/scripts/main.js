import $ from 'jquery';

$(function () {

  $(".chamberCircle").click(function(event) {
  	const thisCircle = $( event.target ).parent();

    // console.log("thisCircle", thisCircle);

  	// const circle = $(".chamberCircle");

    const circleDeg = thisCircle.attr("data-deg");

    // const deg = circle.attr("data-deg");

    // console.log("circle-deg: ", deg);

		rotateChambers(circleDeg);
	})

	function rotateChambers(circleDeg) {
		const plate = $(".chamberContainer");
    let plateDeg = plate.attr("data-deg");
    
    console.log("circle-deg: ", circleDeg);
    console.log("container-deg: ", plateDeg);

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

		 // let rotateDeg = Math.abs(circleDeg - plateDeg);
    // let rotateDeg = circleDeg - plateDeg;
    console.log("rotateDeg: ", rotateDeg);

    // if (rotateDeg  === 0) {
    // 	return;
    // }

    // let rotateDirection = 1; 

    // if (rotateDeg > 0) {
    // 	if (rotateDeg < 180) {
	   //  	rotateDirection = -1;
	   //  	rotateDeg *= rotateDirection;
	   //  }
	   //  else {
	   //  	rotateDeg = (360 - rotateDeg) * rotateDirection;
	   //  }
    // } 
    // else {
    // 	if (Math.abs(rotateDeg) < 180) {
	   //  	rotateDeg *= rotateDirection;
	   //  }
	   //  else {
	   //  	rotateDirection = -1;
    // 		rotateDeg = (360 - rotateDeg) * rotateDirection;
    // 	}
    // }

    console.log("modified rotateDeg: ", rotateDeg);



    // else if (deg <= 180) {
	   //  // If cicle is at 180' or less
	   //  deg = circleDeg * (-1);
    // }
    // else {
    // 	// if cicle is at more than 180'
	   //  deg = 360 - circleDeg;
    // }

    // deg = parseInt(deg);
    // deg += 60;

		var transformStyle = "rotate(" + rotateDeg + "deg)";
	  console.log("transformStyle", transformStyle);

		const p = 2;


		plate.css('-webkit-transform', transformStyle); 
		plate.css('-moz-transform', transformStyle);
		plate.css('transform', transformStyle);
		plate.css('-webkit-transition', '-webkit-transform ' + p + 's');
		plate.css('transition', 'transform ' + p + 's');

    plate.attr("data-deg", circleDeg);
    // plate.attr("data-deg", plateDeg);
	}

});