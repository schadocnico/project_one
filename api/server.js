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

// Fonction récursive pour tenter de se connecter à la base de données toutes les 5 secondes
function tryDatabaseConnection() {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database.");
      startServer(); // Si la connexion réussit, lancez le serveur Express
    })
    .catch((err) => {
      console.error("Failed to connect to the database: " + err.message);
      setTimeout(tryDatabaseConnection, 5000); // Nouvelle tentative après 5 secondes
    });
}

// Démarrer le serveur Express
function startServer() {
  db.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
      // simple route
      app.get("/", (req, res) => {
        res.json({ message: "Welcome to my application." });
      });
      
      require("./src/routes/user.routes")(app);
      
      // set port, listen for requests
      app.listen(API_PORT, () => {
        console.log(`Server is running on port : ${API_PORT}.`);
      });
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
}

// Démarrer la tentative de connexion à la base de données
tryDatabaseConnection();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
