<?php

/*
 * include bootstrap core classes and scripts
 */
require_once SYSTEM_PATH . DS . 'functions.php';
require_once SYSTEM_PATH . DS . 'init.php';

/*
 * include database driver libraries according to configuration
 */

if( Config::get('db_type') === 'mysql')
{
	require_once SYSTEM_PATH . DS . 'db' . DS . 'mysql' . DS . 'driver.class.php';
}
else if ( Config::get('db_type') === 'mongodb')
{
	require_once SYSTEM_PATH . DS . 'db' . DS . 'mongodb' . DS . 'driver.class.php';	
}







