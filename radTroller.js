angular.module('radApp', []);

angular.module('radApp').controller('radTroller',  ['$scope', '$timeout', 'radFactory', function($scope, $timeout, radFactory){

	$scope.quoteArray = radFactory;

	$scope.formToggle = false;
	$scope.thanksMessage = false;
	$scope.formButtonString = "Add a Quote!"

	$scope.showForm = function() {
		$scope.formToggle = !$scope.formToggle;

		if ($scope.formToggle === false) {
			$scope.formButtonString = "Add another Quote!"
		}
		else {
			$scope.formButtonString = "Cancel"
		}
	};

	$scope.submitForm = function() {
		var quoteEntry = {
			Quote: $scope.newQuote,
			Author: $scope.newAuthor
			// Rating: 
		}
		$scope.quoteArray.push(quoteEntry)
		$scope.newQuote = null;
		$scope.newAuthor = null;
		$scope.formToggle = !$scope.formToggle;
		$scope.formButtonString = "Add another Quote!"
		$scope.thanksMessage = true;
		$timeout(function() {
			$scope.thanksMessage = false;
		}, 1000);
		console.log($scope.quoteArray)
	}

}]);