const { Character, User } = require("../models");

const router = require("express").Router();

router.get("/scores", (req, res) => {
  Character.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    limit: 10,
    order: [["char_health", "DESC"]],
  }).then((dbCharData) => {
    const characters = dbCharData.map((character) =>
      character.get({ plain: true })
    );
    console.log(characters);
    res.render("scorespage", { characters });
  });
});

module.exports = router;
