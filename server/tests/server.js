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

    it('responds to /test', (done) => {
        request(server).get('/test').expect(200, done);
    });

    it('responds to /test-database', (done) => {
        request(server).get('/test-database').expect(200, done);
    });

    it('responds to /load-data', (done) => {
        request(server).get('/load-data').expect(200, done);
    });

    it('responds to /image/:id and returns image', (done) => {
        request(server).get('/image/test-image.png').expect(200, done);
    });

    it('responds to /posts', (done) => {
        request(server).get('/posts').expect(200, done);
    });

    it('responds to /post/:id/comments', (done) => {
        request(server).get('/post/1/comments').expect(200, done);
    });

    it('responds to /post/:id', (done) => {
        request(server).get('/post/1').expect(200, done);
    });

    it('responds to /user/:username', (done) => {
        request(server).get('/user/admin').expect(200, done);
    });

    it('responds to /user/:username/posts', (done) => {
        request(server).get('/user/admin/posts').expect(200, done);
    });

    it('responds to /user/:username/comments', (done) => {
        request(server).get('/user/admin/comments').expect(200, done);
    });

    it('responds to /account', (done) => {
        request(server).get('/account').expect(401, done);
    });
});
