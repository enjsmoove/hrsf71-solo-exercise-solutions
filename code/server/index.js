var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var cors = require('cors');

var app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(cors());

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});
knex.migrate.rollback()
  .then(() => {
    console.log("rolling back successfully");
  })
knex.migrate.latest()
  .then((a) => {
    console.log('successfully migrate', a);
  })
  .catch(err => {
    console.error('fail to migrate', err);
  })


app.use(bodyParser.json());
app.use('/', express.static(path.join('__dirname', '../client')));

app.post('/repos/import', function (req, res) {
  var username = req.body.username; //expect body is username
  var userRepoURL = 'https://api.github.com/users/' + username + '/repos'

  var options = {
    url: userRepoURL,
    headers: {
      'User-Agent': 'Solo-Excercise',
      'Authorization': 'token 3d5c1b4072d5e715b247b56d76bc3a2c43619997'
    }
  }
  request.get(options, (error, response, body) => {
    if (error) {
      console.error('fail to request user repos in /repos/import server/index.js ', error);
      return;
    }
    var repos = JSON.parse(body);
    // console.log("reqest github api results ", repos);
    repos.map(repo => {
      var repoName = repo.name;
      var repoOwner = repo.owner.login;
      var repoStargazers = repo.stargazers_count;
      var repoURL = repo.svn_url;

      // check duplicate
        // if nothing exist, add table
      // knex('repos').whereNotExists(function () {
      //   this.select('*').from('repos').where({ name: repoName })
      // })
      //   .then(() => {
      //     knex('repos').insert({
      //       name: repoName,
      //       owner: repoOwner,
      //       stargazers_count: repoStargazers,
      //       repo_url: repoURL
      //     })
      //       .then(() => {
      //         console.log('successfully insert row into database repos')
      //       })
      //       .catch(error => {
      //         console.error('Fail to insert repo into database repos', error);
      //       })
      //   })
      //   .catch(error => {
      //     console.error('')
      //   })

        // works well to insert table without check duplicate

      knex('repos').insert({
        name: repoName,
        owner: repoOwner,
        stargazers_count: repoStargazers,
        repo_url: repoURL
      })
      .then(()=>{
        console.log('successfully insert row into database repos')
      })
      .catch(error => {
        console.error('Fail to insert repo into database repos', error);
      })
    })
    res.sendStatus(201);
  });
});


app.get('/repos', function (req, res) {
  knex.select().table('repos')
    .orderBy('stargazers_count', 'desc')
    .limit(25)
    .then(repos => {
      res.send(repos);
    })
    .catch(err => {
      console.log('Fail to fetching the repos from table repos', err);
    })
});


// app.get('/', function (req, res) {
//   res.sendFile(path.join('__dirname', '../client/index.html'))
// });


var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
