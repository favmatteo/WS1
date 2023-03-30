require("dotenv").config();

const { app } = require('../lib/app');
const { sequelize } = require('../lib/database');
const request = require('supertest')
//const index = require('../index')

describe("Invoices API", () => {

    beforeAll(async () => {
        //await sequelize.sync({ force: true });
    })

    afterEach(async () => {
    })

    afterAll(async () => {
        //await sequelize.close();
    })

    describe("POST /invoice/create", () => {
        it("Create a new invoice", async () => {
            const res = await request(app)
                .post("/invoice/create")
                .send({
                    "date": "2023-01-01",
                    "amount": 150,
                    "title": "Test from Node",
                    "typology": "Node Test",
                    "description": "Test 1",
                    "id_user": process.env.TOKEN_USER_MATTEO_FAVARO,
                    "id_customer": 1
                })
                .expect('Content-Type', /json/)
                .expect(201);
        });
    });

    describe("GET /invoice/all", () => {
        it("Return all invoice", async () => {
            const res = await request(app)
                .get("/invoice/all")
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe("GET /invoice/37694", () => {
        it("Return the invoice n°37694", async () => {
            const res = await request(app)
                .get("/invoice/37694")
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe("GET /invoice/0", () => {
        it("Return the invoice n°0 that doesn't exist", async () => {
            const res = await request(app)
                .get("/invoice/0")
                .expect('Content-Type', /json/)
                .expect(404);
        });
    });
})

