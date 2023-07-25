const express = require("express");
const cors = require("cors");

const app = express();

const API_PORT = process.env.API_PORT || 8081;
const CORS_PORT = process.env.CORS_PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'localhost';

app.use(cors(CORS_ORIGIN + ':' + CORS_PORT));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./src/routes/user.routes")(app);

// set port, listen for requests
app.listen(API_PORT, () => {
  console.log(`Server is running on port : ${API_PORT}.`);
});
