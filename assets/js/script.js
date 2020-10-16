


$(document).ready(function(){

	// countdown
	var timer2 = "10:01";
	var interval = setInterval(function() {
	  var timer = timer2.split(':');
	  //by parsing integer, I avoid all extra string processing
	  var minutes = parseInt(timer[0], 10);
	  var seconds = parseInt(timer[1], 10);
	  --seconds;
	  minutes = (seconds < 0) ? --minutes : minutes;
	  if (minutes < 0) clearInterval(interval);
	  seconds = (seconds < 0) ? 59 : seconds;
	  seconds = (seconds < 10) ? '0' + seconds : seconds;
	  //minutes = (minutes < 10) ?  minutes : minutes;
	  $('.countdown').html(minutes + ':' + seconds);
	  timer2 = minutes + ':' + seconds;
	  if(minutes == 0 && seconds == 0){
	  	$('.timer-holder .text-count').addClass('is-hide');
		$('.timer-holder .text-ended').removeClass('is-hide');
	  }
	}, 1000);

	// modals
	$(document).on("click", ".modal-toggle", function(e){
		e.preventDefault();
		$('.modal').toggleClass('is-show');
		$('body').toggleClass('modal-open');
	});
	$(document).on("click", ".modal-close", function(e){
		e.preventDefault();
		$('.modal').removeClass('is-show');
		$('body').removeClass('modal-open');
	});

	//rule for phone number
	$.validator.addMethod("phoneno", function(value, element) {
		return value.match(/^\+(?:[0-9] ?){6,14}[0-9]$/) || value.match(/^(?:[0-9] ?){6,14}[0-9]$/);
	},"Enter a valid phone number");

	// modal validation
	$(".validateJs").each(function() {
		$(this).validate({
			rules: {
				required: 'required',
				email: {
					required: true,
					email: true
				},
				firstName:{
					required: true
				},
				lastName: {
					required: true
				},
				address: {
					required: true
				},
				city: {
					required: true
				},
				zip: {
					required: true,
					digits: true
				},
				phone: {
					required: true,
					phoneno: true 
				},
				discount: {
					required: true,
					discount: true 
				},
				optional: {
					required: false
				}
			},
			messages: {
				required: 'This field is required',
				email: 'Enter a valid email',
				firstName: 'Enter a first name',
				lastName: 'Enter a last name',
				address: 'Enter an address',
				city: 'Please enter a valid city',
				zip: 'Enter a ZIP / postal code',
				phone: 'Enter a valid phone number'
			},
			submitHandler: function (form) {
				// form.submit();

				// Go to step 2(Shipping)
				$('body').addClass('secondStep');
				$('body').find('.customer_bar').addClass('finished');
				$('body').find('.shipping_bar').addClass('active');
				
				$('body').find('.step__footer.step-customer').addClass('is-hide');
				$('body').find('.step__footer.step-shipping').removeClass('is-hide');

				var stepMail = $('body').find('.edit_checkout input[type=email]').val();
				$('body').find('.shippingMailJs').text(stepMail);

				var checkout_company = $('body').find('.edit_checkout #checkout_company').val() ;
				var checkout_address = $('body').find('.edit_checkout #checkout_address1').val();
				var checkout_apartment = $('body').find('.edit_checkout #checkout_address2').val();
				var checkout_zip = $('body').find('.edit_checkout #checkout_zip').val();
				var checkout_city = $('body').find('.edit_checkout #checkout_city').val();
				var checkout_country = $('body').find('.edit_checkout #checkout_country').val();
				if(checkout_company.length > 0){
					checkout_company += ', ';
				}
				if(checkout_apartment.length > 0){
					checkout_apartment += ', ';
				}

				$('body').find('.shippingInfoJs').text(checkout_company + checkout_address + ', ' + checkout_apartment + checkout_zip + checkout_city + ', ' + checkout_country);
				
			}
		})
	});


	$(".validatePayJs").each(function() {
		$(this).validate({
			rules: {
				required: 'required',
				firstName:{
					required: true
				},
				lastName: {
					required: true
				},
				address: {
					required: true
				},
				city: {
					required: true
				},
				zip: {
					required: true,
					digits: true
				},
				phone: {
					required: true,
					phoneno: true 
				},
				card_number: {
					required: true,
					digits: true
				},
				card_name: {
					required: true
				},
				card_expiry: {
					required: true,
					digits: true
				},
				security_code: {
					required: true,
					digits: true
				},
				optional: {
					required: false
				}
			},
			messages: {
				required: 'This field is required',
				firstName: 'Enter a first name',
				lastName: 'Enter a last name',
				address: 'Enter an address',
				city: 'Please enter a valid city',
				zip: 'Enter a ZIP / postal code',
				phone: 'Enter a valid phone number',

				card_expiry: 'Enter a valid card expiry'
			},
			errorPlacement: function(error, element) {
				$('body').find('.noticeErrorJs').removeClass('is-hide');
				// $('html, body').stop().animate({
				// 	scrollTop: $('body').find('.step__payment-method').offset().top
				// }, 300);
			},
			submitHandler: function(form) {  
				// Finished steps
				alert('You are a WINNER!!!')
			}
		})
	});



	// discount code
	// var discountArr = ['CRAFTON','CRAFTON-1','CRAFTON-1']
	
	$.validator.addMethod("discount", function(value, element) {
		return this.optional(element) || /^\bCRAFTON\b$/.test(value);
		// return this.optional(element) || /^\b$.each(discountArr,function(index,value){value})\b$/.test(value);
	});

	$(".validateReduction").each(function() {
		$(this).validate({
			rules: {
				reduction_code: {
					required: true,
					discount: true 
				}
			},
			messages: {
				reduction_code: 'Enter a valid discount code or gift card',
			},
			submitHandler: function (form) {
				$('body').find('.tags-list').removeClass('is-hide');
				$('body').find('.discountTagJs').text($('.field__input[name="reduction_code"]').val());
				$('body').find('.discountRowJs').removeClass('is-hide');


				$('body').find('.reduction-code__text').text($('.field__input[name="reduction_code"]').val());
			}
		})
	});

	$(document).on('click', '.discountRemoveJs', function() {
		$('body').find('.tags-list').addClass('is-hide');
		$('body').find('.discountRowJs').addClass('is-hide');
	});




	// label
	$(document).on('input', 'form input', function() {
		if( $(this).val().length > 0 ){
			$(this).closest('.field').addClass('field--show-floating-label');
		} else {
			$(this).closest('.field').removeClass('field--show-floating-label');
		}
	});

	// discount code
	$(document).on('input', '#reduction_code', function() {
		if( $(this).val().length > 0 ){
			$(this).closest('.field__wrapper').find('.field__input-btn').removeClass('btn--disabled');
		} else {
			$(this).closest('.field__wrapper').find('.field__input-btn').addClass('btn--disabled');
		}
	}); 

	// Return to step 1(Customer)
	$(document).on('click', '.RtoIJs, .secondStep .changeCustomerJs', function() {
		$('body').removeClass('secondStep');
		$('body').find('.step__footer.step-customer').removeClass('is-hide');
		$('body').find('.step__footer.step-shipping').addClass('is-hide');
		$('body').find('.edit_checkout input[type=email]').focus();

		$('body').find('.customer_bar').removeClass('finished');
		$('body').find('.shipping_bar').removeClass('active');
	});


	// Return to step 1(Customer) from step3(Payment)
	$(document).on('click', '.thirdStep .changeCustomerJs', function() {
		$('body').removeClass('thirdStep');
		$('body').find('.step__footer.step-customer').removeClass('is-hide');

		$('body').find('.step__footer.step-shipping').addClass('is-hide');
		$('body').find('.edit_checkout input[type=email]').focus();

		$('body').find('.customer_bar').removeClass('finished');
		$('body').find('.shipping_bar').removeClass('finished active');		
		$('body').find('.payment_bar').removeClass('active');

	});

	// Go to step 3(Payment)
	$(document).on('click', '.toPaymentBtnJs', function() {
		$('body').removeClass('secondStep');
		$('body').addClass('thirdStep');

		$('body').find('.shipping_bar').addClass('finished');
		$('body').find('.payment_bar').addClass('active');

		$('body').find('.step__footer.step-shipping').addClass('is-hide');
		$('body').find('.step__footer.step-payment').removeClass('is-hide');

		$('body').find('.paymentMethodJs').html($('.shippingLabelJs').text());
		$('body').find('.paymentPriceJs').html($('.shippingPriceJs').text());
		$('body').find('.rowMethodJs').removeClass('is-hide');
		$('body').find('.shippingMethodJs').addClass('is-hide');
	});

	
	// Return to step 2(Shipping)
	$(document).on('click', '.RtoSJs', function() {
		$('body').addClass('secondStep');
		$('body').removeClass('thirdStep');

		$('body').find('.shipping_bar').removeClass('finished');
		$('body').find('.payment_bar').removeClass('active');

		$('body').find('.step__footer.step-shipping').removeClass('is-hide');
		$('body').find('.step__footer.step-payment').addClass('is-hide');

		$('body').find('.paymentMethodJs').html('');
		$('body').find('.paymentPriceJs').html('');
		$('body').find('.rowMethodJs').addClass('is-hide');
		$('body').find('.shippingMethodJs').removeClass('is-hide');
	});


	// radio payment step
	$(document).on('change', '.step__section .content-box .input-radio', function() {

		$(this).closest('.content-box').removeClass('is-active');
		$(this).closest('.content-box').find('.content-box__row--secondary').addClass('is-hide');
		// $('body').find('.step__section .content-box .radio-wrapper').removeClass('is-active');
		// $('body').find('.step__section .content-box .radio-wrapper.content-box__row--secondary').addClass('is-hide');

		$(this).closest('.radio-wrapper').addClass('is-active');
		$(this).closest('.radio-wrapper').next().removeClass('is-hide');
	});

	// tel input
	var input = document.querySelector("#phone");
	window.intlTelInput(input, {
		// utilsScript: "node_modules/intl-tel-input/build/js/utils.js",
		utilsScript: "assets/js/utils.js",
	});

	// show tel input if checbox is checked
	$(document).on('click', '.step__remember .checkbox-wrapper .input-checkbox, .step__remember .checkbox-wrapper .checkbox__label', function() {
		if($(".step__remember .checkbox-wrapper .input-checkbox").is(':checked')){
			$('body').find('.step__remember .content-box .content-box__row--secondary').removeClass('is-hide');  // checked
		}else{
			$('body').find('.step__remember .content-box .content-box__row--secondary').addClass('is-hide');  // unchecked
		}
	});


	// mobile sidebar
	$(document).on('click', '.orderBtnToggleJs', function() {
		$(this).addClass('show-btn');
		$(".sidebar__content").slideDown( "slow", function() {
			$('body').find(".hideTextJs").removeClass('is-hide');
			$('body').find(".showTextJs").addClass('is-hide');
		});

		
	});


	$(document).on('click', '.orderBtnToggleJs.show-btn', function() {
		$(this).removeClass('show-btn');
		$(".sidebar__content").slideUp( "slow", function() {
			$('body').find(".hideTextJs").addClass('is-hide');
			$('body').find(".showTextJs").removeClass('is-hide');
		});
	});
	
});