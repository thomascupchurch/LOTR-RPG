const router = require("express").Router();

const userRoutes = require("./user-routes.js"); //done.
const characterRoutes = require("./character-routes.js");
const scoreRoutes = require('./score-routes');

router.use("/user", userRoutes); //done.
router.use("/character", characterRoutes);
router.use("/score", scoreRoutes)

module.exports = router;
