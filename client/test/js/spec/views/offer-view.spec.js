var $ = require('jquery');
var _ = require('underscore');
var sinon = require('sinon/lib/sinon');
var assert = require('assert');
var OfferView = require('../../../../src/js/views/offer-view');
var Offer = require('../../../../src/js/models/offer');

describe('Offer View', function() {
	var offer;
	var offerView;
	beforeEach(function() {
		offer = new Offer({
			imageUrl: 'test',
			title: 'test',
			description: 'test'
		});
		offerView = new OfferView({ model: offer });
	});
	before(function() {});
	afterEach(function() {});
	after(function() {});
	it('initialize', function() {
		expect(offerView).to.be.ok;
	});
	it('render', function() {
		console.log(offerView.render().$el);
	});
});
