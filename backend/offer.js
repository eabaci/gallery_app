// /backend/offer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// OfferSchema wird die Datenstruktur unserer Datenbank sein
const OfferSchema = new Schema(
	{
		title: String,
		description: String,
		amount: Number,
		amountSum: Number,
		added: Number,
		imageUrl: String
	},
	{ timestamps: true }
);

// Exportieren des neuen OfferSchema
module.exports = mongoose.model('Offer', OfferSchema);
