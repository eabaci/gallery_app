const Backbone = require('backbone');
const _ = require('underscore');

const walletItemTemplate = require('../templates/wallet-item.html');

let WalletItemView = Backbone.View.extend({
	template: _.template(walletItemTemplate),

	events: {
		'click li .add': 'incrementAddedCount',
		'click li .remove': 'decrementAddedCount'
	},

	initialize: function() {
		this.render();

		this.model.on('change', this.render, this);
	},

	render: function() {
		return this.$el.html(this.template(this.model.toJSON()));
	},

	incrementAddedCount: function() {
		this.model.increment();
	},

	decrementAddedCount: function() {
		this.model.decrement();
	}
});

module.exports = WalletItemView;
