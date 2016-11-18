'use strict';
// Core modules
const path = require('path');
const http = require('http');
// third party modules
const express = require('express');
const logger = require('morgan');

// create instance of express
const port = process.env.PORT || 8080;
const app = express();

app.use(logger('dev'));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', html5Mode);

function html5Mode(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
}

// error handlers
app.use(notFound);
app.use(errorStatus);

function notFound(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorStatus(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({message: err.message, error: {}}));
}

const server = http
  .createServer(app)
  .listen(port, function() {
    console.log('Server running on port: ' + server.address().port);
  });
