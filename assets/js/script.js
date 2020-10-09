$(document).ready(function(){

	//mobile menu
	$(document).on("click", ".showMenu", function(){
		$(this).toggleClass("opened");
		$(".toggleMenu").toggleClass("menu-open");
		$("body").toggleClass("active-menu");
		$("html").toggleClass("overflow");
	});

	// Swiper: Slider
	var offersSwiper = new Swiper('.swiper-container.recomendations-slider', {
		slidesPerView: 3,
		spaceBetween: 30,
		watchSlidesVisibility: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1239: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			767: {
				slidesPerView: 1
			},
		},
	});
	function mobileHeader(){
		if (window.matchMedia('(max-width: 991px)').matches) {
			$('.moveForMobile ul').detach().appendTo('.mobileHeader');
			$('.moveForm form').detach().checkout-personal-information-stepappendTo('.mobileHeader');
		}else{
			$('.mobileHeader ul').detach().appendTo('.moveForMobile');
			$('.mobileHeader .wrap-search').detach().appendTo('.moveForm');
		}
	}
	mobileHeader();
	$(window).resize(function() {
		mobileHeader();
	})

	if ($('.graphic').length) {
		am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		var chart = am4core.create("chartdiv", am4charts.XYChart);

		chart.data = [{
		  "day": "10 Nov",
		  "income": 4
		}, {
		  "day": "11 Nov",
		  "income": 7.7
		}, {
		  "day": "12 Nov",
		  "income": 3.8
		}, {
		  "day": "13 Nov",
		  "income": 8
		}, {
		  "day": "14 Nov",
		  "income": 7.7
		}, {
		  "day": "15 Nov",
		  "income": 3.8
		}, {
		  "day": "16 Nov",
		  "income": 3.9
		}];

		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.ticks.template.disabled = true;
		categoryAxis.renderer.line.opacity = 0;
		categoryAxis.renderer.grid.template.disabled = true;
		categoryAxis.dataFields.category = "day";
		categoryAxis.startLocation = 0.4;
		categoryAxis.endLocation = 0.6;

		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.max = 12;
		valueAxis.renderer.minGridDistance = 20;

		var lineSeries = chart.series.push(new am4charts.LineSeries());
		lineSeries.dataFields.categoryX = "day";
		lineSeries.dataFields.valueY = "income";
		lineSeries.tooltipText = "income: {valueY.value}";
		lineSeries.fillOpacity = 0.5;
		lineSeries.strokeWidth = 1;
		lineSeries.stroke = am4core.color("#4b8fff");
		lineSeries.fill = am4core.color("rgba(77, 144, 255, 0.13)");

		var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
		bullet.circle.radius = 3;
		bullet.circle.fill = am4core.color("#fff");
		bullet.circle.strokeWidth = 2;

		chart.cursor = new am4charts.XYCursor();
		chart.cursor.behavior = "panX";
		chart.cursor.lineX.opacity = 0;
		chart.cursor.lineY.opacity = 0;

		}); // end am4core.ready()
	}

	//rule for birthdate
	$.validator.addMethod("birth", function (value, element) {
        var year = value.split('/');
        if ( value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/) && parseInt(year[2]) <= 2019 )
            return true;
        else
            return false;
    });

	//rule for phone number
	$.validator.addMethod("phoneno", function(value, element) {
		return value.match(/^\+(?:[0-9] ?){6,14}[0-9]$/) || value.match(/^(?:[0-9] ?){6,14}[0-9]$/);
	},"Enter Valid  phone number");

	//rule for select
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
		return arg !== value;
	}, "Value must not equal arg.");


	$.validator.addMethod("passwordProfile", function(value, element, param) {
		if (this.optional(element)) {
			return true;
		} else if (!/[A-Z]/.test(value)) {
		    return false;
		} else if (!/[a-z]/.test(value)) {
		    return false;
		} else if (!/[0-9]/.test(value)) {
		    return false;
		}
		return true;
	},"Password must contain lowercase, uppercase and number");


	// modal validation
	$(".validateJs").each(function() {
		$(this).validate({
			rules: {
				required: 'required',
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength : 5
				},
				password_confirm: {
					required: true,
					minlength : 5,
					equalTo : "#inputPassword"
				},
				password_profile: {
					required: true,
					minlength : 5,
					passwordProfile: true
				},
				firstName:{
					required: true
				},
				lastName: {
					required: true
				},
				birthdate: {
					required: true,
					birth: true
				},
				job: {
					required: true
				},
				website: {
					required: true,
      				url: true
				},
				phone: {
					required: true,
					phoneno: true 
				},
				street: {
					required: true
				},
				city: {
					required: true
				},
				select: {
					required: true,
					valueNotEquals: "default" 
				},
				zip: {
					required: true,
					digits: true
				},
				optional: {
					required: false
				}
			},
			messages: {
				required: 'This field is required',
				email: 'Please enter a valid email address',
				password: 'Please enter a valid password',
				password_confirm: 'Please enter a valid password',
				firstName: 'Please enter a valid first name',
				lastName: 'Please enter a valid last name',
				birthdate: 'Please enter a valid date',
				job: 'Please enter a valid job',
				website: 'Please enter a valid URL',
				phone: 'Please enter a valid phone',
				street: 'Please enter a valid street',
				city: 'Please enter a valid city',
				select: { 
					valueNotEquals: "Please select an item" 
				},
				zip: 'Please enter a valid zip code'
			},
			submitHandler: function (form) { // for demo
	            form.submit();	
	        }
		})
	});

	// Swiper: Slider "Direct Search page"
	var offersSwiper = new Swiper('.swiper-container.direct-search-slider', {
		slidesPerView: 2,
		spaceBetween: 30,
		watchSlidesVisibility: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1200: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			767: {
				slidesPerView: 1
			},
		},
	});


	//tab
	$('.messaging-tabs [data-toggle="tab"]').on('show.bs.tab', function(e) {
		let target = $(e.target).data('target');
		$(target)
		.addClass('active show')
		.siblings('.tab-pane.active')
		.removeClass('active show')
	});

	//closeProfile button
	$(document).on("click", ".closeProfileJs", function(){
		$('.col-profile').removeClass('show-profile').addClass('hide-profile');
		$('.col-messaging').removeClass('show-messaging').addClass('hide-messaging');
		$('.openProfileJs').addClass('active');
		$('.tab-backdrop').removeClass('show');
	});

	//open Profile button
	$(document).on("click", ".openProfileJs", function(){
		$('.col-profile').removeClass('hide-profile').addClass('show-profile');
		$('.openProfileJs').removeClass('active');
		$('.tab-backdrop').addClass('show');
	});

	$(document).on("click", ".messaging-link", function(){
		$('.col-profile').removeClass('hide-profile').addClass('show-profile');
		$('.openProfileJs').removeClass('active');
		$('.tab-backdrop').addClass('show');
		$('.col-messaging').removeClass('show-messaging').addClass('hide-messaging');
	});

	//openMessagingJs button
	$(document).on("click", ".openMessagingJs", function(){
		$('.col-messaging').removeClass('hide-messaging').addClass('show-messaging');
		$('.tab-backdrop').addClass('show');
	});


	//checkbox validation
	$(".validateCheckboxJs .btn-group-toggle").each(function() {
		$(this).on('click', function() {
	 		if ($(this).find('input').attr("checked")) {
	 			$(this).find('input').removeAttr("checked");
 				$(this).closest('.form-group').removeClass('valid');
	 			$(this).closest('.form-group').addClass('error');
	 			$(this).closest('.validateCheckboxJs').find('.validateMsgJs .error-message').remove();
		        $(this).closest('.validateCheckboxJs').find('.validateMsgJs').append('<p class="error-message">at least one game must be selected</p>');
	        } else {
	            $(this).find('input').attr("checked", "checked");
	            $(this).closest('.form-group').removeClass('error');
	            $(this).closest('.form-group').addClass('valid');
		        $(this).closest('.validateCheckboxJs').find('.validateMsgJs .error-message').remove();
	        }
	        if ($(this).closest('.validateCheckboxJs').find('.form-group.valid').length > 0){
	        	$(this).closest('.validateCheckboxJs').find('.validateMsgJs .error-message').remove();
	        }
		})
	});
	$(document).on("click", ".validateCheckboxJs .btnSubmitJs", function(){
		if ($('.validateCheckboxJs').find('.form-group.valid').length > 0){
			$(this).closest('.validateCheckboxJs').find('.validateMsgJs .error-message').remove();
		} else {
			$(this).closest('.validateCheckboxJs').find('.validateMsgJs .error-message').remove();
			$(this).closest('.validateCheckboxJs').find('.validateMsgJs').append('<p class="error-message">at least one game must be selected</p>');
			return false;
		}
	})

	//notes elements
	$(document).on("click", ".boldBtnJs", function(){
		$(this).toggleClass('active');
		$(this).closest('.wrap-notes').find('.notes-body')
		.toggleClass('bold-wrap');
	})
	$(document).on("click", ".italicBtnJs", function(){
		$(this).toggleClass('active');
		$(this).closest('.wrap-notes').find('.notes-body')
		.toggleClass('italic-wrap');
	})
	$(document).on("click", ".diskBtnJs", function(){
		$(this).toggleClass('active');
		$(this).closest('.wrap-notes').find('.notes-body')
		.removeClass('check-wrap')
		.toggleClass('disk-wrap');
	})
	$(document).on("click", ".checkBtnJs", function(){
		$(this).toggleClass('active');

		$(this).closest('.wrap-notes').find('.notes-body')
		.removeClass('disk-wrap')
		.toggleClass('check-wrap');
	})

	$(document).on("input", "input[name='password_profile']", function(){
		if($(this).val().length > 0) {
			$('.regex-1').addClass('is-active')
		} else {
			$('.regex-1').removeClass('is-active')
		}
		var upperCase= new RegExp('[A-Z]');
		var lowerCase= new RegExp('[a-z]');
		var numbers = new RegExp('[0-9]');

		if ( $(this).val().match(lowerCase) ){
			$('.regex-2').addClass('is-active')
		} else {
			$('.regex-2').removeClass('is-active')
		}

		if ( $(this).val().match(upperCase) ){
			$('.regex-3').addClass('is-active')
		} else {
			$('.regex-3').removeClass('is-active')
		}

		if( $(this).val().match(numbers) ){
			$('.regex-4').addClass('is-active')
		} else {
			$('.regex-4').removeClass('is-active')
		}
	})

	$(document).on('click', '.eyeBtnJs', function() {
		$(this).closest('.form-group').toggleClass("eye-hidden");
		var input = $(this).closest('.form-group').find(".pass");
		input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password');
	});

	$(".headSwitchJs").each(function() {
		$(this).on('click', function() {
			if (!$(this).closest('.custom-switch').find('input').prop("checked")) {
				$(this).closest('.custom-switch').find('input').removeAttr("checked");
				$(this).closest('.custom-switch-wrap').find('.switchRowJs').removeClass('disabled');
			} else {
				$(this).closest('.custom-switch').find('input').attr("checked", "checked");
				$(this).closest('.custom-switch-wrap').find('.switchRowJs').addClass('disabled');
			}

		})
	})

	// Swiper: Slider
	var offersSwiper = new Swiper('.insitutions-slider', {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		watchSlidesVisibility: true,
		breakpoints: {
			1239: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			767: {
				slidesPerView: 3
			},
			575: {
				slidesPerView: 2.6
			},
		},
	});

	var offersSwiper = new Swiper('.comment-slider', {
		slidesPerView: 2,
		spaceBetween: 15,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		breakpoints: {
			991: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		},
	});
	
});