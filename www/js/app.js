var app = angular.module('ToDo', ['ionic', 'ToDo.controllers'])

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('home',{
    url:'/home',
    views:{
      'tab-home':{
        controller: 'ToDoCtrl',
        templateUrl:'views/home.html'
      }
    }
  });
  $stateProvider.state('map',{
    url:'/map',
    views:{
      'tab-map':{
        controller: 'MapCtrl',
        templateUrl:'views/map.html'
      }
    }
  });
  $stateProvider.state('camera',{
    url:'/camera',
    views:{
      'tab-camera':{
        templateUrl:'views/camera.html'
      }
    }
  });
  $stateProvider.state('weather',{
    url:'/weather',
    views:{
      'tab-weather':{
        controller: 'WeatherCtrl',
        templateUrl:'views/weather.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/home');
});



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
