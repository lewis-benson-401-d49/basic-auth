'use strict';

const express = require('express');
const { userInterface } = require('../models');
const login = require('../auth/login');
const signup = require('../auth/signup');
const router = express.Router();
const auth = require('../middleware/signin');

router.route('/signup')
  .post(signup);

router.route('/signin')
  .post(auth, login);

router.route('/users')
  .get(async (req, res, next) => {
    try {
      const users = await userInterface.read();
      res.status(200).send(users);
    } catch (e) {
      next(e.message);
    }
  });

module.exports = router;
