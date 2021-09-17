const router = require("express").Router();
const { Character, User } = require("../../models");
const withAuth = require("../../utils/auth");

//get all characters
//example: http://localhost:3001/api/characters
router.get("/", (req, res) => {
  Character.findAll()
    .then((dbCharacterData) => res.json(dbCharacterData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create character route.
router.post("/", withAuth, (req, res) => {
  // expects {char_name: "Frodo", char_type: "Hobbit", user_id: 1 }

  Character.create({
    char_name: req.body.char_name,
    char_type: req.body.char_type,
    user_id: req.session.user_id,
  })
    .then((dbCharacterData) => res.json(dbCharacterData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
