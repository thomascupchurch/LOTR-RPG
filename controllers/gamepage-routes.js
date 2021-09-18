const router = require("express").Router();

router.get("/game", (req, res) => {
  res.render("game");
});

module.exports = router;
