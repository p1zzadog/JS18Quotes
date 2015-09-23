angular.module('radApp').factory('radFactory', [function(radFactory){

	var quoteArray = [];

	var Quote = function(quote, author, rating) {
		this.quote = quote;
		this.author = author;
		this.rating = rating;
		this.ratingArray = [];
		this.editValue = false;		
		quoteArray.push(this);
	};

	new Quote("The sky was the color of television, tuned to a dead channel.", 'William Gibson', 2);
	new Quote("I choose my friends for their good looks, my acquaintances for their good characters, and my enemies for their good intellects.", 'Oscar Wilde', 3);
	new Quote("The books that the world calls immoral are books that show the world its own shame.", 'Oscar Wilde', 1)

	return {
		Quote      : Quote,
		quoteArray : quoteArray
	};

}]);