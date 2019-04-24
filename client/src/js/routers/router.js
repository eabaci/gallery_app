const Backbone = require('backbone');

const OfferDetailsView = require('../views/offer-details-view');
const OfferAddView = require('../views/offer-add-view');
const OffersView = require('../views/offer-list-view');

let Routes = Backbone.Router.extend({
	routes: {
		'list/': 'listView',
		'add/': 'addOfferView',
		'detail/:id': 'detailsView',
		'update/:id': 'updateOfferView'
	},

	initialize: function(ops) {
		this.collection = ops.collection;
		this.offersView = new OffersView({
			collection: this.collection,
			router: this
		});
		this.offerDetailsView = new OfferDetailsView({
			collection: this.collection,
			router: this
		});
		this.offerAddView = new OfferAddView({
			collection: this.collection,
			router: this
		});
	},

	detailsView: function(id) {
		let offerModel = this.collection.get(id);
		this.offersView.hide();
		this.offerAddView.hide();
		this.offerDetailsView.show();
		this.offerDetailsView.update({ model: offerModel });
		this.offerDetailsView.render();
	},

	listView: function() {
		this.offerDetailsView.hide();
		this.offerAddView.hide();
		this.offersView.show();
		this.offersView.render();
	},

	addOfferView: function() {
		this.offerDetailsView.hide();
		this.offersView.hide();
		this.offerAddView.show();
		this.offerAddView.render();
	},

	updateOfferView: function(id) {
		this.offerDetailsView.hide();
		this.offersView.hide();
		this.offerAddView.show();
		this.offerAddView.render();
		this.offerAddView.update({ id: id });
	}
});

module.exports = Routes;
