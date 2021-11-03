const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('User login', function () {
  let connectionMock;

  describe('When user is not registered', function () {
    let response = {};

    before(async function () {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/login')
        .send({
          username: 'lauragus',
          password: 'abc123',
        });
    });

    after(async function () {
      MongoClient.connect.restore();
    });

    it('retuns status code 422', function (done) {
      expect(response).to.have.status(422);
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

    it('returns message "User does not exist or invalid password"', function (done) {
      expect(response.body.error.message).to.be.equal('User does not exist or invalid password');
      done();
    });
  });

  describe('When user is successfully logged in', function () {
    let response = {};

    before(async function () {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users/new')
        .send({
          username: 'lauragus',
          password: 'abc123',
        });

      response = await chai.request(server)
        .post('/login')
        .send({
          username: 'lauragus',
          password: 'abc123',
        });
    });

    after(async function () {
      MongoClient.connect.restore();
    });

    it('retuns status code 200', function (done) {
      expect(response).to.have.status(200);
      done();
    });

    it('returns an object', function (done) {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns "token" property', function (done) {
      expect(response.body).to.have.property('token');
      done();
    });
  });
});