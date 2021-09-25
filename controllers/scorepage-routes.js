const { Character, User } = require("../models");

const router = require("express").Router();

router.get("/scores", (req, res) => {
  //This is how we are getting the character data so we can use it
  //on the scores page.

  Character.findAll({
    //Character is the Model Name and .findAll is the method so we get
    //all character data from the Character table.
    include: [
      //Including the username from the User model as well since there is a
      //Foreign key on the Character Model (user_id) that can match up w/ the username
      //via the users table (id).
      {
        model: User,
        attributes: ["username"],
      },
    ],
    limit: 10,
    order: [["char_health", "DESC"]],
  }).then((dbCharData) => {
    //creating a variable and calling it characters which is mapping over the
    //data in the character table.
    const characters = dbCharData.map((character) =>
      character.get({ plain: true })
    );
    console.log(characters);
    //once all this data is pulled we render the scores page and include the characters data
    //as an object so it can be used w/ our handlebars template.
    res.render("scorespage", { characters });
  });
});

module.exports = router;
