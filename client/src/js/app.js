import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const Backbone = require('backbone');

const AppView = require('./views/app-view');

Backbone.$(function() {
	let appView = new AppView({});
});
