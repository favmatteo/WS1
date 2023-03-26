const schemaCreateUser = {
    type: "object",
    properties: {
        id_user: { type: "string" },
        name: { type: "string" },
        surname: { type: "string" },
        email: { type: "string" },
        photo: { type: "string" },
        id_role: { type: "integer" },
    },
    additionalProperties: false,
    required: ["id_user", "name", "surname", "email", "photo", "id_role"]
};



const schemaCreateInvoice = {
    type: "object",
    properties: {
        date: { type: "string" },
        amount: { type: "integer" },
        title: { type: "string" },
        typology: { type: "string" },
        description: { type: "string" },
        id_user: { type: "string" },
        id_customer: { type: "integer" },
    },
    additionalProperties: false,
    required: ["date", "amount", "title", "typology", "description", "id_user", "id_customer"]
};

exports.schemaCreateUser = schemaCreateUser;
exports.schemaCreateInvoice = schemaCreateInvoice;