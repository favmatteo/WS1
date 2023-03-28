const { app, sequelize, Sequelize } = require('./app');
const { Invoice } = require('../schemas/invoice');
const { User } = require('../schemas/user');

function isDBConnected() {
    sequelize.authenticate().then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(`Error while connecting with database! ${error.message}`);
        process.exit();
    });
}

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
        return { status: "ok", message: "Invoice created!" }
    } catch (error) {
        return { status: "error", message: "Error while creating invoice!", why: error.message }
    }
}

async function createUser(id_user, name, surname, email, photo, id_role) {
    try {
        await User.create({
            id_user: id_user,
            name: name,
            surname: surname,
            email: email,
            photo: photo,
            id_role: id_role
        })
        return { status: "ok", message: "User created!" }
    } catch (error) {
        return { status: "error", message: "Error while creating user!", why: error.message }
    }
}

module.exports = {
    isDBConnected: isDBConnected,
    createInvoice: createInvoice,
    createUser: createUser
}
