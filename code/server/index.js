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
})

app.post('/repos/import', function (req, res) {
  console.log('reposData ie req.body', req.body)

  // let repoformatted = req.body.map(function (repo) {
  //   return {
  //     reponame: repo.name,
  //     username: repo.owner.login,
  //     stargazers: repo.stargazers_count
  //   }
  // })
  // repoformatted.map(function (repo) {
  //   knex('repos').insert(repo)
  //   console.log('Formated repo saved to DB', repo)
  // })

  // console.log('formatted repos arr', repoformatted)

  res.json(req.body)
})

app.get('/repos', function (req, res) {
  // knex.select('name')
  //   .from('repos')
  //   .where('name', '=', req.body.name)
  //   then(function(rows) {
  //     console.log(rows);
  //   })
  //   .catch(function(error) {
  //     console.error(error)
  //   });

  res.send('GET send to /repos')
})

app.use(express.static(path.join(__dirname, './../client')))

var port = process.env.PORT || 4040
app.listen(port)
console.log('Listening on port ' + port)
