angular.module('radApp', ['ngAnimate']);

angular.module('radApp').controller('radTroller',  ['$scope', '$timeout', 'radFactory', function($scope, $timeout, radFactory){

	$scope.quoteArray = radFactory.quoteArray;
	$scope.formToggle = false;
	$scope.thanksMessage = false;
	$scope.formButtonString = "Add a Quote!"

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Star Populate
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

$scope.starPopulate = function(index) {

	$scope.quoteArray[index].ratingArray = [];
	for (var i = 0; i<$scope.quoteArray[index].rating; i++) {
		$scope.quoteArray[index].ratingArray.push(i);
	}
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Quote Sort
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.sortByRating = function() {

		$scope.quoteArray.sort(function(a, b){
			if (a.rating > b.rating) {
				return -1;
			}
			if (a.rating < b.rating) {
				return 1;
			}
			return 0;
		});
	}

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
			$scope.requiredMessage = false;
		}
	};

	$scope.submitForm = function() {
		if ( $scope.newQuote === null || $scope.newAuthor=== null) {
			$scope.requiredMessage = true;
		}
		else {
			new radFactory.Quote($scope.newQuote, $scope.newAuthor, $scope.newRating);
				// console.log($scope.newQuote, $scope.newAuthor);
			$scope.newQuote = null;
			$scope.newAuthor = null;
			$scope.formToggle = !$scope.formToggle;
			$scope.formButtonString = "Add another Quote!"
			$scope.thanksMessage = true;
			$scope.requiredMessage = false;
			$scope.sortByRating();
			$timeout(function() {
				$scope.thanksMessage = false;
			}, 2000);
				console.log($scope.quoteArray)
		}
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
		if ($scope.quoteArray[index].quote === '' && $scope.quoteArray[index].author==='') {
			$scope.quoteArray.splice(index, 1);
		}
		else {
			$scope.quoteArray[index].editValue = false;
			$scope.starPopulate(index);
			$scope.sortByRating();
		}

	};

	$scope.cancelEdit = function(index, event) {
		event.stopPropagation();
		$scope.quoteArray[index].editValue = false;
		$scope.quoteArray[index].quote  = tempQuoteStore;
		$scope.quoteArray[index].author = tempAuthorStore;
	};

	$scope.submitEditKey = function(index, event) {
		if (event.which === 13) {
    		$scope.submitEdit(index, event);
    		event.preventDefault();
    		$scope.sortByRating();
		};
	};

	$scope.deleteQuote = function(index, event) {
		$scope.quoteArray.splice(index,1);
	}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Filtering
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.filterAuthor = function(index) {
		$scope.searchText = $scope.quoteArray[index].author;
	}

	$scope.searchClear = function() {
		$scope.searchText = '';
	}

}]);

