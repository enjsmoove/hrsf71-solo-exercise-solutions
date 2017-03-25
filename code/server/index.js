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



app.get('/allrepos', function(req, res){
  knex.select().table('repos').orderBy('stargazers_count', 'desc').then(function(data){
    res.send(data)
  })
})

app.get('/repos', function (req, res) {
  // My "POST" Request. it stores the repos from a certain username that was fetched. 
  knex.select().table('repos').then(function(data){
    console.log('this is the database ', data)
  })  
  var repos = req.query.json;
    Promise.all(
      repos.map(function(repo){
        return knex.select('name').from('repos').where('name', '=', repo.name).then(function(rows){
          console.log('does this fire?  ', rows, 'following data ')
          if(rows.length !== 1) {
          return knex('repos').insert({name: repo.name, owner: repo.owner.login, stargazers_count: repo.stargazers_count, url: repo.html_url}).then(function(){
              console.log('No other repo exist in database ' + repo.name + ' has been added!')
            });
          } else {
           return  knex('repos').where('name', '=', repo.name).andWhere('owner', '=', repo.owner.login).update({name: repo.name, owner: repo.owner.login, stargazers_count: Math.floor(Math.random()*100), url: repo.html_url}).then(function(){
              console.log(repo.name + ' already exists and has been updated!')
            })
          }
        })
      })
    ).then(function(){
      return knex.select().table('repos').orderBy('stargazers_count', "desc").limit(25).then(function(data){
        res.send(data);   
      })
    })
});

// app.get('/getTopRepos', function(req, res){
//       knex.select().table('repos').where('owner' , '=', repos[0].owner.login).orderBy('stargazers_count', "desc").limit(5).then(function(data){
//         res.send(data);   
//       })
// })

app.use(express.static('./client')).get('*', function (req, res) {
  res.sendFile('./client/index.html')
});


var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
