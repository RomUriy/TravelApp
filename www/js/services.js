(function () {
  'use strict';

  var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
    function($q, $resource, $http, FORECASTIO_KEY) {
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    var weatherResource = $resource(url, {
      callback: 'JSON_CALLBACK',
    }, {
      get: {
        method: 'JSONP'
      }
    });

    return {
      //getAtLocation: function(lat, lng) {
      getCurrentWeather: function(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK&units=si');
      }
    };
  }];

  angular.module('ToDo.services', ['ngResource'])

  .factory('DataStore', function() {
      //create datastore with default values
      var DataStore = {
          city:       '',
          latitude:   50.06465,
          longitude:  19.94498 };

      DataStore.setCity = function (value) {
         DataStore.city = value;
      };

      DataStore.setLatitude = function (value) {
         DataStore.longitude = value;
      };

      DataStore.setLongitude = function (value) {
         DataStore.longitude = value;
      };

      return DataStore;
  })
  .factory('Weather', forecastioWeather);
}());
