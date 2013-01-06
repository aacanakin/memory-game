<?php

function check_input($data)
{
	$data = trim($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validate_email($email)
{
	check_input($email);
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		return true;
	}	
	else 
	{
		return false;
	}	
}

function validate_full_name($full_name)
{
	if( strlen( $full_name) < 3)
	{
		return false;
	}
	else
	{
		return true;
	}
}