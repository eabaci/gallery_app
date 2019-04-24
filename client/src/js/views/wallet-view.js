const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');

const WalletItemView = require('./wallet-item-view');
const walletViewTemplate = require('../templates/wallet-view.html');

let WalletView = Backbone.View.extend({
	el: '#wallet-view',

	template: _.template(walletViewTemplate),

	events: { 'click .add': 'addNewOffer' },

	initialize: function(ops) {
		this.router = ops.router;
		this.render();

		this.collection.on('add', this.render, this);
		this.collection.on('remove', this.render, this);
	},

	render: function() {
		let self = this;
		self.$el.html(this.template());
		self.collection.each(function(model) {
			let walletItemView = new WalletItemView({
				model: model
			});
			self.$el.find('ul').append(walletItemView.$el);
		});

		return self.$el;
	},

	addNewOffer: function(event) {
		event.stopImmediatePropagation();
		this.router.navigate('add/', { trigger: true });
	}
});

module.exports = WalletView;
