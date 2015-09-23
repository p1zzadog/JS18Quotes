angular.module('radApp', []);

angular.module('radApp').controller('radTroller',  ['$scope', '$timeout', 'radFactory', function($scope, $timeout, radFactory){

	$scope.quoteArray = radFactory;

	$scope.formToggle = false;
	$scope.thanksMessage = false;
	$scope.formButtonString = "Add a Quote!"

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// new quote submit
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.showForm = function() {
		$scope.formToggle = !$scope.formToggle;

		if ($scope.formToggle === false) {
			$scope.formButtonString = "Add another Quote!"
		}
		else {
			$scope.formButtonString = "Cancel"
			$scope.newQuote = null;
			$scope.newAuthor = null;
		}
	};

	$scope.submitForm = function() {
		var quoteEntry = {
			quote  : $scope.newQuote,
			author : $scope.newAuthor
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
		// console.log($scope.quoteArray)
	}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Existing Quote Edit
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.editQuote = function(index) {
		$scope.quoteArray[index].editValue = true;
	};

	$scope.submitEdit = function(index) {
		$scope.quoteArray[index].quote = $scope.quoteEdit;
		$scope.quoteArray[index].author = $scope.authorEdit;
		$scope.quoteArray[index].editValue = false;
		console.log($scope.quoteArray[index])
	};

	$scope.cancelEdit = function(index) {
		$scope.quoteArray[index].editValue = false;
	};

}]);