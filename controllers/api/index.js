const router = require("express").Router();

const userRoutes = require("./user-routes.js"); //done.


router.use("/users", userRoutes); //done.


module.exports = router;
