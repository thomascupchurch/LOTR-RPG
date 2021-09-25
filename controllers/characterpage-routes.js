const router = require("express").Router();
const withAuth = require("../utils/auth");

//Protected the character route by forcing there to be a user that is logged in to see the page.
router.get("/character", withAuth, (req, res) => {
  res.render("characterpage");
});

module.exports = router;
