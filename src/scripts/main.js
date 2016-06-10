import $ from 'jquery';

$(function () {



  // <div id="animals" data-animals='["cat", "dog", "bird"]'></div>
  // <div id="vehicles" data-vehicles='{"motorcycle":"Harley", "car":"Herbie", "steamshovel":"Mike"}'></div>


  // $(function(){
  //   var a = JSON.parse($('#animals').attr('data-animals'))[0];
  //   $('#animals').html(a);
  //   var v = JSON.parse($('#vehicles').attr('data-vehicles')).car;
  //   $('#vehicles').html(v);
  // });

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

    // console.log("plateDeg", plateDeg);

    plateDeg = (direction === 'right' ? plateDeg += 60 : plateDeg -= 60);
    plate.attr("data-deg", plateDeg);

    // console.log("plateDeg", plateDeg);
	
		const thisPlate = new Plate(plate);
		thisPlate.rotate(plateDeg, 2);
	}

	function rotateChambers(plate, circleDeg) {
    let plateDeg = plate.attr("data-deg");
    
		circleDeg = parseInt(circleDeg);
		plateDeg = parseInt(plateDeg);

    plate.attr("data-deg", circleDeg);

		if (circleDeg  === plateDeg) {
			return;
		}

		const rotateDeg = circleDeg * (-1);

		const thisPlate = new Plate(plate);
		thisPlate.rotate(rotateDeg, 2);
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