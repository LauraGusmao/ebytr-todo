const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Create new task', function () {
  describe('When token is not authenticated', function () {
    let connectionMock;
    let response = {};

    before(async function () {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/tasks/new')
        .send({
          title: 'Study',
          description: 'Study integrated tests',
          status: 'on going',
        });
    });

    after(async function () {
      MongoClient.connect.restore();
    });

    it('returns status code 401', function (done) {
      expect(response).to.have.status(401);
      done();
    });

    it('returns an object', function (done) {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns "error" property', function (done) {
      expect(response.body).to.have.property('error');
      done();
    });

    it('returns code "unauthorized"', function (done) {
      expect(response.body.error.code).to.be.equal('unauthorized');
      done();
    });
  });
  describe('When new task is successfully created', function () {
    let connectionMock;
    let response = {};

    before(async function () {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('ebyrt-todo').collection('users').insertOne({
        username: 'lauragus12',
        password: 'abc123',
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          username: 'lauragus12',
          password: 'abc123',
        }).then((res) => res.body.token);

      response = await chai.request(server)
        .post('/tasks/new')
        .set('authorization', token)
        .send({
          title: 'Study',
          description: 'Study integrated tests',
          status: 'on going',
        });
    });

    after(async function () {
      MongoClient.connect.restore();
    });

    it('returns status code 201', function (done) {
      expect(response).to.have.status(201);
      done();
    });

    it('returns an object', function (done) {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns "message" property', function (done) {
      expect(response.body).to.have.property('message');
      done();
    });

    it('"message" property has text "New task successfully created"', function (done) {
      expect(response.body.message).to.be.equal('New task successfully created');
      done();
    });
  });
});
