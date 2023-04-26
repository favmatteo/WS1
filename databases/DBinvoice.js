const { Invoice } = require('../schemas/invoice');

/**
 * Function to create an invoice and save it in the database
 * @param {string} date - The date of the invoice
 * @param {integer} amount - The amount of the invoice
 * @param {string} title - The title of the invoice
 * @param {string} typology - The typology of the invoice
 * @param {string} description - The description of the invoice
 * @param {string} id_user - The id of the user of the invoice
 * @param {integer} id_customer  - The id of the customer of the invoice
 * @returns {JSON} - The status of invoice created
 */
async function createInvoice(date, amount, title, typology, description, id_user, id_customer, id = null) {
  try {
    await Invoice.create({
      id_invoice: id ? id : null,
      date: date,
      amount: amount,
      title: title,
      typology: typology,
      description: description,
      id_user: id_user,
      id_customer: id_customer,
    });
    return { status: 201, message: 'Invoice created!' };
  } catch (error) {
    return { status: 404, message: 'Error while creating invoice!', why: error.message };
  }
}

/**
 * Function to get all invoices or a specific invoice from the database
 * @param {integer} id - The id of the invoice
 * @returns {JSON} - All invoices or a specific invoice
 */
async function getInvoice(id = 'all') {
  try {
    const result = await Invoice.findAll({
      attributes: ['id_invoice', 'date', 'amount', 'title', 'typology', 'description', 'id_user', 'id_customer'],
      where: id !== 'all' ? { id_invoice: id } : null,
    });
    if (result.length === 0) {
      return { status: 404, message: 'No invoice found!' };
    }
    return { status: 200, message: id === 'all' ? 'All Invoice' : `Invoice with id ${id}`, result: result };
  } catch (error) {
    return { status: 404, message: 'Error while getting invoice(s)!', why: error.message };
  }
}

/**
 * Function to delete a specific invoice from the database
 * @param {integer} id - The id of the invoice to delete
 * @returns {JSON} - Status of the invoice deleted
 */
async function deleteInvoice(id) {
  try {
    const result = await Invoice.destroy({
      where: { id_invoice: id },
    });
    return { status: 200, message: 'Invoice deleted!' };
  } catch (error) {
    return { status: 404, message: 'Error while deleting invoice!', why: error.message };
  }
}

/**
 * Function to update a specific invoice from the database
 * @param {integer} id - The id of the invoice to update
 * @param {JSON} datas - The datas to update
 * @returns {JSON} - Status of the invoice updated
 */
async function updateInvoice(id, datas) {
  if (Object.keys(datas).length === 0) {
    return {
      status: 405,
      message: 'Error while updating invoice!',
      why: 'No information was entered to modify the invoice',
    };
  }
  const id_invoice = id;
  let invoice;
  try {
    invoice = await getInvoice(id);
  } catch (error) {
    return { status: 404, message: 'No invoice found!' };
  }
  try {
    await Invoice.update(
      {
        date: datas.date,
        amount: datas.amount,
        title: datas.title,
        typology: datas.typology,
        description: datas.description,
      },
      {
        where: { id_invoice: id_invoice },
      }
    );
    return { status: 200, message: 'Invoice updated!' };
  } catch (error) {
    return { status: 404, message: 'Error while updating invoice!', why: error.message };
  }
}

module.exports = {
  createInvoice: createInvoice,
  getInvoice: getInvoice,
  deleteInvoice: deleteInvoice,
  updateInvoice: updateInvoice,
};
