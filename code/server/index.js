var express = require('express');
var bodyParser = require('body-parser');
var GitHub = require('github-api');



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
  // TODO
});


app.get('/repos', function (req, res) {
  // TODO
  console.log(req.query)

});


app.use(express.static('./client')).get('*', function (req, res) {
  res.sendFile('./client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
