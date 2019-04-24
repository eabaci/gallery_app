const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');
const offerViewTemplate = require('../templates/offer-view.html');

let OfferView = Backbone.View.extend({
	events: { 'click img': 'onClick' },

	initialize: function(ops) {
		this.router = ops.router;
		this.render();

		this.model.on('change', this.render, this);
	},

	template: _.template(offerViewTemplate),

	render: function() {
		return this.$el.html(this.template(this.model.toJSON()));
	},

	onClick: function(event) {
		event.stopImmediatePropagation();
		this.model.off('change', this.render);
		this.router.navigate('detail/' + this.model.get('_id'), {
			trigger: true
		});
	}
});

module.exports = OfferView;
