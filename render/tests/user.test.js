const expect = require('expect');
const request = require('supertest');

const app = require('../server');
const User = require('../models/User');

const users = [{
	email: 'mail1@gmail.com'
}, {
	email: 'mail2@gmail.com'
}];

beforeEach((done) => {
	User.deleteMany({})
		.then(() => {
			User.insertMany(users);
			return;
		})
    .then(() => done());
});

describe('GET /users', () => {
    it('should get all users', (done) => {
        request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
            expect(res.body.users.length).toBe(2);
        })
        .expect(done());
    });
});

describe('POST /users', () => {
    it('should create a new user', (done) => {
        const email = 'test@gmail.com';
        request(app)
        .post('/users')
        .send({
            email: email
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.email).toBe(email);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            User.find({
                email: email
            }).then((users) => {
                expect(users.length).toBe(1);
                expect(users[0].email).toBe(email);
                done();
            }).catch((e) => done(e));
        })
    });
});

