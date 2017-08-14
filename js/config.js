
/* contracts app */
var contractsApp = angular.module('contractsApp', ['ngResource'])

contractsApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/main.html',
        controller: mainCtrl
      }).
      // home
      otherwise({
        redirectTo: '/home'
      });

      // Use x-www-form-urlencoded Content-Type
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
     
      // Override $http service's default transformRequest
      $httpProvider.defaults.transformRequest = [function(data) {
        var param = function(obj)
        {
          var query = '';
          var name, value, fullSubName, subName, subValue, innerObj, i;
          
          for(name in obj)
          {
            value = obj[name];
            
            if(value instanceof Array)
            {
              for(i=0; i<value.length; ++i)
              {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value instanceof Object)
            {
              for(subName in value)
              {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value !== undefined && value !== null)
            {
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
          }
          
          return query.length ? query.substr(0, query.length - 1) : query;
        };
        
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
      }];

      delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

/* Filter with diacritics support */
contractsApp.filter("localeOrderBy", [function () {
    return function (array, sortPredicate, reverseOrder) {
        if (!Array.isArray(array)) return array;
        if (!sortPredicate) return array;

        var isString = function (value) {
            return (typeof value === "string");
        };

        var isNumber = function (value) {
            return (typeof value === "number");
        };

        var isBoolean = function (value) {
            return (typeof value === "boolean");
        };

        var arrayCopy = [];
        angular.forEach(array, function (item) {
            arrayCopy.push(item);
        });

        arrayCopy.sort(function (a, b) {
            var valueA = a[sortPredicate];
            var valueB = b[sortPredicate];

            if (isString(valueA))
                return !reverseOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

            if (isNumber(valueA) || isBoolean(valueA))
                return !reverseOrder ? valueA - valueB : valueB - valueA;

            return 0;
        });

        return arrayCopy;
    }
}]);