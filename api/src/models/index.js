const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");


sequelize = new Sequelize(dbConfig.url);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;