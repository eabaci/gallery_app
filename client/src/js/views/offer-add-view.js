const Backbone = require('backbone');
const _ = require('underscore');

const offerAddViewTemplate = require('../templates/offer-add-view.html');
const Offer = require('../models/offer');

let OfferAddView = Backbone.View.extend({
	el: '#offer-add-view',

	template: _.template(offerAddViewTemplate),

	events: {
		'click button.add': 'addOffer',
		'click button.update': 'updateOffer'
	},

	initialize: function(ops) {
		this.collection = ops.collection;
		this.router = ops.router;
	},

	render: function() {
		return this.$el.html(this.template());
	},

	update: function(ops) {
		this.model = this.collection.get(ops.id);
		this.$el.find('#imageUrl').val(this.model.get('imageUrl'));
		this.$el.find('#title').val(this.model.get('title'));
		this.$el.find('#description').val(this.model.get('description'));
		this.$el.find('#amount').val(this.model.get('amount'));

		this.$el.find('.add').hide();
		this.$el.find('.update').show();
	},

	offerSaved: function(el) {
		this.collection.add(this.model);
	},

	hide: function() {
		this.$el.hide();
	},

	show: function() {
		this.$el.show();
	},

	addOffer: function(event) {
		event.stopImmediatePropagation();

		this.model = new Offer({
			added: 1,
			amountSum: this.$el.find('#amount').val()
		});
		this.model.on('offer-saved', this.offerSaved, this);
		this.saveOffer('POST');
		this.router.navigate('list/', { trigger: true });
	},

	updateOffer: function() {
		event.stopImmediatePropagation();

		this.saveOffer('PUT');
		this.router.navigate('list/', { trigger: true });
	},

	saveOffer: function(requestType) {
		this.model.saveOffer(requestType, {
			imageUrl: this.$el.find('#imageUrl').val(),
			title: this.$el.find('#title').val(),
			description: this.$el.find('#description').val(),
			amount: this.$el.find('#amount').val()
		});
	}
});

module.exports = OfferAddView;
