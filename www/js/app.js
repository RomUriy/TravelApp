angular.module('ToDo', ['ionic'])

.run(function($ionicPlatform) {
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
})

.controller('ToDoCtrl', function( $scope, $ionicModal, $timeout ){
	
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


$ionicModal.fromTemplateUrl('views/WindowMap.html', function(WindowMap){
		$scope.taskWindowMap = WindowMap;
	},{
		scope: $scope,
		animation: 'slide-in-up'
	});

	$scope.currentTaskId = -1;

	$scope.WindowMap = function() {
		$scope.activeTask = {
			email: ''
		}
		$scope.taskWindowMap.show();
		$scope.currentTaskId = -1;
	}

	$scope.closeWindowMap = function() {
		$scope.taskWindowMap.hide();
	}



$ionicModal.fromTemplateUrl('views/Login.html', function(Login){
		$scope.taskLogin = Login;
	},{
		scope: $scope,
		animation: 'fade-in'
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
				done: task.done
			});
		} else {
			var id = $scope.currentTaskId;
			$scope.tasks[id].title = task.title;
			$scope.tasks[id].amount = task.amount;
			$scope.tasks[id].description = task.description;
			$scope.tasks[id].time = task.time;
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







