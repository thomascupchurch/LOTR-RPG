const router = require("express").Router();

//will add the rest of the models here as needed.
const { Scores } = require("../../models");

//get all users
router.get("/", (req, res) => {
  Scores.findAll({
    attributes: { id, score, user_id }
  })
    .then((dbScoreData) => res.json(dbScoreData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a specific user
router.get("/:user_id", (req, res) => {
  Scores.findOne({
    attributes: { score },
    where: {
      user_id: req.params.user_id,
    },
    include: [
      {
        User
      },
    ],
  })
    .then((dbScoresData) => {
      if (!dbScoresData) {
        res.status(404).json({ message: "No User Found with this user id" });
        return;
      }
      res.json(dbScoresData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a score for the first time 
router.post("/", (req, res) => {
  // expects {username: 'jsmith', password: 'password1234'}
  Scores.create({
    score: req.body.score
  })
    .then((dbScoresData) => {
      req.session.save(() => {
        req.session.user_id = dbScoresData.user_id;
        req.session.username = dbScoresData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
    // expects {username: 'jsmith', password: 'password1234'}
    Scores.update({
      score: req.body.score
    })
      .then((dbScoresData) => {
        req.session.save(() => {
          req.session.user_id = dbScoresData.user_id;
          req.session.username = dbScoresData.username;
          req.session.loggedIn = true;
          res.json(dbScoresData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
