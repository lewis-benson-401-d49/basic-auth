'use strict';

const bcrypt = require('bcrypt');

const { userInterface } = require('../models');

module.exports = async (req, res, next) => {
  try {
    
    const record = await userInterface.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
};