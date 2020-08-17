<?php
function send_verified_mail($to,$phone,$unique_id){
  $body = '<!doctype html>
  <html>
  
  <head>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <meta name=viewport content="width=device-width">
      <meta http-equiv=Content-Type content="text/html; charset=UTF-8">
      <style>
          * {
              font-family: "Roboto", sans-serif;
              font-size: 100%;
              line-height: 1.6em;
              margin: 0;
              padding: 0
          }
          
          body {
              -webkit-font-smoothing: antialiased;
              height: 100%;
              -webkit-text-size-adjust: none;
              width: 100%!important;
              background: rgba(0, 0, 0, 0.8);
          }
          
          a {
              color: rgb(231, 67, 55);
          }
          
          table.body-wrap {
              padding: 20px;
              width: 100%
          }
          
          table.body-wrap table.footer-wrap {
              clear: both!important;
              width: 100%
          }
          
          h1,
          h2,
          h3 {
              color: rgb(231, 67, 55);
              font-weight: 200;
              line-height: 1.2em;
              margin: 20px 0 0px
          }
          
          h1 {
              font-size: 36px
          }
          
          h2 {
              font-size: 28px
          }
          
          h3 {
              font-size: 22px
          }
          
          p,
          ul,
          ol {
              font-size: 14px;
              font-weight: normal;
              margin-bottom: 10px;
              color: rgba(0, 0, 0, 0.8);
          }
          
          ul li,
          ol li {
              margin-left: 5px;
              list-style-position: inside
          }
          
          .container {
              clear: both!important;
              display: block!important;
              Margin: 0 auto!important;
              max-width: 600px!important
          }
          
          .body-wrap .container {
              padding: 20px 20px 30px 20px
          }
          
          td {
              background-color: #ffffff!important;
          }
          
          .cus-but {
              border-radius: 4px;
              background-color: rgb(231, 67, 55);
              border-color: #FF861C;
              color: white;
              border: 1px solid transparent;
              font-size: 14px;
              cursor: pointer;
              padding: 10px 10px;
          }
      </style>
  </head>
  
  <body>
      <table class=body-wrap>
          <tr>
              <td class=container style="border-radius:5px;">
                  <div class=content>
                      <table>
                          <tr>
                              <td>
                                  <center>
                                      <div>
                                      </div>
                                  </center>
  
                                  <div>
                                      <center>
                                          <h2>Do you have a cape?</h2><br>
                                          <h4>
                                              <p>We heartily welcome you to the world where superheroes are a reality!<br>An SMS was sent to <strong>+91 '.$phone.'</strong> containing your Unique ID. We hope that you\'ll be a <strong>responsible</strong> and
                                                  a <strong><em>responsive</em></strong> superhero! We expect you to acknowledge and respond to our messages as lives depend on it. Our algorithms will take into account various parameters like previous donation
                                                  date, location, etc. and contact you <strong>only</strong> when needed. So no spam :)</p>
                                              <h4>
                                                  <h5>Your Unique ID: <u>'.$unique_id.'</u></h5>
                                      </center>
                                  </div>
                              </td>
                          </tr>
                      </table>
                  </div>
              </td>
          </tr>
      </table>
      <center><span style="color:#d9d9d9;font-size:.7em;"> -- BloodDena -- </span></center>
  </body>
  
  </html>';
$headers = "From: BloodSync Team <noreply@bloodsync.com>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$subject = "Welcome to BloodSync!";
mail($to,$subject,$body,$headers);
}
?>
