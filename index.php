<?php

require_once 'assets/core/config.php';
require_once 'assets/core/functions.php';

session_start();

// TWITTER
$tw_cache 		= './assets/cache/tw_cache.json';
$tweets;

if(file_exists($tw_cache) && filemtime($tw_cache) > time() - 60*30)
{
    $tweets = json_decode(file_get_contents($tw_cache), true);
}
else
{
	require_once 'assets/core/lib/twitteroauth/twitteroauth.php';
	
	$tw_connection 	= new TwitterOAuth (TWITTER_API_KEY, TWITTER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET );
	$tw_response	= $tw_connection->get("statuses/user_timeline", array('screen_name'=>'prplps', 'count'=>'2'));
	$tweets 		= array();
	
	foreach($tw_response as $tweet)
	{
		$tweets[] = json_decode(json_encode($tweet), true);
	} 
	
	file_put_contents($tw_cache, json_encode($tweets));
}

// INSTAGRAM
$shots_url		= 'https://api.instagram.com/v1/users/'.INSTAGRAM_USER_ID.'/media/recent?count=4&access_token='.INSTAGRAM_ACCESS_TOKEN;
$shots_cache 	= './assets/cache/shots_cache.json';
$shots;

if(file_exists($shots_cache) && filemtime($shots_cache) > time() - 60*60)
{
    $shots = json_decode(file_get_contents($shots_cache), true);
}
else
{    
    $shots_response = get_curl($shots_url);
    file_put_contents($shots_cache, $shots_response);
    
    $shots = json_decode($shots_response, true);
}

// FORM
$emailError = false;
$_SESSION['emailSuccess'] = isset($_SESSION['emailSuccess']) ? $_SESSION['emailSuccess'] : false;
if(isset($_POST['emailsubmitbtn']))
{
	$email = $_SESSION['email'] = $_POST['email'];
	
	if($email != '' && filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		sendMail($email);
		$_SESSION['emailSuccess'] = true;
	}
	else $emailError = true;
}

?><!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Florian Vanthuyne | Designer + Developer</title>
    <meta name="description" content="Profile page, who am I, what do I do">
    <meta name="author" content="Florian Vanthuyne">
	<meta name="viewport" content="width=device-width"/>
	<link rel="apple-touch-icon" href="assets/images/icons/apple-touch-icon.png">
	<link rel="icon" href="assets/images/icons/favicon.png">
	<!--[if IE]><link rel="shortcut icon" href="assets/images/icons/favicon.ico"><![endif]-->
	<meta name="msapplication-TileColor" content="#a1dfa1">
	<meta name="msapplication-TileImage" content="assets/images/icons/windows-tile-icon.png">
	
	<!--[if lt IE 9]><script type="text/javascript" src="assets/js/html5shiv.js"></script><![endif]-->
    <!-- CSS -->
    <link href="assets/css/normalize.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/css/stylesheet.css" rel="stylesheet" type="text/css"/>
    <link href='http://fonts.googleapis.com/css?family=Dosis:800|Karla:400,700' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="assets/js/modernizr-2.6.2.min.js"></script>
</head>
<body>
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    
    <!-- // -->
    
    <header>
    	<div class="container row clearfix">
    		<div class="col col-2">
    			<a href="" class="logo"><img src="assets/images/dummy.gif" alt="Flovan" /></a>
    			<h1><span class="slabtext">Hi. I'm Florian!</span></h1>
    			<p>I&#39;m a <span class="bold">designer</span> and <span class="bold">developer</span>, and a recently graduated <a href="http://devine.be" title="Visit the Devine website">Deviner</a>. Currently working full-time at <a href="http://adagioagency.com" title="Visit the Adagio Agency website">Adagio Agency</a>, a Belgian digital advertising agency.</p>
    		</div>
    		<div class="col col-2">
    			<a href="#contact" class="contact"><span class="hide">Contact me</span></a>
    		</div>
    	</div>
    </header>
    <section class="main-container">
    	<div class="container main-content">
    		<section class="featured" id="featured">
    			<div class="row clearfix">
	    			<h2 class="col col-4">My work</h2>
	    			<div class="separator col col-4-span-2"></div>
	    			<a href="http://www.behance.net/purplepies" class="button col col-4 pullup">Behance</a>
    			</div>
				<!--<div class="row clearfix">
					<article class="behance-item col col-4"><a href=""><img src="http://placehold.it/400x313" alt="" /></a></article>
					<article class="behance-item col col-4"><a href=""><img src="http://placehold.it/400x313" alt="" /></a></article>
					<article class="behance-item col col-4"><a href=""><img src="http://placehold.it/400x313" alt="" /></a></article>
					<article class="behance-item col col-4"><a href=""><img src="http://placehold.it/400x313" alt="" /></a></article>
					<?php
					
					/*foreach($projects['projects'] as $project)
					{
						$p_name		= $project['name'];
						$p_url		= $project['url'];
						$p_cover	= $project['covers']['115'];
						
						if(isset($project['covers']['202'])) $p_cover = $project['covers']['202'];
						if(isset($project['covers']['230'])) $p_cover = $project['covers']['230'];
						if(isset($project['covers']['404'])) $p_cover = $project['covers']['404'];
						
						echo '<article class="behance-item col col-4"><a href="'.$p_url.'"><img src="'.$p_cover.'" alt="'.$p_name.'" /></a></article>';
					}*/
					
					?>
				</div>-->
    		</section>
    		<section class="tweets" id="tweets">
    			<div class="row clearfix">
    				<h2 class="col col-4">Latest tweets</h2>
    				<div class="separator col col-4-span-2"></div>
    				<a href="http://twitter.com/prplps" class="button col col-4 pullup">Twitter</a>
    			</div>
				<div class="row clearfix">
					<?php
					
					foreach($tweets as $tweet)
					{
						$tw_content		= $tweet['text'];
						$tw_date 		= date("l M j \- g:ia", strtotime($tweet['created_at']));
						$tw_url			= 'http://twitter.com/prplps/status/'.$tweet['id'];
						
						echo '<article class="twitter-item col col-2">
							<p>'.$tw_content.' <a href="'.$tw_url.'" class="tinytext" title="Go to this tweet on Twitter" target="_blank">['.$tw_date.']</a></a></p>
						</article>';
					}
					
					?>
				</div>
    		</section>
    		<section class="insta" id="insta">
    			<div class="row clearfix">
    				<h2 class="col col-4">Latest snaps</h2>
    				<div class="separator col col-4-span-2"></div>
    				<a href="" class="button col col-4 pullup">Instagram</a>
    			</div>
				<div class="row clearfix">
					<?php
					
					foreach($shots['data'] as $shot)
					{
						$s_name		= $shot['caption']['text'];
						$s_url		= $shot['link'];
						$s_cover	= $shot['images']['standard_resolution']['url'];
						
						echo '<article class="insta-item col col-4"><a href="'.$s_url.'" target="_blank"><img src="'.$s_cover.'" alt="'.$s_name.'" /></a></article>';
					}
					
					?>
				</div>
    		</section>
    		<section class="profiles" id="profiles">
    			<div class="row clearfix">
    				<h2 class="col col-4">My channels</h2>
    				<div class="separator col col-4-span-3"></div>
    			</div>
    			<div class="row clearfix">
    				<a href="http://dribbble.com/prplps" class="button dribbble col col-4">Dribbble</a>
    				<a href="http://vimeo.com/purplepies" class="button vimeo col col-4">Vimeo</a>
    				<a href="http://github.com/purplepies" class="button github col col-4 clearmargin">Github</a>
    				<a href="http://www.linkedin.com/in/purplepies" class="button linkedin col col-4">LinkedIn</a>
    			</div>
    		</section>
    	</div>
    </section>
    <footer id="contact">
    	<div class="container">
	    	<div class="row clearfix">
	    		<h2 class="col col-4">Contact me</h2>
	    		<div class="separator col col-4-span-3"></div>
	    	</div>
    		<div class="row clearfix">
    			<p class="col col-2">As part of an experiment I require you, the visitor, to fill in <span class="bold">your</span> email address. <span class="note">You will get <span class="bold">one</span> generated email in your inbox from where you can proceed to contact me, within the comforts of your preferred email client.</span></p>
    			<?php
    			
    			if(isset($_SESSION['emailSuccess']) && $_SESSION['emailSuccess'] === true)
    			{
    				echo '<p class="col col-2 success">Thank you! You should receive an email in about a minute. If you haven&#39;t received anything in a few hours, please <a href="http://twitter.com/prplps">give me a poke on Twitter</a>.</p>';
    				
    				session_destroy();
    			}
    			else
    			{
    				echo '<form action="#contact" method="post" class="col col-2">
    					<label for="email"'; if($emailError) echo 'class="error" '; echo '>Fill in <span>your</span> email address here:
    						<input type="email" name="email" id="email" placeholder="info@yourdomain.com" value="'; if(isset($_SESSION['email'])) echo $_SESSION['email'];  echo '" />
    					</label>
    					<p><input type="submit" name="emailsubmitbtn" id="emailsubmitbtn" value="Send" /></p>
    				</form>';
    			}
    			
    			?>
    		</div>
    	</div>
    </footer>
    
	<!-- // -->

    <!-- javascript -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="assets/js/jquery-1.9.0.min.js"><\/script>')</script>
    <script src="assets/js/jquery.slabtext.min.js"></script>
    <script type="text/javascript" src="assets/js/script.js"></script>
</body>
</html>