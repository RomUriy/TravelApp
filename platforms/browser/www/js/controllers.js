var todo = angular.module('ToDo.controllers', ['ionic'])


todo.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
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

todo.controller('WeatherCtrl', function($scope, $ionicLoading, $compile) {

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    });
  } else {
    loadWeather("Kolkata, IN", "");
  }

  $(document).ready(function() {
    setInterval(getWeather, 10000);
  });

  function loadWeather(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: function(weather) {
        city = weather.city;
        temp = weather.temp+'&deg';
        wcode = '<img class="weathericon" src="./img/weathericons/' + weather.code
        + '.svg">';
        wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed +
        '</p>';
        humidity = weather.humidity + ' %';

        $(".location").text(city);
        $(".temperature").html(temp);
        $(".climate_bg").html(wcode);
        $(".windspeed").html(wind);
        $(".humidity").text(humidity);
      },

      error: function(error) {
        $(".error").html('<p>' + error + '</p>');
      }
    });
  }
});



app.controller('ToDoCtrl', function( $scope, $ionicModal, $timeout ){

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



  $ionicModal.fromTemplateUrl('views/Login.html', function(Login){
    $scope.taskLogin = Login;
  },{
    scope: $scope,
    animation: 'slide-in-left'
  });

  $scope.currentTaskId = -1;

  $scope.Login = function() {
    $scope.activeTask = {
      login: '',
      password: ''
    }
    $scope.taskLogin.show();
    $scope.currentTaskId = -1;
  }

  $scope.closeLogin = function() {
    $scope.taskLogin.hide();
  }




  $ionicModal.fromTemplateUrl('views/NewAccount.html', function(NewAccount){
    $scope.taskNewAccount = NewAccount;
  },{
    scope: $scope,
    animation: 'slide-in-left'
  });

  $scope.currentTaskId = -1;

  $scope.NewAccount = function() {
    $scope.activeTask = {
      name: '',
      surname: '',
      email: '',
      password: ''
    }
    $scope.taskNewAccount.show();
    $scope.currentTaskId = -1;
  }

  $scope.closeNewAccount = function() {
    $scope.taskNewAccount.hide();
  }




  $ionicModal.fromTemplateUrl('views/ForgotPassword.html', function(ForgotPassword){
    $scope.taskForgotPassword = ForgotPassword;
  },{
    scope: $scope,
    animation: 'slide-in-left'
  });

  $scope.currentTaskId = -1;

  $scope.ForgotPassword = function() {
    $scope.activeTask = {
      email: ''
    }
    $scope.taskForgotPassword.show();
    $scope.currentTaskId = -1;
  }

  $scope.closeForgotPassword = function() {
    $scope.taskForgotPassword.hide();
  }





  $ionicModal.fromTemplateUrl('views/task.html', function(modal){
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
