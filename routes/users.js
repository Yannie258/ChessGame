const config = require("../config");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get(config.pages.users.index, function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
