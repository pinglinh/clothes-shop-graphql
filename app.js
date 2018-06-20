const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// mongoose.connect(
//   "mongodb://pinglinh:pinglinh@ds217560.mlab.com:17560/graphql-net-ninja"
// );
// mongoose.connection.once("open", () => {
//   console.log("Connected to database");
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Now listening for request on port 4000");
});
