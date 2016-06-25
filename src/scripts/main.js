import $ from 'jquery';
import SelectTm from './SelectTm';

$(function () {

	document.querySelectorAll( 'select.cs-select' ).forEach( function(elem) {  
    const selectTm = new SelectTm(elem);
    selectTm.decorate();
  });

});