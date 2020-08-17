<?php
  require('./includes/config.php');
  require('./includes/functions.php');
  if(isset($_SESSION['uuid'])){
    header("location: ./bank");
  }
  $errormsg = "";
  if(isset($_POST['submit'])){
    $username = strtolower(mysqli_real_escape_string($connection,$_POST['username']));
    $password = mysqli_real_escape_string($connection,$_POST['password']);
    $sql = "SELECT * FROM `blood_banks` WHERE username = '{$username}';";
		$select_query = mysqli_query($connection, $sql);
    if(!$select_query){
      die("Login Error" . mysqli_error($connection));
    }
    while($row = mysqli_fetch_assoc($select_query)){
			$DB_username = $row['username'];
			$DB_pass = $row['password'];
			$DB_uuid = $row['uuid'];
			$DB_bank_name = $row['name'];
		}
    if(!isset($DB_username) && !isset($DB_pass)){
      $DB_username = null;
      $DB_pass = null;
    }
    //$pass_check = password_verify($password, $DB_pass);
    if($DB_username === $username && /*$pass_check == 1*/ $DB_pass === $password){
      session_unset();
      session_destroy();
      session_start();
      $_SESSION['uuid'] = $DB_uuid;
      $_SESSION['name'] = $DB_bank_name;
      header("location: ./bank");
    }else{
      $errormsg = '<div class="alert alert-danger" role="alert">The username and password you entered did not match our records. Please double-check and try again.</div>';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1.0">
<meta property=og:title content="BloodSync - Blood Donation Simplified">
<meta property=og:type content=website>
<meta property=og:url content=https://bloodsync.com/>
<meta property=og:image content=https://bloodsync.com/img/bloodsync.png>
<meta property=og:site_name content="BloodSync - Blood Donation Simplified">
<meta property=og:description content="BloodSync creates an active and efficient network of blood donors and blood banks that provide patients with ample blood at the right time. Through our algorithmic approach, we are building an effective and self-sustainable system.">
<meta name=identifier-url content=https://www.bloodsync.com/ />
<meta name=title content="BloodSync - Blood Donation Simplified" />
<meta name=description content="BloodSync creates an active and efficient network of blood donors and blood banks that provide patients with ample blood at the right time. Through our algorithmic approach, we are building an effective and self-sustainable system that ensures the least blood wastage." />
<meta name=abstract content="BloodSync creates an active and efficient network of blood donors and blood banks that provide patients with ample blood at the right time. Through our algorithmic approach, we are building an effective and self-sustainable system that ensures the least blood wastage." />
<meta name=keywords content="blood donor, blood donors online, donor network, free, hyderabad, blood donor hyderabad, BloodSync, Blood, Healthcare, Blood donation, Easiest way finding blood, Online blood bank, Register as blood donor, Blood donor club India, blood donor search, Blood banks Hyderabad, blood banks India, BloodSync.com, blood donor website, blood donation camp, free blood donors, search blood donors, blood donors in India, blood groups, world blood donor’s day, blood donor day, blood request, blood donor request, Bloodsync Blood donation, Bloodsync India, social service, blood bank, Hospitals, ERP systems in blood banks/hospitals, blood acceptors, verified blood, purified blood, blood donor registrations, voluntary blood donor registration, blood donors network, blood donors helpline, number of units of blood in blood bank" />
<meta name=revisit-after content=1 />
<meta name=language content=EN />
<title>Login | BloodSync</title>
<link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel=stylesheet type=text/css>
<link rel=stylesheet href=css/bootstrap.min.css>
<link rel=stylesheet href=css/font-awesome.min.css>
<link rel=stylesheet href=css/magnific-popup.css>
<link rel=stylesheet href=css/animate.min.css>
<link rel=stylesheet href=css/style.css>
<link href=css/colors/red.css rel=stylesheet id=color-opt>
<!--[if lt IE 9]>
<script src=js/html5shiv.js></script>
<script src=js/respond.min.js></script>
<![endif]-->
<link rel=apple-touch-icon sizes=180x180 href=./img/favicons/apple-touch-icon.png>
<link rel=icon type=image/png href=./img/favicons/favicon-32x32.png sizes=32x32>
<link rel=icon type=image/png href=./img/favicons/favicon-16x16.png sizes=16x16>
<link rel=manifest href=./img/favicons/manifest.json>
<link rel=mask-icon href=./img/favicons/safari-pinned-tab.svg color=#5bbad5>
<link rel="shortcut icon" href=./img/favicons/favicon.ico>
<meta name=msapplication-config content=./img/favicons/browserconfig.xml>
<meta name=theme-color content=#ffffff>
</head>
<body data-spy=scroll data-target=#navbar-menu id=bloodsync>
<div id=preloader>
<div class=loader></div>
</div>
<section class="bg-custom home-fullscreen home" id=singleform>
<div class=home-sm style="padding:50px 0 120px 0!important">
<div class=container>
<div class=row>
<div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
  <form class="signup-form wow zoomIn" action="./bloodbank-login" method="post">
      <h2 class="text-center" style="font-size: 23px;">Blood Bank Login</h2><hr>
      <div class="form-group">
          <input type="text" maxlength=64 class="form-control" name="username" placeholder="Username" required="required">
      </div>
      <div class="form-group">
          <input type="password" maxlength=64 class="form-control" name="password" placeholder="Password" required="required">
      </div>
      <?php echo $errormsg;?>
      <div class="form-group text-center">
          <button type="submit" name="submit" class="btn btn-custom btn-sm btn-block">Login</button>
      </div>
  </form>
</div>
</div>
<footer style=margin-top:1em><center><span style=color:#750000>© 2016 </span><a style=color:white href=./>BloodSync</a></center></footer>
<div id=particles-js></div>
</div>
</section>
<script src=js/jquery-2.1.4.min.js></script>
<script src=js/bootstrap.min.js></script>
<script type=text/javascript src=js/jquery.easing.1.3.min.js></script>
<script type=text/javascript src=js/jquery.sticky.js></script>
<script type=text/javascript src=js/owl.carousel.min.js></script>
<script type=text/javascript src=js/jquery.magnific-popup.min.js></script>
<script type=text/javascript src=js/jqBootstrapValidation.js></script>
<script type=text/javascript src=js/typed.min.js></script>
<script type=text/javascript src=js/particles.js></script>
<script src=js/wow.min.js></script>
<script src=js/custom.js></script>
<?php include_once("./includes/analytics.php");?>
</body>
</html>
