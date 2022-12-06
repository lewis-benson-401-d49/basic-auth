'use strict';

const { sequelize } = require('./src/models');


const server = require('./src/server');

sequelize.sync()
  .then(() => {
    console.log('Connected');
    server.start();
  }).catch(err => console.error(err.message));


