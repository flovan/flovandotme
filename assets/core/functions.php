<?php

function get_curl($url)
{
    if(function_exists('curl_init'))
    {
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0); 
        
        $output = curl_exec($ch);
        //echo curl_error($ch);
        curl_close($ch);
        
        return $output;
    }
    else return file_get_contents($url);
}

function sendMail($email)
{
    $from = MAIL_SENT_BY;
    $to = $email;
    $subject = 'Flovan | You wanted to contact me?';
    $message = '<p>Hi there,</p><p>It seems that you have requested this email through my website <a href="http://flovan.me">flovan.me</a>. Feel free to answer to this email, or just send a new one to <a href="mailto:florian@purplepies.be">florian@purplepies.be</a>.</p><p>I hope to hear from you soon,<br/>Florian</p>';
    $headers  = "From: $from\r\n";
    $headers .= "Content-type: text/html\r\n";

    mail($to, $subject, $message, $headers);
}

?>