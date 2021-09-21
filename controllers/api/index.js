const router = require("express").Router();

const userRoutes = require("./user-routes.js"); //done.
const characterRoutes = require("./character-routes.js");

router.use("/user", userRoutes); //done.
router.use("/character", characterRoutes);

module.exports = router;
