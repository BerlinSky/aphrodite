import $ from 'jquery';
import StyledSelect from './styledSelect';

$(function () {
	$( 'select.js-styledSelect' ).each( function(index, value) {  
		// const elem = $(this);
    const selectTm = new StyledSelect(this);
    selectTm.decorate();
  });
});