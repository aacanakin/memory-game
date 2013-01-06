<?php
class AjaxController extends Controller{
	
	function before_load()
	{
		$this->load_model('score');
		$this->load_helper('validator');
		
		$init = $this->score->init_db(); // will be used for auto creation of score table		
		global $_COOKIE;
	}
	
	private function clean_data( $value)
	{
		$value = is_array($value) ? array_map( 'clean_data', $value) : strip_tags( html_entity_decode($value));
		return $value;
	}
	
	private function post_convert()
	{
		$data = file_get_contents('php://input');
		$data = $this->clean_data($data);
		return json_decode( $data, true);	
	}
	
	function save_score()
	{
		$data = $this->post_convert();		
		$email = (isset( $data['email']) && validate_email( $data['email'])) ? $data['email'] : '';
		$full_name = (isset( $data['full_name']) && validate_full_name( $data['full_name'])) ? $data['full_name'] : '';
		$score = (isset( $data['score']) && ($data['score'] <= 8) && ( $data['score'] > 0)) ? $data['score'] : '';
		
		if( empty( $score))
		{
			$return['msg'] = 'Invalid Score. Score must be between 0 and 8';
			$return['error'] = true;
			
			echo json_encode( $return);
			exit;
		}
		
		if( empty($email))
		{
			$return['msg'] = 'Invalid email address';
			$return['error'] = true;
			
			echo json_encode( $return);
			exit;
		}
		if( empty($full_name))
		{
			$return['msg'] = 'Invalid full name. Full name should be at least 3 characters';
			$return['error'] = true;
			
			echo json_encode( $return);
			exit;
		}
		
		if( !empty( $email) && !empty( $full_name) && !empty( $score))
		{
			$add_score = $this->score->add_score( Config::get('app_id'), $email, $full_name, $score);
			if( !$add_score['error'])
			{
				$return['msg'] = 'Your score is saved';
				$return['error'] = false;
				
				$expire = time()+60*60*24*30; // 1 month cookie expiration for user data
				setcookie("user_email", $email, $expire);
				setcookie("user_full_name", $full_name, $expire);
			}
			else
			{
				$return['msg'] = 'Oops! an error occured';
				$return['error'] = true;
			}
		}
		else
		{
			$return['msg'] = 'Invalid full name or email';
			$return['error'] = true;
		}
		
		echo json_encode( $return);
		exit;		
	}
	
	function get_high_scores( $start = 0, $amount = 5)
	{		
		$high_scores = $this->score->get_high_scores( $start, $amount);
		
		if( !$high_scores['error'])
		{
			$this->view->assign( 'high_scores', $high_scores['value']);
			//$return['data'] = $high_scores;
			$return['html'] = $this->view->render('/common/highscores', true);									
			$return['error'] = false;
		}
		else 
		{
			$return['html'] = null;
			$return['msg'] = 'Oops! an error occured during getting high scores';
			$return['error'] = true;
		}
						
		echo json_encode( $return);		
		exit;		
	}
	
	function index()
	{
		
	}
}