module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", users.findAll);

    // Create a new Tutorial
    router.post("/", users.create);

    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    app.use('/api/users', router);
  };