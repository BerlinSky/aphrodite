import $ from 'jquery';

$(function () {

	$('.toggleNav').on('click', function() {
    $('.layout__siteNav').toggleClass('open');
  });

});