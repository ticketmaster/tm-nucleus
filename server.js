'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var helpers = require('./lib/helpers');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/page-config.json');

var app = express();

var handlebars = exphbs.create({
  defaultLayout: 'main',
  extname: '.html',
  layoutsDir: 'public/templates',
  partialsDir: 'public/partials',
  helpers: helpers
});

app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.set('views', 'public');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.render('index', {config: config});
});

app.get('/event-header.html', function(req, res) {
  res.render('event-header', {layout: 'full-page', config: config});
})

app.get('/cobrand-header.html', function(req, res) {
  res.render('cobrand-header', {layout: 'full-page', config: config});
})

app.get('/cart.html', function(req, res) {
  res.render('cart', {layout: 'full-page', config: config});
})

app.get('/modal-dialog.html', function(req, res) {
  res.render('modal-dialog', {layout: 'full-page', config: config});
})

app.get('/modal-dialog-footer.html', function(req, res) {
  res.render('modal-dialog-footer', {layout: 'full-page', config: config});
})

app.get('/modal-dialog-back-button.html', function(req, res) {
  res.render('modal-dialog-back-button', {layout: 'full-page', config: config});
})

app.get('/*.html', function(req, res) {
  res.render(req.params[0], {config: config});
});

app.use(express.static('public'));

// app.listen(3000);

module.exports = app;
