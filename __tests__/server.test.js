'use strict';
const { app } = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});


describe('Rest API Server', () => {
  test('Creates a user', async () => {
    let user = await (request.post('/signup')).send({
      username: 'tester',
      password: 'password',
    });
    console.log(user);
    expect(user.body.username).toEqual('tester');
  });
});