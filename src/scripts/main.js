import $ from 'jquery';

$(function () {

  $(".chamberCircle").click(function(event) {
  	const thisCircle = $( event.target ).parent();

    console.log("thisCircle", thisCircle);

  	// const circle = $(".chamberCircle");

    const circleDeg = thisCircle.attr("data-deg");

    // const deg = circle.attr("data-deg");

    // console.log("circle-deg: ", deg);

		rotateChambers(circleDeg);
	})

	function rotateChambers(circleDeg) {
		const plate = $(".chamberContainer");
    let deg = plate.attr("data-deg");
    
    console.log("circle-deg: ", circleDeg);
    console.log("container-deg: ", deg);

		circleDeg = parseInt(circleDeg);
		deg = parseInt(deg);

    // if cicle and container on 12 o'clock 
    // do nothing
    if (circleDeg === deg) {
    	return;
    }

    // Else, rotate to 12 o'clock
    deg = circleDeg * (-1);

    // deg = parseInt(deg);
    // deg += 60;

		var transformStyle = "rotate(" + deg + "deg)";

		const p = 2;

	  // console.log(transformStyle);

		plate.css('-webkit-transform', transformStyle); 
		plate.css('-moz-transform', transformStyle);
		plate.css('transform', transformStyle);
		plate.css('-webkit-transition', '-webkit-transform ' + p + 's');
		plate.css('transition', 'transform ' + p + 's');

    plate.attr("data-deg", deg);
	}

});