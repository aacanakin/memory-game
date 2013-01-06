<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Colour Memory</title>
	
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/jquery-1.8.3.js"></script>	
	<script type="text/javascript" src="js/jquery-ui-1.9.2.custom.min.js"></script>
	<script type="text/javascript" src="js/gritter/jquery.gritter.min.js"></script>	
	<script type="text/javascript" src="js/flip/jquery.flip.js"></script>
	<script type="text/javascript" src="js/colorbox/jquery.colorbox.js"></script>
	<script type="text/javascript" src="js/memory.js"></script>
		
</head>

<body>
	
	<div class="action_frame">
		<div class="box_container">
			{foreach from=$cards key=k item=v}
	    		<div class="box colour{$v} spacing"></div>
	    	{/foreach}	    
	    </div>
	    <div class="sidebar">
	    	<div class = "logo"></div>
    		<div class="score">Score: 0</div>
    		<div class="trial">Trials: 0</div>
    		{if isset( $info)}
    		<div class="info">{$info.email}<br>{$info.full_name}</div>
    		{/if}
	    </div>	   
	    
	    <button class="restart">RESTART</button>
    </div>
    
    
    <a class='add_score' style="display:none" href="#add_score"></a>
    <a class='high_score' style="display:none" href="#high_score"></a>
    
    <div style = "display:none">
	    <div id="add_score">
	    	<figure>
	    		<figcaption>
		    		<h1>Submit your score</h1> 
		    	</figcaption>      
				  
			   	<h2>Email</h2> 
			    <input type="text" id="email" class="email">
			    <h2>Full Name</h2>
			    <input type="text" id="full_name" class="email">
			    
			    <button class="submit_score">Submit</button>
			</figure>	    		  	               
  		</div>
  	</div>
  	 	    	
</body>

</html>