const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');

const Router = require('../routers/router');
const Offers = require('../collections/offers');
const Offer = require('../models/offer');
const WalletView = require('./wallet-view');

let AppView = Backbone.View.extend({
	el: '#app-view',

	initialize: function() {
		let offers = new Offers();
		offers.fetch({
			success: function(collection, response) {
				let router = new Router({ collection: collection });
				let walletView = new WalletView({
					collection: collection,
					router: router
				});
				Backbone.history.start();
			},
			error: function(collection, response) {
				throw new Error('Books fetch error');
			}
		});
	}
});

module.exports = AppView;
