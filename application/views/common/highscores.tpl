<figure>
	<figcaption>
		<h1>High Scores</h1>  					
	</figcaption>
	
	<table>
	{foreach from=$high_scores key=k item=score}
		<tr>
			<td><h2>{($k+1)}. {$score.full_name}</h2></td>
			<td><h2>{$score.score}</h2></td>			
		</tr>	
	{/foreach}
	</table>	
</figure>