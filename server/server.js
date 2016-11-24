const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../game')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../game/index.html'));
});

// error handlers
app.use(notFound);
app.use(errorStatus);

function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorStatus(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {},
  }));
}

const server = http
  .createServer(app)
  .listen(port, () => {
    console.log(`Server running on port: ${server.address().port}`);
  });
