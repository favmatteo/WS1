const { app, sequelize, request } = require('./config');

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
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .send({
                    "date": "2023-01-01",
                    "amount": 150,
                    "title": "Test from Node",
                    "typology": "Node Test",
                    "description": "Test 1",
                    "id_user": process.env.TEST_TOKEN_USER_UID,
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
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe("GET /invoice/37694", () => {
        it("Return the invoice n°37694", async () => {
            const res = await request(app)
                .get("/invoice/37694")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe("GET /invoice/0", () => {
        it("Return the invoice n°0 that doesn't exist", async () => {
            const res = await request(app)
                .get("/invoice/0")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(404);
        });
    });
})

