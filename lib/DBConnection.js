const { app, sequelize, Sequelize } = require('./app');
const { Invoice, User } = require('./DBschemas');

function isDBConnected() {
    sequelize.authenticate().then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(`Error while connecting with database! ${error}`);
        process.exit();
    });
}

function createInvoice(date, amount, title, typology, description, id_user, id_customer) {
    Invoice.create({
        date: date,
        amount: amount,
        title: title,
        typology: typology,
        description: description,
        id_user: id_user,
        id_customer: id_customer
    }).then((invoice) => {
        console.log(`Invoice created! ${invoice}`);
    }).catch((error) => {
        console.log(`Error while creating invoice! ${error}`);
    });
}

function createUser(id_user, name, surname, email, photo, id_role) {
    User.create({
        id_user: id_user,
        name: name,
        surname: surname,
        email: email,
        photo: photo,
        id_role: id_role
    }).then((user) => {
        console.log(`User created! ${user}`);
    }).catch((error) => {
        console.log(`Error while creating user! ${error}`);
    });
}

module.exports = {
    isDBConnected: isDBConnected,
    createInvoice: createInvoice,
    createUser: createUser
}
