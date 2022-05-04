const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const homepageRouter = require("./routes/homepageRoutes");
const itemRouter = require("./routes/itemRoutes");

const config = require(__dirname + "/config/db");
const appPort = config["appPort"];
const uri = config["uri"];

// Connect to MongoDB database
async function main() {
  await mongoose.connect(uri).then(function connect() {
    const app = express();
    app.use(
      express.json({
        type: ["application/json", "text/plain"],
      })
    );
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.use("/", homepageRouter);
    app.use("/api/v1", itemRouter);
    app.listen(appPort, () => {
      console.log(`Server started on port ${appPort}.`);
    });
  });
}

main().catch((err) => console.log(err));
