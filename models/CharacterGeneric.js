const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CharacterGeneric extends Model {}

CharacterGeneric.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    heightInMeters: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    strength: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    affiliation: {
        type: DataTypes.STRING,
        allowNull: false
    },

    vestmentColor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});