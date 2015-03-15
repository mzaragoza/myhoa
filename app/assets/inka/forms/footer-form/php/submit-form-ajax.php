<?php

if(empty($_POST['email']) || empty($_POST['message'])) {
	die('Error: Missing variables');
}

$email=$_POST['email'];
$message=$_POST['message'];

$to='youremail@gmail.com';
$subject = 'Contact Form Submission';
$headers = 'From: '.$email."\r\n" .
	'Reply-To: '.$email."\r\n" .
	'X-Mailer: PHP/' . phpversion();
$body='You have got a new message from the contact form on your website.'."\n\n";
$body.='Email: '.$email."\n";
$body.='Message: '."\n".$message."\n";
	
if(mail($to, $subject, $body, $headers)) {
	die('Mail sent');
} else {
	die('Error: Mail failed');
}

?>