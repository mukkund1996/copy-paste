const path = require("path");
const Item = require(path.resolve(__dirname, "..") + "/models/item");

const fetchItem = function (req, res) {
  Item.findOne(
    {
      authenticationCode: parseInt(req.params.authenticationCode),
    },
    function handleError(error, data) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else if (data === null) {
        error = new Error("Invalid authentication code");
        console.log(error);
        res.status(400).send(error.toString());
      } else {
        console.log("Item fetched successfully!");
        res.send(data);
      }
    }
  );
};

const postItem = function (req, res) {
  let item = req.body;
  const authenticationCode = Math.floor(1000 + Math.random() * 9000);
  item["authenticationCode"] = authenticationCode;
  const postedItem = new Item(item);
  postedItem.save(function handleError(error) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log("Item received and saved in DB!");
      res.status(200).send(item);
    }
  });
};

module.exports = {
  fetchItem: fetchItem,
  postItem: postItem,
};
