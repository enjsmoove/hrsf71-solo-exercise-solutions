var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
module.exports = app;

app.use( bodyParser.json() );

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res) {
  
});


app.get('/repos', function (req, res) {
  knex.select()
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
