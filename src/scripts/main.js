import $ from 'jquery';

$(function () {

	$('.toggleNav').on('click', function() {
    $('.siteNav ul').toggleClass('open');
  });

});