<?php
  require('./includes/config.php');
  require('./includes/functions.php');
  require('./mail/send_verify_mail.php');
  $errormsg = $succmsg = "";
  if(isset($_POST['submit'])){
      $errormsg = '<div class="form-group"><p style="color:red;">';
      $name = format_name(mysqli_real_escape_string($connection,$_POST['name']));
      $email = strtolower(mysqli_real_escape_string($connection,$_POST['email']));
      $phone = validate_input(mysqli_real_escape_string($connection,$_POST['phone']));
      $pin = validate_input(mysqli_real_escape_string($connection,$_POST['pin']));
      $age = validate_input((mysqli_real_escape_string($connection,$_POST['age'])));
      $gender = mysqli_real_escape_string($connection,$_POST['gender']);
      $blood_group = mysqli_real_escape_string($connection,$_POST['blood_group']);
      //validate inputs
      $searchsql = "SELECT * FROM `donors` WHERE (email = '{$email}' OR phone = '{$phone}') AND (status > 0);";
      $searchres = mysqli_query($connection, $searchsql);
      $count = mysqli_num_rows($searchres);
      if(empty($name) || empty($phone) || empty($pin) || empty($email) || empty($age) || empty($blood_group)){
      	$errormsg .= "All fields are compulsory.";
        $errormsg .= "</p></div>";
      }else if(strlen($name) > 64){
      	$errormsg .= "Name cannot exceed 64 characters.";
        $errormsg .= "</p></div>";
      }else if(strpbrk($name, '1234567890!@#$%^&*()~`|\/`')){
      	$errormsg .= "Name cannot contain digits.";
        $errormsg .= "</p></div>";
      }
      else if($count != 0){
        $errormsg .= "Email or phone already registered. Try again.";
        $errormsg .= "</p></div>";
      }else if(strlen($phone) != 10 || !preg_match("/^[0-9]{3}[0-9]{3}[0-9]{4}$/", $phone)){
          $errormsg .= "Invalid phone. Try again.";
          $errormsg .= "</p></div>";
      }else if(!preg_match("/^[0-9]{6}$/", $pin)){
        $errormsg .= "Invalid pin code. Try again.";
        $errormsg .= "</p></div>";
      }else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errormsg .= "Invalid email. Try again.";
        $errormsg .= "</p></div>";
      }else if(!verify_group($blood_group)){
        $errormsg .= "Invalid blood group. Try again.";
        $errormsg .= "</p></div>";
      }else if($age < 18 || $age > 60 || !preg_match("/^[0-9]{2}$/", $age)){
        $errormsg .= "Your age does not permit you to donate blood. Kudos for trying!";
        $errormsg .= "</p></div>";
      }else if(!preg_match("/^[0-1]{1}$/", $gender)){
        $errormsg .= "Invalid gender. Try again.";
        $errormsg .= "</p></div>";
      }else{
      $errormsg = "";
      do{
      $rows = 18;
      $uniqueid = substr(strtoupper(uniqid()), 4,8);
      $search_sql = "SELECT * FROM `donors` WHERE `unique_id` = '$uniqueid'";
      $search_result = mysqli_query($connection, $search_sql);
      $rows = mysqli_num_rows($search_result);
      }while($rows != 0);
      $register_time = $_SERVER['REQUEST_TIME'];
      $register_ip = $_SERVER['REMOTE_ADDR'];
      $insertsql = "INSERT INTO `donors` (`name`, `email`, `phone`, `zip_code`, `age`, `gender`, `blood_group`, `unique_id`, `register_time`, `register_ip`) VALUES ('$name', '$email', '$phone', '$pin', '$age', '$gender', '$blood_group','$uniqueid', '$register_time', '$register_ip');";
      $result = mysqli_query($connection, $insertsql);
      if(!$result){
        die("Registration Error.". mysqli_error($connection));
      }

      // $code = generate_code($uniqueid);
      // $message = "Your confirmation code is: ".$code;
      // send_sms($phone, $message);
      // $token = create_token($uniqueid);
      send_verify_mail($email,$phone,$uniqueid);
      // $location = "location: ./verify?t=".$token;
      die("A confirmation email was sent to your email.");
      // header($location);
      }
    }
?>

<html>

<head>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="js/script.js "></script>
</head>

<body>
    <div class="landing">
        <div class="hero-title" id="type">BLOOD DENA</div>
    </div>

    <div class="form">
        <div class="form-panel one">
            <div class="form-header">
                <h1>BE A DONOR</h1>
            </div>
            <div class="form-content">
                <form action="./signup.php" method=post>
                    <div class=form-group>
                        <label>Name</label>
                        <input type=text name=name placeholder=Name>
                    </div>
                    <div class=form-group>
                        <label>Phone</label>
                        <input type=tel minlength=10 maxlength=10 name=phone placeholder="Phone Number">
                    </div>
                    <div class=form-group>
                        <label>Email</label>
                        <input type=email class=form-control name=email placeholder="Email Address">
                    </div>
                    <div class=form-group>
                        <label>Pin Code</label>
                        <input type=tel minlength=6 maxlength=6 placeholder="Pin Code" name=pin>
                    </div>
                    <div class=form-group>
                        <label>Age</label>
                        <input type=number min=18 max=60 placeholder=Age name=age>
                    </div>
                    <div class=form-group>
                        <label>Gender</label>
                        <select name=blood_group>
                                <option value>Gender</option>
                                <option value=0>Male</option>
                                <option value=1->Female</option>
                                <option value=u>Not sure ¯\_(ツ)_/¯</option>
                                </select>

                    </div>
                    <div class=form-group>
                        <label>Blood Group</label>
                        <select name=blood_group>
                        <option value>Blood Group</option>
                        <option value=A+>A+</option>
                        <option value=A->A-</option>
                        <option value=B+>B+</option>
                        <option value=B->B-</option>
                        <option value=AB+>AB+</option>
                        <option value=AB->AB-</option>
                        <option value=O+>O+</option>
                        <option value=O->O-</option>
                        <option value=x>Other</option>
                        <option value=u>Not sure ¯\_(ツ)_/¯</option>
                        </select>
                    </div>
                    <div class=form-group>
                        <p style=color:red>
                        <?php echo $errormsg;?>
                        </p>
                    </div>
                    <div class="form-group">
                        <button type=submit name=submit>Join the Network</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="marginal"></div>

            <?php include_once("./includes/analytics.php");?>
    </body>

    </html>