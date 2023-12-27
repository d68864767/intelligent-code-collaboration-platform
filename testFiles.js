// testFiles.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const should = chai.should();

chai.use(chaiHttp);

describe('Code Collaboration Platform', () => {
    // Test for Authentication
    describe('/POST register', () => {
        it('it should register a new user', (done) => {
            let user = {
                username: "testUser",
                password: "testPassword"
            }
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Test for Code Review
    describe('/GET codeReview', () => {
        it('it should GET all the code reviews', (done) => {
            chai.request(server)
                .get('/codeReview')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    // Test for Codebase
    describe('/GET codebase', () => {
        it('it should GET all the codebases', (done) => {
            chai.request(server)
                .get('/codebase')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    // Add more tests as per your controllers
});

