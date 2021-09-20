const router = require("express").Router();

//will add the rest of the models here as needed.
const { Health } = require("../../models");

//get all users
router.get("/", (req, res) => {
  Health.findAll({
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
  Health.findOne({
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
    .then((dbHealthData) => {
      if (!dbHealthData) {
        res.status(404).json({ message: "No User Found with this user id" });
        return;
      }
      res.json(dbHealthData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a score for the first time 
router.post("/", (req, res) => {
  // expects {username: 'jsmith', password: 'password1234'}
  Health.create({
    score: req.body.score
  })
    .then((dbHealthData) => {
      req.session.save(() => {
        req.session.user_id = dbHealthData.user_id;
        req.session.username = dbHealthData.username;
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
    Health.update({
      health: req.body.health
    })
      .then((dbHealthData) => {
        req.session.save(() => {
          req.session.user_id = dbHealthData.user_id;
          req.session.username = dbHealthData.username;
          req.session.loggedIn = true;
          res.json(dbHealthData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
