'use strict';
const base64 = require('base-64');
const { userInterface } = require('../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await userInterface.read({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    }

  } catch (e) {
    next(e);
  }
};