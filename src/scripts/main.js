import $ from 'jquery';
import SelectTm from './SelectTm';

$(function () {

	$( 'select.cs-select' ).each( function(index, value) {  
		// const elem = $(this);
    const selectTm = new SelectTm(this);
    selectTm.decorate();
  });

  // document.querySelectorAll( 'select.cs-select' ).forEach( function(elem) {  
  //   const selectTm = new SelectTm(elem);
  //   selectTm.decorate();
  // });

});