const router = require("express").Router();

const userRoutes = require("./user-routes.js"); //done.
const characterRoutes = require("./character-routes.js");


router.use("/users", userRoutes); //done.
router.use("/characters", characterRoutes);


module.exports = router;
