import $ from 'jquery';
import StyledSelect from './selectTm';

$(function () {

	$( 'select.js-styledSelect' ).each( function(index, value) {  
		// const elem = $(this);
    const selectTm = new StyledSelect(this);
    selectTm.decorate();
  });
});