import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Index', () => {
  it('should not navigate to unexisting endpoint', (done) => {
    chai.request(app).
    get('/scada/live')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    })
  })
})
