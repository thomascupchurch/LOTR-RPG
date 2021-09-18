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

//get single character
//example: http://localhost:3001/api/characters/1
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

router.put("/:id", (req, res) => {
  Character.update(
    {
      char_health: req.body.char_health,
    },
    {
      where: {
        id: req.params.id,
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
    .then((dbCharacterData) => res.json(dbCharacterData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
