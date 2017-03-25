# GitHub Fetcher: Fullstack Exercise

You are given a skeleton of frontend and backend code. On the frontend, you have jQuery and some html. On the backend, you have express and knex.

Your task is to fetch data from an API, store that data in a database, and display it on your app's index page.

### Takeaways

The primary purpose of this sprint is to give you the opportunity to compose together all the isolated concepts you've learned in the past few weeks.

## Getting Started

```bash
$ npm install
$ npm start
```

## Basic Requirements:

- [ X ] Fix the error that happens when you start the server (hint: google the error)

- [ ] Use [knex migrations](http://knexjs.org/#Migrations) to create a `repos` table. It should have columns for the repo's name, the owner's username, and the repo's number of stargazers.

- [ ] When a user types a github username into the text field, fetch that user's GitHub repositories from the [GitHub API](https://developer.github.com/v3/).

- [ ] Send the data you get from GitHub to your express server via a `POST` request to `/repos/import`. This endpoint should store that data in the database.

    - [ ] Ensure there are no duplicate repos. If you happen to import the same repo twice, it should only show up once in your database. See the tips section about considering unique columns.

- [ ] Write a `GET /repos` endpoint that retrieves the top 25 repos stored in your database, sorted by most stargazers

- [ ] When the page loads, you should fetch `GET /repos` and display the repo information on the page in an HTML table.

- [ ] Make each repo's name in the table link to that repo's page on GitHub.

## Extra Credit:

- After an import, update the page with the latest top 25 **without requiring a page refresh**.
  - Make sure there are no duplicates.

- After an import, display a "X new repos imported, Y repos updated" message.
  - This will require the server to send back this information in the POST response.

- When importing a repo, store the contributors for each repo as well. This will require at least one more table.

## Nightmare Mode:

Add the following additional pages, complete with navigation:

- A users page that lists all the users in your database
  - Each user's username should be a link that takes you to that user's page (see next bullet)
- A user page that displays that user's top 10 repos (in your database)
  - Each repo should be linked to its respective page on GitHub.com
  - Display a "friends list", where each friend is a contributor of any of the user's repos.

---

Do not reference any code in your past projects. Instead, use google as your primary source of information.
```
Example: "How do I create a migration in knex?"

Solution:
  1. Google the above question
  2. Prioritize official docs
    – In this case, knex docs
    - Do a search (command + f) on the docs page and search for your subject (migrations)
    - Read
  3. If official docs are too obscure, look for a stack overflow question
     (from the google page you brought up earlier)
  4. Read the question content and make sure it's relevant
  5. If you find a good answer:
    - Try to understand it conceptually
    - Apply that conceptual understanding to your problem
```

- The GitHub API endpoint you need to fetch from is a public endpoint, so you won't need any API keys (unless you make too many requests in one day. In that case you'll need to create and use a [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)).

- To avoid duplicate repos, you first must decide which column(s) you should use to determine uniqueness. Then, you can take one of the following approaches:
  - Attept to find the repo you are importing. If it exists, update. Otherwise, insert.
  - Use SQLite's `INSERT OR REPLACE` feature.
