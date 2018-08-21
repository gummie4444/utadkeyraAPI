# Út að keyra API

Client code a carpooling website for Iceland here is the API code

## How to use

### Installing

#### Mysql

You will need to be running a mysql database and update the configurations in the `database.json` file

#### Npm install

```bash
npm run setup
```

This will create the relevant tables in the db and add some mock data

### Running dev

```bash
npm run start
```

This is using GraphiQL a browser where you can test your GraphQL queries and mutations

### Running prod

```bash
npm run start:prod
```

## About the project

API built with Node, GraphQL, Express, Sequelize (MySQL) and JWT Auth

Written in ES6+ using Babel + Webpack

GraphQL schema with associations
User authentication using JSON Web Tokens with GraphQL API
File upload feature with GraphQL

### Scraper

There is a scraper scraping samferda.is to get their data into ours

### Optional

IF using .vscode I included dev setup that has debug option enabled so you just press F5 and you run the server in dev/debug mode

Then open `http://localhost:8000/` to see the sandbox for graphql
