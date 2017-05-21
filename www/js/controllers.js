angular.module('ToDo.controllers', ['ionic'])


.constant('FORECASTIO_KEY', '0d5c4b57462add1f12907511d2e9b510')
.controller('WeatherCtrl', function($scope,$state,Weather,DataStore) {
  //read default settings into scope
  console.log('inside weather');
  $scope.city  = DataStore.city;
  var latitude  = DataStore.latitude;
  var longitude = DataStore.longitude;

  //call getCurrentWeather method in factory ‘Weather’
  Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
    $scope.current = resp.data;
    console.log('GOT CURRENT', $scope.current);
    //debugger;
  }, function(error) {
    alert('Unable to get current conditions');
    console.error(error);
  });
})



.controller('HomeCtrl', function( $scope, $ionicModal, $timeout ){

  if ( ! angular.isUndefined( window.localStorage['tasks'] ) ){
    $scope.tasks = JSON.parse( window.localStorage['tasks'] );
  } else {
    $scope.tasks = [
      { title: 'Купить чайник', description: 'Нужно обязательно купить синий', done: false },
      { title: 'Выучить ангулар',	description: 'Есть еще парочка книг, которые стоит прочесть', done: true },
      { title: 'Сходить в кино', description: 'Говорят последний фильм про ночных снайперов очень хорошо', done: false },
      { title: 'Слетать в Амстердам', description: 'В это время года Амстердам особенно хорош', done: false }
    ];
  }

  function logOut() {
    window.location.href='index.html';
  }
  document.getElementById('log_out').addEventListener('click', logOut, false);




  $ionicModal.fromTemplateUrl('templates/task.html', function(modal){
    $scope.taskModal = modal;
  },{
    scope: $scope,
    animation: 'slide-in-right'
  });

  $scope.currentTaskId = -1;

  $scope.addNewTask = function() {
    $scope.activeTask = {
      title: '',
      amount: '',
      description: '',
      time: '',
      file: '',
      done: false
    }
    $scope.taskModal.show();
    $scope.currentTaskId = -1;
  }

  $scope.closeTask = function() {
    $scope.taskModal.hide();
  }

  $scope.openTask = function( id ){
    var task = $scope.tasks[id];
    $scope.activeTask = {
      title: task.title,
      amount: task.amount,
      description: task.description,
      time: task.time,
      file: task.file,
      done: task.done
    }
    $scope.currentTaskId = id;
    $scope.taskModal.show();
  }

  $scope.deleteTask = function( id ) {
    $scope.tasks.splice( id, 1 );
    saveItems();
  }

  $scope.submitTask = function( task ) {
    if( $scope.currentTaskId == -1 ){
      $scope.tasks.push({
        title: task.title,
        amount: task.amount,
        description: task.description,
        time: task.time,
        file: task.file,
        done: task.done
      });
    } else {
      var id = $scope.currentTaskId;
      $scope.tasks[id].title = task.title;
      $scope.tasks[id].amount = task.amount;
      $scope.tasks[id].description = task.description;
      $scope.tasks[id].time = task.time;
      $scope.tasks[id].file = task.file;
      $scope.tasks[id].done = task.done;
    }

    saveItems();

    $scope.taskModal.hide();
  }

  $scope.saveTasks = function() {
    $timeout(function(){
      saveItems();
    });
  }

  function saveItems() {
    window.localStorage['tasks'] = angular.toJson( $scope.tasks );
  }
})



.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  var myLatLng;
  function initialize() {


    navigator.geolocation.getCurrentPosition(function(position) {
      myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      var mapOptions = {
        center: myLatLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Pos'
      });

      $scope.map = map;
    });
  }

  ionic.Platform.ready(initialize)
});
