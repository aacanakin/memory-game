$(document).ready( function(){
	
	//$('.high_score').colorbox({inline : true});
	$('.add_score').colorbox({inline : true});	
	
	var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'js/flip/flip.wav');
     
    $.get();
    audioElement.addEventListener("load", function() {
     
    });
    
    // submit score ajax call
    $('.submit_score').live("click", function()
	{		
		var $score_text = $('.score').text().split(' ');
		var $score = parseInt( $score_text[1]);		
		var $email = $('#email').val();
		var $full_name = $('#full_name').val();
		
		save_score( $email, $full_name, $score);
		
		return false;
		
	});
	
	$('.restart').live("click", function()
	{
		location.reload();
	});
	
	$('.box').live("click", function()
	{						
		if( $(this).hasClass('disabled'))
		{
			return false;
		}
		else
		{				
			var that = $(this);
			
			$(this).flip({
				direction:'rl',
				speed: 200,
				content: $(this).html(),				
				onAnimation: function(){
					audioElement.play();
				},
				onEnd: function(){
					
					if( $(that).hasClass('open'))
					{
						$(that).removeClass('open');						
					}
					else
					{				
						var $current_box = $(that).attr('class');
						var $opened_cards = $('.open').length;
						
						if( $opened_cards == 2)
						{
							close_all();
						}
																				
						var $classes = $current_box.split(' ');
						var $color = $classes[1];
						$(that).addClass('open');
								
						if( $opened_cards == 1)
						{
							check_hit();
							update_trial();
						}												
									
						// game is finished
						if( $('.disabled').length == 16)
						{	
							$.gritter.add({
								
								title: 'Game finished',
								
								text: 'Gratz!',
								
								sticky: false,
								
								time : 5000,
								
								image : 'img/gritter/success.png'
								
							});							
							
							if( !checkCookie()) 
							{
								$('.add_score').click();
							}
							else
							{
								var $email = getCookie( 'user_email');
								var $full_name = getCookie( 'user_full_name');
								
								var $score_text = $('.score').text().split(' ');
								var $score = parseInt( $score_text[1]);
								
								save_score( $email, $full_name, $score);
							}
																				
						}				
					}						
				}
			});
					
		}
		
	});
	
	// get_high_scores ajax call
	function get_high_scores()
	{
		$.ajax({
			
		      type: 'GET',
		      url: 'ajax/get_high_scores',
		      cache : false,
		      contentType: "application/json; charset=utf-8",
		      dataType: 'json',		             
		      success: function(data) {
		    	  
		    	  // open colorbox accordingly
		    	  if( data.error)
		    	  {
		    		  $.gritter.add({
		    				
		    				title: 'Submit Score',
		    				
		    				text: data.msg,
		    				
		    				sticky: false,
		    				
		    				time : 2000,
		    				
		    				image : 'img/gritter/warning-icon.png'
		    				
		    		  });
		    	  }
		    	  else
		    	  {
		    		  var $html = data.html;
		    		  $('#add_score').fadeOut('slow', function(){
		    			  $('#add_score').html( $html);
		    			  $('#add_score').fadeIn('slow');
		    		  });
		    		  
		    		  
		    		  		    		 	    		  		    		  
		    	  }
	          },
			  error: function(xhr, ajaxOptions ,thrownError) {        	
		          console.log(xhr);
		          console.log(thrownError);		          
		          return false;
			  }
		      
		});
		
		return false;
	}
	
	function close_all()
	{
		var opened_ones = $('.open');
		$(opened_ones).removeClass('open');
	}
	
	function check_hit()
	{		
		var opened = $('.open');
		
		var $box_1 = $('.open').eq(0).attr('class').split(' ');
		var $box_2 = $('.open').eq(1).attr('class').split(' ');
						
		var $color1 = $box_1[1];
		var $color2 = $box_2[1];
												
		if( $color1 == $color2)
		{
			$(opened).removeClass('open');
			$(opened).addClass('disabled');

			add_score();
		}						
		else
		{
			remove_score();
		}
	}
	
	function remove_score() // decrement score event
	{
		var $score_text = $('.score').text().split(' ');
		var $score = parseInt( $score_text[1]);		
		$score = $score - 1;
		
		if( $score < 0)
		{
			$score = 0;
		}
		
		$('.score').text('Score: ' + $score);
	}
				
	function add_score() // increment score event
	{
		var $score_text = $('.score').text().split(' ');
		var $score = parseInt( $score_text[1]);		
		$score = $score + 1;
		
		$('.score').text('Score: ' + $score);
	}
	
	// save score ajax call
	function save_score( $email, $full_name, $score) 
	{				
		var $request_vars = {									
			'score' : $score,
			'email' : $email,
			'full_name' : $full_name													
		};
			
		var $out = JSON.stringify( $request_vars);
		
		$.ajax({
			
		      type: 'POST',
		      url: 'ajax/save_score',
		      cache : false,
		      contentType: "application/json; charset=utf-8",
		      dataType: 'json',
		      data: $out,        
		      success: function(data) {
	            
		    	  if( data.error)
		    	  {
		    		  $.gritter.add({
		    				
		    				title: 'Submit Score',
		    				
		    				text: data.msg,
		    				
		    				sticky: false,
		    				
		    				time : 2000,
		    				
		    				image : 'img/gritter/warning-icon.png'
		    				
		    		  });
		    	  }
		    	  else
		    	  {		    		  		    		  
		    		  $.gritter.add({
		    				
		    				title: 'Submit Score',
		    				
		    				text: data.msg,
		    				
		    				sticky: false,
		    				
		    				time : 5000,
		    				
		    				image : 'img/gritter/success.png'
		    				
		    			});
		    		  	//$('#add_score').fadeOut('slow');
		    		  	//$('#cboxClose').trigger( 'click');
		    		  //$('#cboxClose').one('click',get_high_scores);	
		    		  //$('#cboxClose').click();		    		  
		    		  
		    		  	get_high_scores();
		    		  	
//		    		  			    		  			    		  			    		  		    		  	
		    		  	
		    	  }
	          },
			  error: function(xhr, ajaxOptions ,thrownError) {        	
		          console.log(xhr);
		          console.log(thrownError);		          
		          return false;
			  }
		      
		});
		
		return false;
	}
	
			
	function update_trial()
	{
		var $trial_text = $('.trial').text().split(' ');
		var $trial = parseInt( $trial_text[1]);		
		$trial = $trial + 1;
		
		$('.trial').text('Trials: ' + $trial);
	}
	
	// cookie functions 
	function getCookie(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x==c_name)
			  {
				  return unescape(y);
			  }
		}
	}
	
	function checkCookie()
	{
		var email = getCookie("user_email");
		var full_name = getCookie("user_full_name");
		if ( email != null && email != "" && full_name != null && full_name != "")
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
	
});