import $ from 'jquery';

$(function () {

	$('.toggleNav').on('click', function() {
    $('.layout__siteNav').toggleClass('open');
  });

  $(".cylinderContainer").click(function() {
			rotateChambers();
	})

	function hasParent( e, p ) {
		if (!e) return false;
		var el = e.target||e.srcElement||e||false;
		while (el && el != p) {
			el = el.parentNode||false;
		}
		return (el!==false);
	};



});