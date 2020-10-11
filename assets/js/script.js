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
	},"Enter Valid  phone number");

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
				
				
				// street: {
				// 	required: true
				// },
				// select: {
				// 	required: true,
				// 	valueNotEquals: "default" 
				// },
				optional: {
					required: false
				}
			},
			messages: {
				required: 'This field is required',

				// email: 'Enter a valid email',
				email: 'Enter a valid email',
				firstName: 'Enter a first name',
				lastName: 'Enter a last name',
				address: 'Enter an address',
				city: 'Please enter a valid city',
				zip: 'Enter a ZIP / postal code',
				phone: 'Enter a valid phone number',
				
				// street: 'Please enter a valid street',
				// select: { 
				// 	valueNotEquals: "Please select an item" 
				// }
			},
			submitHandler: function (form) { // for demo
				form.submit();	
			}
		})
	});

	$(".validateReduction").each(function() {
		$(this).validate({
			rules: {
				reduction_code: {
					required: true,
					digits: true
				}
			},
			messages: {
				reduction_code: 'Enter a valid discount code or gift card',
			},
			submitHandler: function (form) {

			}
		})
	});



	$(document).on('input', '#reduction_code', function() { 
		if( $(this).val().length > 0 ){
			$(this).closest('.field__wrapper').find('.field__input-btn').removeClass('btn--disabled');
		} else {
			$(this).closest('.field__wrapper').find('.field__input-btn').addClass('btn--disabled');
		}
	}); 

	
});