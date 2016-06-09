import $ from 'jquery';

$(function () {

	$('.toggleNav').on('click', function() {
    $('.layout__siteNav').toggleClass('open');
  });

  $(".cylinderContainer").click(function() {
			rotateChambers();
	})

	function rotateChambers() {
		var plate = $(".cylinderContainer");

		var p = 2;
    var deg = plate.attr("data-deg");
    
    deg = parseInt(deg);
    deg += 60;

		var transformStyle = "rotate(" + deg + "deg)";

	  // console.log(transformStyle);

		plate.css('-webkit-transform', transformStyle); 
		plate.css('-moz-transform', transformStyle);
		plate.css('transform', transformStyle);
		plate.css('-webkit-transition', '-webkit-transform ' + p + 's');
		plate.css('transition', 'transform ' + p + 's');

    plate.attr("data-deg", deg);
	}

	function revolve() {
		var p = 2;

		$(".chamber").map(function() {
	    // p++;
	    var item = $(this);
	    var deg = item.attr("data-deg");
	    deg = parseInt(deg);
	    deg += 60;

	    // console.log(deg);
	    
	    var transformStyle = "rotate(" + deg + "deg) translate(10em) rotate(" + (-1) * deg + "deg)";

		   // console.log(transformStyle);

		   item.css('-webkit-transform', transformStyle); 
		   item.css('-moz-transform', transformStyle);
		   item.css('transform', transformStyle);
		   item.css('-webkit-transition', '-webkit-transform ' + p + 's');
		   item.css('transition', 'transform ' + p + 's');

		   $(this).attr("data-deg", deg);
		 })
	}
});