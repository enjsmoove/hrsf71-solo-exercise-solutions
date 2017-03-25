var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var axios = require('axios')

var app = express()
module.exports = app

app.use(bodyParser.json())

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
})

app.post('/repos/import', function (req, res) {
  res.json({'win': 'win'})
})

app.get('/repos', function (req, res) {
  res.send('GET send to /repos')
})

app.use(express.static(path.join(__dirname, './../client')))

var port = process.env.PORT || 4040
app.listen(port)
console.log('Listening on port ' + port)
