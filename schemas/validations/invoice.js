const schemaCreateInvoice = {
    type: "object",
    properties: {
        id_invoice: { type: "integer" },
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

const schemaUpdateInvoice = {
    type: "object",
    properties: {
        date: { type: "string" },
        amount: { type: "integer" },
        title: { type: "string" },
        typology: { type: "string" },
        description: { type: "string" },
    },
    additionalProperties: false,
}

module.exports = {
    schemaCreateInvoice: schemaCreateInvoice,
    schemaUpdateInvoice: schemaUpdateInvoice,
}
