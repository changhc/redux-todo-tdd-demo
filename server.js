var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxy = require('proxy-middleware');
var config = require('./webpack.config');

const API_PORT = 8080;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', proxy('http://localhost:' + API_PORT + '/api'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
