//import all models.
const User = require("./User");
const Character = require("./Character");
const Health = require("./Health");

//create associations.

//User associations.
User.hasMany(Character, {
  foreignKey: "user_id",
});

Character.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Health, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Health.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
// export models.
module.exports = { User, Character, Health };
