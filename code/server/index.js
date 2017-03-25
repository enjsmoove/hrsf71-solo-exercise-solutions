var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

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
  knex('repos').insert(req.body).then(() => {
    res.status(201).send('Posted Data')
  }).catch((err) => {
    console.error('Error Saving Data');
    res.status(501).send(err);
  });
});


app.get('/repos', function (req, res) {
  // TODO
  knex.select().table('repos')
    .orderBy('stargazers_count', 'desc')
    .limit(25)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error('Error Getting From DB');
      res.status(501).send(err);
    })
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../client/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
