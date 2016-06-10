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

    const newsJsonData = thisCircle.attr("data-message");
    const title = JSON.parse(newsJsonData).title;
    const teaser = JSON.parse(newsJsonData).teaser;
    const link = JSON.parse(newsJsonData).link;

		const newsTitle = $('[data-news="title"]');
		newsTitle.html(title);
		
		const newsTeaser = $('[data-news="teaser"]');
		newsTeaser.html(teaser);
		
		const newsLink = $('[data-news="link"]');
		newsLink.html(link);

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