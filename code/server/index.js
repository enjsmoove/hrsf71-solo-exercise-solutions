var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

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
  // TODO
})

app.get('/repos', function (req, res) {
  // TODO
})

app.use(express.static(path.join(__dirname, './../client')))

var port = process.env.PORT || 4040
app.listen(port)
console.log('Listening on port ' + port)

// Replaced by express.static for '/'
// app.get('/', function (req, res) {
//   res.render(__dirname + './../client/index.html')
// })
