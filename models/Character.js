const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    char_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    char_type: {
      type: DataTypes.STRING, //Would need to implement some type of "choice option we can use here?"
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "character",
  }
);

module.exports = Character;