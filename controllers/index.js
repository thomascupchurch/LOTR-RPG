const router = require("express").Router();

const homeRoutes = require("./homepage-routes");
const characterPageRoutes = require("./characterpage-routes");
const scoresPageRoutes = require("./scorepage-routes");
const apiRoutes = require("./api/");

router.use("/", homeRoutes);
router.use("/", characterPageRoutes);
router.use("/", scoresPageRoutes);
router.use("/api", apiRoutes);

module.exports = router;
