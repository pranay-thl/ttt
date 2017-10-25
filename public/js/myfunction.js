var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope,$http) {
    $scope.n=0;
    $scope.wordlist={};
    $scope.getn = function() {
        //console.log("button click "+$scope.n);
        $http.get("/getn?n="+$scope.n)
        .then(function(response) {
            if(response.data=='error')
            {
                $("#table_").css({"display":"none","overflow-y":"auto","height":"270px","width":"700px"})
                $("#error_msg").css({"display":"block"});
            }
            else
            {
                $("#error_msg").css({"display":"none"});
                $scope.wordlist = response.data;
                $("#table_").css({"display":"block","overflow-y":"auto","height":"270px","width":"700px"})
            }
            //console.log($scope.wordlist);
        });
    };
});