const router = require("express").Router();
const { Score, Character, User } = require("../../models");
const withAuth = require("../../utils/auth");

//get all scores
//example: http://localhost:3001/api/score
router.get("/", (req, res) => {
  Score.findAll()
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get single score
//example: http://localhost:3001/api/score/1
router.get("/:id", (req, res) => {
  Score.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'final_score_num', 'user_id'],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put("/:id", (req, res) => {
//   Score.update(
//     {
//       char_health: req.body.char_health,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbCharData) => {
//       if (!dbCharData) {
//         res.status(404).json({ message: "No Character found with this id" });
//         return;
//       }
//       res.json(dbCharData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//create character route.
router.post("/", withAuth, (req, res) => {
  // expects {char_name: "Frodo", char_type: "Hobbit", user_id: 1 }

  Score.create({
    final_score_num: req.body.body.final_score_num,
    user_id: req.session.user_id,
  })
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
