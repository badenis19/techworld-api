const express = require("express");
const graphqlHTTP = require('express-graphql');
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require('./schema/schema')
require("dotenv/config");

const port = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000", // restrict calls to those this address
    origin: "https://techworld-client.herokuapp.com/graphql", // restrict calls to those this address
    methods: "GET" // only allow GET requests
  })
);

mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to mongodb 🥭")
);

// for graphiql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port, () =>
  console.log(`listening to port`, process.env.PORT)
);
