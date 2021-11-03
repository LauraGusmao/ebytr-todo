const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Register new user', function () {
  describe('When new user is successfully created', function () {
    let connectionMock;
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

    it('"message" property has text "New user successfully created"', function (done) {
      expect(response.body.message).to.be.equal('New user successfully created');
      done();
    });
  });
});
