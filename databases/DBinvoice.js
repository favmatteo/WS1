const { Invoice } = require('../schemas/invoice');

/**
 * Function to create an invoice and save it in the database
 * @param {object} date - The date of the invoice
 * @param {integer} amount - The amount of the invoice
 * @param {string} title - The title of the invoice
 * @param {string} typology - The typology of the invoice
 * @param {string} description - The description of the invoice
 * @param {string} id_user - The id of the user of the invoice
 * @param {integer} id_customer  - The id of the customer of the invoice
 * @returns {object} - The status of invoice created
 */
async function createInvoice(date, amount, title, typology, description, id_user, id_customer) {
    try {
        await Invoice.create({
            date: date,
            amount: amount,
            title: title,
            typology: typology,
            description: description,
            id_user: id_user,
            id_customer: id_customer
        })
        return { status: 201, message: "Invoice created!" }
    } catch (error) {
        return { status: 404, message: "Error while creating invoice!", why: error.message }
    }
}

/**
 * Function to get all invoices or a specific invoice from the database
 * @param {integer} id - The id of the invoice 
 * @returns {object} - All invoices or a specific invoice
 */
async function getInvoice(id = 'all') {
    try {
        const result = await Invoice.findAll({
            attributes: ['id_invoice', 'date', 'amount', 'title', 'typology', 'description', 'id_user', 'id_customer'],
            where: id !== 'all' ? { id_invoice: id } : null
        });
        if (result.length === 0) {
            return { status: 404, message: "No invoice found!" }
        }
        return { status: 200, message: id === 'all' ? 'All Invoice' : `Invoice with id ${id}`, result: result }
    } catch (error) {
        return { status: 404, message: "Error while getting all invoice!", why: error.message }
    }
}

module.exports = {
    createInvoice: createInvoice,
    getInvoice: getInvoice,
}
