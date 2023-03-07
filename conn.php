<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "database-1.clvgszsqmsfv.ap-southeast-1.rds.amazonaws.com"; 
$user = "admin"; 
$password = "admin123"; 
$dbname = "crops"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];
 
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
 
switch ($method) {
    case 'GET':
      $sql = "SELECT * from crops"; 
      break;
    case 'POST':
      $name = $_POST["name"];
      $description = $_POST["description"];
      $quantity = $_POST["quantity"];
      $price = $_POST["price"];
      $remark = $_POST["remark"];
 
      $sql = "INSERT INTO crops (name, description, quantity, price, remark) values ('$name', '$description', '$quantity', '$price', '$remark')"; 
      break;
}
 
// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }
 
$con->close();