// JavaScript Document

$(document).ready(function() {
	
	$('#contactForm #submit').click(function() {
		// Fade in the progress bar
		$('#contactForm #formProgress').hide();
		$('#contactForm #formProgress').html('<img src="forms/contact-form/images/ajax-loader.gif" /> Sending…');
		$('#contactForm #formProgress').fadeIn();
		
		
		
		// Clear and hide any error messages
		$('#contactForm .formError').html('');
		
		// Set temaprary variables for the script
		var isFocus=0;
		var isError=0;
		
		// Get the data from the form
		var name=$('#contactForm #name').val();
		var email=$('#contactForm #email').val();
		var organization=$('#contactForm #organization').val();
		var subject=$('#contactForm #subject').val();
		var message=$('#contactForm #message').val();
		
		// Validate the data
		if(name=='') {
			$('#contactForm #errorName').html('This is a required field.');
			$('#contactForm #name').focus();
			isFocus=1;
			isError=1;
		}
		if(email=='') {
			$('#contactForm #errorEmail').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm #email').focus();
				isFocus=1;
			}
			isError=1;
		} else {
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(reg.test(email)==false) {
				$('#contactForm #errorEmail').html('Invalid email address.');
				if(isFocus==0) {
					$('#contactForm #email').focus();
					isFocus=1;
				}
				isError=1;
			}
		}
		if(message=='') {
			$('#contactForm #errorMessage').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm #message').focus();
				isFocus=1;
			}
			isError=1;
		}
		
		// Terminate the script if an error is found
		if(isError==1) {
			$('#contactForm #formProgress').html('');
			$('#contactForm #formProgress').hide();
			
			
			
			return false;
		}
		
		$.ajaxSetup ({
			cache: false
		});
		
		var dataString = 'name='+ name + '&email=' + email + '&organization=' + organization + '&subject=' + subject + '&message=' + message;  
		$.ajax({
			type: "POST",
			url: "forms/contact-form/php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				//alert(msg);
				
				// Check to see if the mail was successfully sent
				if(msg=='Mail sent') {
					// Update the progress bar
					$('#contactForm #formProgress').html('<img src="forms/contact-form/images/check.png" /> Message sent.').delay(2000).fadeOut(400);
					
					// Clear the subject field and message textbox
					$('#contactForm #subject').val('');
					$('#contactForm #message').val('');
				} else {
					$('#contactForm #formProgress').html('');
					alert('There was an error sending your email. Please try again.');
				}
				
				
			},
			error: function(ob,errStr) {
				$('#contactForm #formProgress').html('');
				alert('There was an error sending your email. Please try again.');
				
				
			}
		});
		
		return false;
	});
});