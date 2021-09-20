const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'thomas',
    password: 'password123'
  },
  {
    username: 'eleanor',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
