const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const Offer = require('./offer');

const API_PORT = 8080;
const app = express();
const router = express.Router();

// MongoDB-Datenbank
const dbRoute = 'mongodb://localhost:27017/gallery';

// verbindet unseren Backend-Code mit der Datenbank
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// prüft, ob die Verbindung zur Datenbank erfolgreich ist
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) nur für das Logging und
// bodyParser, parst den Request-Body in ein lesbares Json-Format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Die get Methode
// Diese Methode ruft alle verfügbaren Daten in unserer Datenbank ab
router.get('/getOffer', async (req, res) => {
	Offer.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json(data);
	});
});

// Die update Methode
// Diese Methode überschreibt vorhandene Daten in unserer Datenbank
router.put('/getOffer/:id', (req, res) => {
	const id = req.params.id;
	const { title, description, imageUrl, added, amount, amountSum } = req.body;
	console.log(req.body);
	Offer.findByIdAndUpdate(
		id,
		{ title, description, imageUrl, added, amount, amountSum },
		err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		}
	);
});

// Die delete Methode
// Diese Methode entfernt vorhandene Daten in unserer Datenbank
router.delete('/getOffer/:id', (req, res) => {
	let id = req.params.id;
	Offer.findByIdAndDelete(id, err => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// Die create Methode
// Diese Methode fügt neue Daten in unsere Datenbank ein
router.post('/getOffer/', (req, res) => {
	let offer = new Offer();
	const { title, description, imageUrl, added, amount, amountSum } = req.body;
	if (!description || !imageUrl || !title) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}
	offer.imageUrl = imageUrl;
	offer.description = description;
	offer.title = title;
	offer.added = added;
	offer.amount = amount;
	offer.amountSum = amountSum;

	offer.save((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// Fügen Sie /api für unsere http-Anfragen hinzu
app.use('/api', router);

// Startet das Backend in diesem PORT
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
