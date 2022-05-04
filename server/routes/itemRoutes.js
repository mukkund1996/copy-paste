const path = require("path");
const express = require("express");

const itemRouter = express.Router();
const itemRoutes = require(path.resolve(__dirname, "..") +
  "/controllers/itemController");
const postItem = itemRoutes["postItem"];
const fetchItem = itemRoutes["fetchItem"];

// Route to post an item
itemRouter.post("/item", postItem);

// Route to fetch the copied item
itemRouter.get("/authenticationCode/:authenticationCode", fetchItem);

module.exports = itemRouter;
