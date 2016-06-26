import $ from 'jquery';

export default class StyledSelect {
	constructor(elem) {
		this.elem = elem;
	}

	decorate(options) {
		console.log("this.elem", this.elem);

		this.options = this._extend( {}, this.options );
		this._extend( this.options, options );

		this._init();

		this.options = {
			newTab : true,
			stickyPlaceholder : true,
			onChange : function( val ) { return false; }
		};
	}

	_extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	_init() {
		let selectedOpt = this.elem.querySelector( 'option[selected]' );
		this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

		this.selectedOpt = selectedOpt || this.elem.querySelector( 'option' );

		this._createSelectEl();
		this.selOpts = [].slice.call( this.selEl.querySelectorAll( 'li[data-option]' ) );
		this.selOptsCount = this.selOpts.length;
		
		this.current = this.selOpts.indexOf( this.selEl.querySelector( 'li.styledSelect--selected' ) ) || -1;
		
		this.selPlaceholder = this.selEl.querySelector( 'span.styledSelect__placeholder' );

		this._initEvents();
	}

	_createSelectEl() {
		let self = this, options = '', createOptionHTML = function(elem) {
			let optclass = '', classes = '', link = '';

			if( elem.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder ) {
				classes += 'styledSelect--selected ';
				this.foundSelected = true;
			}

			if( elem.getAttribute( 'data-class' ) ) {
				classes += elem.getAttribute( 'data-class' );
			}

			if( elem.getAttribute( 'data-link' ) ) {
				link = 'data-link=' + elem.getAttribute( 'data-link' );
			}

			if( classes !== '' ) {
				optclass = 'class="' + classes + '" ';
			}

			let extraAttributes = '';

			[].forEach.call(elem.attributes, function(attr) {
				let name = attr['name'];

				if(name.indexOf('data-') + ['data-option', 'data-value'].indexOf(name) == -1){
					extraAttributes += name + "='" + attr['value'] + "' ";
				}
			} );

			return '<li ' + optclass + link + extraAttributes + ' data-option data-value="' + elem.value + '"><span>' + elem.textContent + '</span></li>';
		};

		[].slice.call( this.elem.children ).forEach( function(elem) {
			if( elem.disabled ) { return; }

			var tag = elem.tagName.toLowerCase();

			if( tag === 'option' ) {
				options += createOptionHTML(elem);
			}
			else if( tag === 'optgroup' ) {
				options += '<li class="styledSelect__optgroup"><span>' + elem.label + '</span><ul>';
				[].slice.call( elem.children ).forEach( function(opt) {
					options += createOptionHTML(opt);
				} );
				options += '</ul></li>';
			}
		} );

		let opts_el = '<div class="styledSelect__options"><ul>' + options + '</ul></div>';
		this.selEl = document.createElement( 'div' );
		this.selEl.className = this.elem.className;
		this.selEl.tabIndex = this.elem.tabIndex;
		this.selEl.innerHTML = '<span class="styledSelect__placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
		this.elem.parentNode.appendChild( this.selEl );
		this.selEl.appendChild( this.elem );
	}

	_initEvents() {
		var self = this;

		this.selPlaceholder.addEventListener( 'click', function() {
			self._toggleSelect();
		} );

		this.selOpts.forEach( function(opt, idx) {
			opt.addEventListener( 'click', function() {
				self.current = idx;
				self._changeOption();
				
				self._toggleSelect();
			} );
		} );

		document.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( self._isOpen() && target !== self.selEl && !self._hasParent( target, self.selEl ) ) {
				self._toggleSelect();
			}
		} );

		this.selEl.addEventListener( 'keydown', function( ev ) {
			var keyCode = ev.keyCode || ev.which;

			switch (keyCode) {
				// up key
				case 38:
					ev.preventDefault();
					self._navigateOpts('prev');
					break;
				// down key
				case 40:
					ev.preventDefault();
					self._navigateOpts('next');
					break;
				// space key
				case 32:
					ev.preventDefault();
					if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
						self._changeOption();
					}
					self._toggleSelect();
					break;
				// enter key
				case 13:
					ev.preventDefault();
					if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
						self._changeOption();
						self._toggleSelect();
					}
					break;
				// esc key
				case 27:
					ev.preventDefault();
					if( self._isOpen() ) {
						self._toggleSelect();
					}
					break;
			}
		} );
	}

	_toggleSelect() {
		// remove focus class if any..
		this._removeFocus();
		
		if( this._isOpen() ) {
			if( this.current !== -1 ) {
				// update placeholder text
				this.selPlaceholder.textContent = this.selOpts[ this.current ].textContent;
			}
			$( this.selEl ).removeClass( 'styledSelect__active' );
		}
		else {
			if( this.hasDefaultPlaceholder && this.options.stickyPlaceholder ) {
				this.selPlaceholder.textContent = this.selectedOpt.textContent;
			}
			$( this.selEl ).addClass( 'styledSelect__active' );
		}
	}

	_removeFocus(opt) {
		var focusEl = this.selEl.querySelector( 'li.cs-focus' )
		if( focusEl ) {
			$( focusEl ).removeClass( 'cs-focus' );
		}
	}

	_isOpen(opt) {
		return $( this.selEl ).hasClass( 'styledSelect__active' );
	}

	_changeOption () {
		// if pre selected current (if we navigate with the keyboard)...
		if( typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ) {
			this.current = this.preSelCurrent;
			this.preSelCurrent = -1;
		}

		// current option
		var opt = this.selOpts[ this.current ];

		// update current selected value
		this.selPlaceholder.textContent = opt.textContent;
		
		// change native select element´s value
		this.elem.value = opt.getAttribute( 'data-value' );

		// remove class styledSelect--selected from old selected option and add it to current selected option
		var oldOpt = this.selEl.querySelector( 'li.styledSelect--selected' );
		if( oldOpt ) {
			$( oldOpt ).removeClass( 'styledSelect--selected' );
		}
		$( opt ).addClass( 'styledSelect--selected' );

		// if there´s a link defined
		if( opt.getAttribute( 'data-link' ) ) {
			// open in new tab?
			if( this.options.newTab ) {
				window.open( opt.getAttribute( 'data-link' ), '_blank' );
			}
			else {
				window.location = opt.getAttribute( 'data-link' );
			}
		}

		// callback
		this.options.onChange( this.elem.value );
	}

	_hasParent( e, p ) {
		if (!e) return false;
		var elem = e.target||e.srcElement||e||false;
		while (elem && elem != p) {
			elem = elem.parentNode||false;
		}
		return (elem!==false);
	}

}

