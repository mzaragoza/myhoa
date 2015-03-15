// JavaScript Document

$(document).ready(function() {
	
	$('#contactForm2 #submit2').click(function() {
		// Fade in the progress bar
		$('#contactForm2 #formProgress2').hide();
		$('#contactForm2 #formProgress2').html('<img src="forms/footer-form/images/ajax-loader.gif" /> Sending…');
		$('#contactForm2 #formProgress2').fadeIn();
		
		
		
		// Clear and hide any error messages
		$('#contactForm2 .formError').html('');
		
		// Set temaprary variables for the script
		var isFocus=0;
		var isError=0;
		
		// Get the data from the form
		var email=$('#contactForm2 #email2').val();
		var message=$('#contactForm2 #message2').val();
		
		// Validate the data
		if(email=='') {
			$('#contactForm2 #errorEmail2').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm2 #email2').focus();
				isFocus=1;
			}
			isError=1;
		} else {
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(reg.test(email)==false) {
				$('#contactForm2 #errorEmail2').html('Invalid email address.');
				if(isFocus==0) {
					$('#contactForm2 #email2').focus();
					isFocus=1;
				}
				isError=1;
			}
		}
		if(message=='') {
			$('#contactForm2 #errorMessage2').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm2 #message2').focus();
				isFocus=1;
			}
			isError=1;
		}
		
		// Terminate the script if an error is found
		if(isError==1) {
			$('#contactForm2 #formProgress2').html('');
			$('#contactForm2 #formProgress2').hide();
			
			
			
			return false;
		}
		
		$.ajaxSetup ({
			cache: false
		});
		
		var dataString = '&email=' + email + '&message=' + message;  
		$.ajax({
			type: "POST",
			url: "forms/footer-form/php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				//alert(msg);
				
				// Check to see if the mail was successfully sent
				if(msg=='Mail sent') {
					// Update the progress bar
					$('#contactForm2 #formProgress2').html('<img src="forms/footer-form/images/check.png" /> Message sent.').delay(2000).fadeOut(400);
					
					// Clear the message textbox
					$('#contactForm2 #message2').val('');
				} else {
					$('#contactForm2 #formProgress2').html('');
					alert('There was an error sending your email. Please try again.');
				}
				
				
			},
			error: function(ob,errStr) {
				$('#contactForm2 #formProgress2').html('');
				alert('There was an error sending your email. Please try again.');
				
				
			}
		});
		
		return false;
	});
});