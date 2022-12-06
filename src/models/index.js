'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const ModelInterface = require('./modelInterface');
const bcrypt = require('bcrypt');
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
});

module.exports = {
  sequelize,
  userInterface: new ModelInterface(Users),
};