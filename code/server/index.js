const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
module.exports = app;

app.use(bodyParser.json());

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3',
  },
});

app.post('/repos/import', (req, res) => {
  const user = req.body.name;
  fetch('https://api.github.com/users/' + user + '/repos')
    .then((repoList) => {
      return repoList.json();
    }).then((json) => {
      json.forEach((repoData) => {
        knex('repos').insert([{
          name: repoData.name,
          owner: repoData.owner.login,
          stargazers_count: repoData.stargazers_count,
          url: repoData.html_url,
        }])
        .then(() => {
          console.log('successfully added another repo!');
        })
        .catch((err) => {
          console.error(err);
        });
      });
      res.sendStatus(201);
    });
});


app.get('/repos', (req, res) => {
  knex.select().table('repos').orderBy('stargazers_count', 'desc').limit(25)
  .then((repos) => {
    res.send(repos);
  })
  .catch((err) => {
    console.error(err);
  });
});

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
