angular.module('radApp').factory('radFactory', [function(radFactory){

	var quoteArray = [];

	var Quote = function(quote, author) {
		this.quote = quote;
		this.author = author;
		this.editValue = false;
		this.quoteEdit = null;
		this.authorEdit = null;
		quoteArray.push(this);
	};

	new Quote("The sky was the color of television, tuned to a dead channel.", 'William Gibson');
	new Quote("I choose my friends for their good looks, my acquaintances for their good characters, and my enemies for their good intellects.", 'Oscar Wilde');

	return {
		Quote      : Quote,
		quoteArray : quoteArray
	};

}]);