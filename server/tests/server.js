const request = require('supertest');

describe('loading express', () => {
    let server;
    process.env.NODE_ENV = 'test';

    beforeEach(() => {
        server = require('../build/index.js');
    });

    afterEach(() => {
        server.close();
    });

    it('responds to /test', function testTest(done) {
        request(server).get('/test').expect(200, done);
    });
    it('responds to /test-database', function testTest(done) {
        request(server).get('/test-database').expect(200, done);
    });
});
