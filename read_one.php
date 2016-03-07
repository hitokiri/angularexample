<?php 
// include database and object files
include_once 'config/database.php';
include_once 'objects/product.php';
$database = new Database();
$db = $database; 
// instantiate product object
$product = new Product($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input")); 
 
// set product property values
$product->id = $data->id;

// read the details of product to be edited
$product->readOne();
 
// create array
$product_arr[] = array(
    "id" =>  $product->id,
    "name" => $product->name,
    "description" => $product->description,
    "price" => $product->price
);
 
// make it json format
print_r(json_encode($product_arr));
?>
