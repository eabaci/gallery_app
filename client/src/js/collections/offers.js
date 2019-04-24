var Offer = require('../models/offer');
var Backbone = require('backbone');

var Offers = Backbone.Collection.extend({
	model: Offer,
	url: 'http://localhost:8080/api/getOffer'
});

module.exports = Offers;
