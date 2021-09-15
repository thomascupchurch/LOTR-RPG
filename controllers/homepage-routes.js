const router = require("express").Router();
const sequelize = require("../config/connection");
const { Character, User, Health } = require("../models");
