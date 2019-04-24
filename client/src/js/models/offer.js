var Backbone = require('backbone');

var Offer = Backbone.Model.extend({
	idAttribute: '_id',

	urlRoot: 'http://localhost:8080/api/getOffer',

	increment: function() {
		let addedCount = this.get('added');
		addedCount++;

		this.set('added', addedCount);
		this.updateAmountSum(addedCount);

		this.save();
	},

	decrement: function() {
		let addedCount = this.get('added');
		addedCount--;

		this.set('added', addedCount);
		this.updateAmountSum(addedCount);

		this.save();
	},

	updateAmountSum: function(addedCount) {
		let amountNumber = this.get('amount');
		let amountSum = amountNumber * addedCount;
		this.set('amountSum', amountSum);
	},

	saveOffer: function(requestType, offer) {
		let self = this;

		self.set('imageUrl', offer.imageUrl);
		self.set('title', offer.title);
		self.set('description', offer.description);
		self.set('amount', offer.amount);
		self.updateAmountSum(self.get('added'));

		self.save(null, {
			type: requestType,
			success: function(model, response) {
				if (requestType == 'POST') {
					self.set('_id', response.data._id);
					self.trigger('offer-saved');
				}
			}
		});
	}
});

module.exports = Offer;
