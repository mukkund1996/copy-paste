const express = require("express");

const path = require("path");
const showWelcomePage = require(path.resolve(__dirname, "..") +
  "/controllers/homepageController");

const homepageRouter = express.Router();

// Route to show welcome page for REST API webserver
homepageRouter.get("/", showWelcomePage);

module.exports = homepageRouter;
