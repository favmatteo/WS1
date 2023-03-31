const { app, sequelize, request } = require('./config');

describe("Users API", () => {
    describe("POST /user/create", () => {
        it("Create a new user", () => {
            return request(app)
                .post("/user/create")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .send({
                    "id_user": Math.random().toString(36).slice(2),
                    "name": "default",
                    "surname": "default",
                    "email": "deafult@default.it",
                    "photo": "default.png",
                    "id_role": 1
                })
                .expect('Content-Type', /json/)
                .expect(201);
        })
    })
});