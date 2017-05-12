(function(){
  var saveAllInfo = {
       checkInDate: "", 
       checkOutDate: "", 
       firtName: "", 
       lastName: "", 
       fullName: "", 
       numAdults:"", 
       numChildren: "", 
       eMail: "", 
       phoneNumber:"", 
       selectedroom: ""
  };
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('bookingCtrl', function($scope, $http, $state){
  $http.get('js/data.json').success(function(data){

    $scope.whichRoom = $state.params.aId;
        $scope.rooms = data;
        $scope.onlyNumbers = /^[0-9]+$/;

    $scope.myNewBooking = saveAllInfo;


   $scope.currentDate = new Date();
   $scope.copyRoom = function(room){
     $scope.myNewBooking.selectedroom = room;
   };

   $scope.getCleanApp = function(){
     document.location.href = "index.html";
   };
        
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); 
  $stateProvider
           
           .state('home',{
             url: '/home',          
             templateUrl: 'templates/home.html',
             
           })
           .state('list',{
             url: '/list',            
                 templateUrl: 'templates/list.html',
                 controller: 'bookingCtrl'
               
           })
           .state('roomDetails', {
             url: '/roomDetails:aId',
                  templateUrl: 'templates/roomDetails.html',
                  controller: 'bookingCtrl'
           })
           .state('confirmation', {
             url: '/confirmation',
                  templateUrl: 'templates/confirmation.html'
                  
           })
           .state('finalmessage',{
             url: '/finalmessage',
                  templateUrl:'templates/finalmessage.html'
           })
           $urlRouterProvider.otherwise('/home');
  });  
}());

