var Backbone = require('backbone');
var _ = require('underscore');

const OfferView = require('./offer-view');
const offersViewTemplate = require('../templates/offer-list-view.html');

let OffersView = Backbone.View.extend({
	el: '#offer-list-view',

	template: _.template(offersViewTemplate),

	initialize: function(ops) {
		this.router = ops.router;

		this.collection.on('add', this.render, this);
		this.collection.on('remove', this.render, this);
	},

	render: function() {
		let self = this;

		self.$el.html(this.template());
		self.collection.forEach(function(model) {
			let offerView = new OfferView({
				model: model,
				router: self.router
			});
			self.$el.find('.offer-list-view').append(offerView.$el);
		});

		return;
	},

	hide: function() {
		this.$el.hide();
	},

	show: function() {
		this.$el.show();
	}
});

module.exports = OffersView;
