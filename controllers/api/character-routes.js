const router = require("express").Router();
const { Character, User } = require("../../models");
const withAuth = require("../../utils/auth");

//get all characters
//example: http://localhost:3001/api/character
router.get("/", (req, res) => {
  Character.findAll()
    .then((dbCharacterData) => res.json(dbCharacterData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get single character
//example: http://localhost:3001/api/character/1
router.get("/:id", (req, res) => {
  Character.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "char_name", "char_type", "char_health"],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbCharacterData) => res.json(dbCharacterData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/", (req, res) => {
  console.log("this should be our req.body", req.body);
  Character.update(
    {
      //Assigning updated value of char_health with the
      //req.body.health (see game.js line 73)
      char_health: req.body.health,
    },
    {
      where: {
        //this is how it knows which character id
        //to update by matching it with the current session current_char.
        id: req.session.current_char,
      },
    }
  )
    .then((dbCharData) => {
      if (!dbCharData) {
        res.status(404).json({ message: "No Character found with this id" });
        return;
      }
      res.json(dbCharData);
    })
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
    .then((dbCharacterData) => {
      req.session.current_char = dbCharacterData.id;
      res.json(dbCharacterData);
      console.log(current_char);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
