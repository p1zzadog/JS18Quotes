angular.module('radApp', ['ngAnimate']);

angular.module('radApp').controller('radTroller',  ['$scope', '$timeout', 'radFactory', function($scope, $timeout, radFactory){

	$scope.quoteArray = radFactory.quoteArray;
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
		new radFactory.Quote($scope.newQuote, $scope.newAuthor);
			console.log($scope.newQuote, $scope.newAuthor);
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

	var tempQuoteStore  = null;
	var tempAuthorStore = null;

	$scope.editQuote = function(index) {
		$scope.quoteArray[index].editValue = true;
		tempQuoteStore  = $scope.quoteArray[index].quote;
		tempAuthorStore = $scope.quoteArray[index].author;
	};

	$scope.submitEdit = function(index, event) {
		event.stopPropagation();
		$scope.quoteArray[index].editValue = false;
	};

	$scope.cancelEdit = function(index, event) {
		event.stopPropagation();
		$scope.quoteArray[index].editValue = false;
		$scope.quoteArray[index].quote  = tempQuoteStore;
		$scope.quoteArray[index].author = tempAuthorStore;
	};

}]);