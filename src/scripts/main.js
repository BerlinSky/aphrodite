import $ from 'jquery';
import SelectFx from './SelectFx';

$(function () {

	document.querySelectorAll( 'select.cs-select' ).forEach( function(el) {  
    new SelectFx(el);
  });

});