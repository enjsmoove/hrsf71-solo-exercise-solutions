var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()
module.exports = app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './github-fetcher.sqlite3'
  //   }
  // }
})

app.post('/repos/import', function (req, res) {
  console.log('data sent to server ie req.body', req.body)

  req.body.map(function (repo) {
    knex.insert(repo).into('repos').then(function () {})
    console.log('Formated repo saved to DB', repo)
  })

  res.json(req.body)
})

app.get('/repos', function (req, res) {
  res.send('GET send to /repos')
})

app.use(express.static(path.join(__dirname, './../client')))

var port = process.env.PORT || 4040
app.listen(port)
console.log('Listening on port ' + port)
