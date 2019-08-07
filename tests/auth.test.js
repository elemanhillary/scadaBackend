import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const username = 'hola';
const password = '1q2w3e4lklrr';
let token;
describe('Tests Auth', () => {
  it('should signup user with valid credentials', (done) => {
    chai.request(app)
      .post('/scada/signup')
      .send({ username, password })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body).to.have.property('user');
        expect(Object.prototype.toString.call(res.body.user)).to.be.equal('[object Object]');
        expect(res.body.user).to.have.property('username');
        expect(typeof res.body.user.username).to.be.equal('string');
        expect(res.body.user.username).to.be.equal(username);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('registered');
        done();
      });
  });
  it('should login user with valid credentials', (done) => {
      chai.request(app)
        .post('/scada/signin')
        .send({ username, password })
        .end((err, res) => {
          token = res.body.user.token
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('user');
          expect(Object.prototype.toString.call(res.body.user)).to.be.equal('[object Object]');
          expect(res.body.user).to.have.property('username');
          expect(typeof res.body.user.username).to.be.equal('string');
          expect(res.body.user.username).to.be.equal(username);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('logged in');
          done();
        });
    });
    it('should signup user with existing credentials', (done) => {
        chai.request(app)
          .post('/scada/signup')
          .send({ username, password })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(409);
            done();
          });
      });
    it('should not signup user with missing credentials', (done) => {
      chai.request(app)
      .post('/scada/signup')
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400)
        done();
      })
    })
    it('should not login user with missing credentials', (done) => {
      chai.request(app)
      .post('/scada/signin')
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400)
        done();
      })
    })
    it('should logout user with valid token', (done) => {
      chai.request(app)
      .patch('/scada/signout')
      .set({'Authorization': token})
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.equal('logged out')
        done();
      })
    })
});
