const router = require("express").Router();

//will add the rest of the models here as needed.
const { User, Character } = require("../../models");

//get all users
//example: http://localhost:3001/api/user
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Character,
        attributes: ["id", "char_name", "char_type", "char_health"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a specific user
//example: http://localhost:3001/api/user/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Character,
        attributes: ["id", "char_name", "char_type", "char_health"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User Found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a user route
router.post("/", (req, res) => {
  // expects {username: 'jsmith', password: 'password1234'}
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
        console.log(dbUserData.id);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login user route.
//example: http://localhost:3001/api/user/login
router.post("/login", (req, res) => {
  // expects {username: 'mhodges', password: 'password1234'}
  console.log("login attempt", req.body);
  User.findOne({
    where: {
      username: req.body.user,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      console.log(dbUserData.id);
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// PUT route:
//example: http://localhost:3001/api/user/1
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Logout route.
//example: http://localhost:3001/api/user/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
