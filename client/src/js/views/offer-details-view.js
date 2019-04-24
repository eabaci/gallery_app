const Backbone = require('backbone');
const _ = require('underscore');

const offerDetailsViewTemplate = require('../templates/offer-details-view.html');

let OfferDetailsView = Backbone.View.extend({
	el: '#offer-details-view',

	template: _.template(offerDetailsViewTemplate),

	events: {
		'click .back': 'backToList',
		'click .delete': 'deleteOffer',
		'click .update': 'updateOffer'
	},

	initialize: function(ops) {
		this.router = ops.router;
		this.collection = ops.collection;
	},

	update: function(ops) {
		this.model = ops.model;
		this.model.on('change', this.render, this);
	},

	render: function() {
		return this.$el.html(this.template(this.model.toJSON()));
	},

	hide: function() {
		this.$el.hide();
	},

	show: function() {
		this.$el.show();
	},

	backToList: function(event) {
		event.stopImmediatePropagation();
		this.model.off('change', this.render);
		this.router.navigate('list/', { trigger: true });
	},

	deleteOffer: function(event) {
		event.stopImmediatePropagation();
		let self = this;
		console.log(self.model);
		self.model.off('change', this.render);

		self.model.destroy({
			success: function(model, response) {
				console.log(model);
				self.collection.remove([model]);
			}
		});

		self.router.navigate('list/', { trigger: true });
	},

	updateOffer: function(event) {
		event.stopImmediatePropagation();
		this.model.off('change', this.render);
		this.router.navigate('update/' + this.model.get('_id'), {
			trigger: true
		});
	}
});

module.exports = OfferDetailsView;
