<?php
class ScoreModel extends Model{
	
	function init_db()
	{
		$query = '
				  CREATE TABLE IF NOT EXISTS '.Config::get('db_schema').'.`score` (
					  `app_id` int(11) NOT NULL,
					  `email` longtext NOT NULL,
					  `full_name` longtext NOT NULL,
					  `score` int(11) NOT NULL,
					  KEY `app_id` (`app_id`,`score`)
				  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
				 ';
		
		return $this->db->query( $query);
	}
	
	function add_score( $app_id, $email, $full_name, $score)
	{
		return $this->db->insert_ignore( 'score', array( 'email' => $email, 'app_id' => $app_id, 'full_name' => $full_name, 'score' => $score));		
	}
	
	function get_high_scores( $start, $amount)
	{
		$query = "select s.email, s.full_name, s.score
				  from ".Config::get('db_schema').".score s
				  order by s.score desc
				  limit {$start},{$amount};
				 ";
				 
		return $this->db->query($query);
	}
}