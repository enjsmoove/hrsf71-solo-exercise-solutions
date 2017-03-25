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

  knex('repos').insert(req.body)
  .then((data) =>{
    res.status(200).json(data);
    console.log("successfully imported repos")
  })
  .catch((err)=>{
    res.status(501);
    console.error('Error importing repos', err);
  })
});


app.get('/repos', function (req, res) {
  knex.select().table('repos')
  .orderBy('stargazers_count', 'desc')
  .limit(25)
  .then((data)=> {
    console.log("I AM GET REPOS REQUEST");
    res.status(200).send(data);
  })
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
