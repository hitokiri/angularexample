var app = angular.module('myApp', []);
app.controller('productsCtrl', function($scope, $http) {
    $scope.id = "";
    $scope.name = "hjhjh";
    $scope.description = "";
    $scope.price = "";
// clear variable / form values
$scope.clearForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
}

$scope.showCreateForm = function(){
    // clear form
    $scope.clearForm();
     
    // change modal title
    $('#modal-product-title').text("Create New Product");
     
    //// hide update product button
    //$('#btn-update-product').hide();
    //
    //// show create product button
    //$('#btn-create-product').show();

    $('#modal-product-form').openModal();
     
}

// create new product 
$scope.createProduct = function(){


    // fields in key-value pairs
    $http.post('http://localhost/crud/create_product.php', {
            'name' : $scope.name, 
            'description' : $scope.description, 
            'price' : $scope.price
        }
    ).success(function (data, status, headers, config) {
        console.log(data);
        // tell the user new product was created
        Materialize.toast(data, 4000);
                 
        // close modal
        $('#modal-product-form').closeModal();
         
        // clear modal content
        $scope.clearForm();
         
        // refresh the list
        $scope.getAll();
    });
}



// read products
$scope.getAll = function(){
    $http.get("http://localhost/crud/read_products.php")
    
    .success(function(response){
       $scope.names = response.records;
       console.log(response) 
    });
}

// retrieve record to fill out the form
$scope.readOne = function(id){
     
    // change modal title
    $('#modal-product-title').text("Edit Product");
     
    // show udpate product button
    $('#btn-update-product').show();
     
    // show create product button
    $('#btn-create-product').hide();
    var data= JSON.stringify({
        'id' : id 
    })
    // post id of product to be edited
    $http.post('http://localhost/crud/read_one.php',data )
    .success(function(data, status, headers, config){
         console.log(data[0]["name"])
        // put the values in form
        $scope.id = data[0]["id"];
        $scope.name = data[0]["name"];
        $scope.description = data[0]["description"];
        $scope.price = data[0]["price"];
         
        // show modal
        $('#modal-product-form').openModal();
    })
    .error(function(data, status, headers, config){
        Materialize.toast('Unable to retrieve record.', 4000);
    });
}


});

// jquery codes will be here


