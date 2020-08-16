<?php

function send_request_mail($to,$blood_bank_name,$num_units,$blood_group,$address_url){
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
                                          <h2>IT IS YOUR TURN!</h2><br>
                                          <h4>
                                              <p>'.$blood_bank_name.' needs '.$num_units.' units of '.$blood_group.' blood. You seem to be a perfect match. Click the link below to get directions to the blood bank.</p>
                                              <h4>
                                                  <br>
                                                  <a href="'.$address_url.'"><button class="cus-but">GET LOCATION</button></a>
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
$headers = "From: ERP Project Team <noreply@sridhama.com>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$subject = "We need your help!";
mail($to,$subject,$body,$headers);
}
?>
