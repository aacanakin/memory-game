<?php

class IndexController extends Controller
{
	
	function before_load(){
				
	}

	function index()
	{		
		global $_COOKIE;
		
		$email = isset( $_COOKIE['user_email'] ) ? $_COOKIE['user_email'] : '';
		$full_name = isset( $_COOKIE['user_full_name']) ? $_COOKIE['user_full_name'] : '';

		if( !empty( $email) && !empty( $full_name))
		{
			$info['email'] = $email;
			$info['full_name'] = $full_name;
		}
		else
		{
			$info = null;
		}
								
		$cards = array();
		for( $i=0; $i<8; $i++)
		{
			$cards[$i] = $i+1;
		}
		
		$cards = array_merge( $cards, $cards);
		
		shuffle( $cards);		
		
		$this->view->assign('info', $info);
		$this->view->assign('cards', $cards);
		$this->render();	
	}

}