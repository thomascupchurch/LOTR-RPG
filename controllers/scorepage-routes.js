const { Character } = require("../models");

const router = require("express").Router();

router.get("/scores", (req, res) => {
  res.render("scorespage");
  //This is where we do the database query.
  Character.findAll().then((dbCharData) => {
    const characters = dbCharData.map((character) =>
      character.get({ plain: true })
    );
  });
});

module.exports = router;
