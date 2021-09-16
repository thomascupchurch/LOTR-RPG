const router = require("express").Router();

router.get("/character", (req, res) => {
  res.render("characterpage");
});

module.exports = router;
