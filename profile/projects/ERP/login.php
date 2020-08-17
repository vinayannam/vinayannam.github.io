<?php
  require('./includes/config.php');
  require('./includes/functions.php');
  if(isset($_SESSION['uuid'])){
    header("location: ./hospital");
  }
  $errormsg = "";
  if(isset($_POST['submit'])){
    $username = strtolower(mysqli_real_escape_string($connection,$_POST['username']));
    $password = mysqli_real_escape_string($connection,$_POST['password']);
    $sql = "SELECT * FROM `hospitals` WHERE username = '{$username}';";
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
      header("location: ./hospital");
    }else{
      $errormsg = '<div class="alert alert-danger" role="alert">The username and password you entered did not match our records. Please double-check and try again.</div>';
    }
}
?>
    <html>

    <head>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <script src="js/script.js "></script>
    </head>

    <body>
        <div class="form">
            <div class="form-panel one">
                <div class="form-header">
                    <h1>Blood Dena</h1>
                </div>
                <div class="form-content">
                    <form action="./hospital-login" method="post">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" maxlength=64 name="username" placeholder="Username" required="required">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" maxlength=64 name="password" placeholder="Password" required="required">
                        </div>

                        <div class="form-group">
                            <label class="form-remember">
                                    <?php echo $errormsg;?>
                </label>
                        </div>
                        <div class="form-group">
                            <button type="submit" name="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <?php include_once("./includes/analytics.php");?>
    </body>

    </html>