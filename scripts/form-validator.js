$( document ).ready( function(){

	var Validator = {

		error: {
			amount: 0,
			msg: '',
			1:{ 'msg': 'There are some mandatory fields on the form which should be populated correctly.<br>' },
			2:{ 'msg': 'The Phone field should contain only numbers.<br>' },
			3:{ 'msg': 'The Name field should contain only letters.<br>' },
			4:{ 'msg': 'The Comment is too long.<br>' },
			5:{ 'msg': 'Not a valid email address.<br>' },
			6:{ 'msg': 'Fehlermeldung: <br>' },
			7:{ 'msg': 'Errors found: ' },
			success: 'Form data is correct, thank you.'
		},

		color: {
			bg:{
				'pink': '#ffb6c1'
			},
			fg:{
				'green': '#739024',
				'red': '#e30042'
			}
		},
		
		/*main method*/
		check: function(){
			this.colorReset();
			this.isRequired();
			this.isPhone();
			this.isText();
			this.isEmail();
			this.isMaxLength();
			this.printErrors();
			this.error.amount = 0;
		},

		colorReset: function(){
			$( 'form textarea, form input' ).not( '#submit' ).css( 'background', 'white' );
			this.error.msg = '';
			$( '#fehlermeldung' ).html( '' );
		},

		isRequired: function(){
			var err = 0;
			//get matching elements
			var elems = $( '[data-val=required]' );
			//process all matching elems in the loop
			$.each( elems, function(){
				var el = $( this );
				var value = $.trim( el.val() );
				if ( value.length == 0 ){
					el.css( 'background', '#ffb6c1' );
					//console.log( 'empty field!' );
					err++;	
				} 
			} ); //endeach
			this.addError( 1 );
			this.error.amount += err;
			err = 0;
		},

		isPhone: function(){
			var elem = $( 'input[type=tel]' );
			var telefon = elem.val();
			var pattern = /^\d+$/;
			if( !pattern.test( telefon ) ){
				elem.css( 'background', this.color.bg.pink );
				this.addError( 2 );
				this.error.amount++;
				//console.log( 'not a phone!' );
			}			
		},

		isText: function(){
			var elem = $( 'input[type=text]' );
			var text = elem.val();
			var pattern = /^[a-zA-Z]+$/;
			if( !pattern.test( text ) ){
				elem.css( 'background', this.color.bg.pink );
				this.addError( 3 );
				this.error.amount++;
				//console.log( 'not a text!' );
			}			
		},

		isEmail: function(){
			var elem = $( 'input[type=email]' );
			var mail = elem.val();
			var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if( !pattern.test( mail ) ){
				elem.css( 'background', this.color.bg.pink );
				this.addError( 5 );
				this.error.amount++;
				//console.log( 'not a valid email address!' );
			}				
		},

		isMaxLength: function(){
			var elem = $( 'textarea' );
			var text = $.trim( elem.val() );
			if( text.length > 500 ){
				elem.css( 'background', this.color.bg.pink );
				this.addError( 4 );
				this.error.amount++;
				//console.log( 'comment too long!' );				
			}
		},

		addError: function( number ){
			if( number > 0 && number < 6 ){
				this.error.msg += this.error[number].msg;
			}
		},

		printErrors: function(){
			var color, msg = '';

			if( this.error.amount > 0 ){
				color = this.color.fg.red;
				msg = this.error[6].msg + this.error.msg + this.error[7].msg + this.error.amount ;
			} else {
				color = this.color.fg.green;
				msg = this.error.success;
			}

			$( '#fehlermeldung' ).css( 'color', color ).html( msg );
		}

	}//end Validator

	$( document ).on( 'click', '#submit', function( evt ){ 
		evt.preventDefault();
		Validator.check();
	} );

});