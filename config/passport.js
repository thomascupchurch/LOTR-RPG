const { authenticate } = require("passport");
const LocalStrategy = require("passport-local");

const intialize = (passport) => {
  const authenticateUser = (username, password, done) => {
    const user = getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: "Could not find this user." });
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }),
    authenticateUser
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};

// export to controllers
