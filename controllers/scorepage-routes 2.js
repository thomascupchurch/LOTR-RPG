const router = require("express").Router();

router.get("/scores", (req, res) => {
  res.render("scorespage");
});

module.exports = router;
