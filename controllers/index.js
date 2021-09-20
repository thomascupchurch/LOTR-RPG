const router = require("express").Router();

const homeRoutes = require("./homepage-routes");
const characterPageRoutes = require("./characterpage-routes");
const scoresPageRoutes = require("./scorepage-routes");
const gamePageRoutes = require("./gamepage-routes");
const apiRoutes = require("./api/");

router.use("/", homeRoutes);
router.use("/", characterPageRoutes);
router.use("/", gamePageRoutes);
router.use("/", scoresPageRoutes);
router.use("/api", apiRoutes);

//This is so if we make a request to any endpoint that doesn't exist,
//we'll receive a 404 error indicating we have requested an incorrect resource,
//another RESTful API practice.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
