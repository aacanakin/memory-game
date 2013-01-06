Colour Memory - README

- the project uses the following technologies, plugins and packages ;

1. ariba - the lightweight framework (https://github.com/arascanakin/ariba)

2. jQuery 1.8.3 - (http://jquery.com)

3. jQuery - UI - 1.9.2 with core effects and core animation packages.

4. jQuery - Gritter - (http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/)

5. Flip! - jQuery plugin - (http://lab.smashup.it/flip/)

6. ColorBox - a jQuery lightbox - (http://www.jacklmoore.com/colorbox)

7. MySql


Code Description

- in the root folder (memory_game), there exists /application folder. In the application folder, there are /controllers, /models and /views folder. 

- in the /application/controllers folder, there exists index.php and ajax.php. index.php is for shuffling cards and assigning views the $cards variables. ajax.php is used for ajax requests such as submitting scores and getting high scores.

- in the /application/models folder, there exists ScoreModel class in score.php. ScoreModel is used in database operations for submitting scores and getting high scores.

- in the /application/views folder, there exists /index/index.tpl which is the smarty template file for cards. /common/highscores.tpl is used for dynamic html generation in ajax requests. it consists the smarty template engine file for high score table.

- the .js, .css and image files reside in /webroot/js, /webroot/css and /webroot/img folders. memory.js is the core javascript file for the game. Morover, there are supplementary js files such as /colorbox/jquery.colorbox.js, /flip/jquery.flip.js, etc. 