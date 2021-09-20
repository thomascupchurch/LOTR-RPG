const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const controllers = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

//using Sequilize to store the session.
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
//Should this be extended true?
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// turn on the controllers (api and page routes).
app.use(controllers);

//turn on the connection to db and server
//If any changes are made to the Models (including any associations made on the
//index.js file in the Models folder) set this to force: true then run once to
//recreate the tables/associations, then set it back to false.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
