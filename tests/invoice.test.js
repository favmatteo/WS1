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
                .expect(201, { status: 201, message: "Invoice created!" });
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
                .expect(404, { status: 404, message: "No invoice found!" });
        });
    });

    describe("DELETE /invoice/10", () => {
        it("Delete the invoice n°10", async () => {
            await request(app)
                .post("/invoice/create")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .send({
                    "id_invoice": 10,
                    "date": "2023-01-01",
                    "amount": 150,
                    "title": "Test from Node",
                    "typology": "Node Test",
                    "description": "Test 1",
                    "id_user": process.env.TEST_TOKEN_USER_UID,
                    "id_customer": 1
                })
            const res = await request(app)
                .delete("/invoice/delete/10")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(200, { status: 200, message: "Invoice deleted!" });
        });
    });

    describe("UPDATE /invoice/update/10", () => {
        it("Update the invoice n°10", async () => {
            await request(app)
                .post("/invoice/create")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .send({
                    "id_invoice": 10,
                    "date": "2023-01-01",
                    "amount": 150,
                    "title": "Test from Node",
                    "typology": "Node Test",
                    "description": "Test 1",
                    "id_user": process.env.TEST_TOKEN_USER_UID,
                    "id_customer": 1
                })
            const res = await request(app)
                .put("/invoice/update/10")
                .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
                .send({
                    "date": new Date().toISOString().split('T')[0],
                    "amount": 230,
                    "title": "Prova di aggiornamento dati!",
                    "typology": "Testing",
                    "description": "Test 1",
                })
                .expect('Content-Type', /json/)
                .expect(200, { status: 200, message: "Invoice updated!" });
        })
    })
})