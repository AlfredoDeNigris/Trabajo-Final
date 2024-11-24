const userDb = {};
//const bcrypt = require('bcrypt');
import u from "../utilities.js";

const entity = "user";

//Function to fetch all users' information
userDb.getU = (pool, callback) => {
    try {
        const query = 'SELECT license, full_name, date_birth, billing_address, phone_number, email FROM user';
        u.readQuery(pool, query, null, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


export default userDb;



/*
//Function to get a specific client by client_id
userDb.getCP = (pool, client_id, callback) => {
    try {
        const query = 'SELECT full_name, username, password, billing_address, phone_number, email FROM client WHERE client_id = ?';
        const params = [client_id];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific client by username
userDb.getCU = (pool, username, callback) => {
    try {
        const query = 'SELECT full_name, username, password, billing_address, phone_number, email FROM client WHERE username = ?';
        const params = [username];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to create a new client
userDb.create = (pool, client, callback) => {
    try {
        const query = 'INSERT INTO client (full_name, username, password, billing_address, phone_number, email) VALUES (?, ?, ?, ?, ?, ?)';
        let hashedPassword = bcrypt.hashSync(client.password, 10);
        const params = [client.full_name, client.username, hashedPassword, client.billing_address, client.phone_number, client.email];
        let successMessage = `Your registration has been successful.`;

        u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to update a client's information
userDb.update = (pool, client_id, client, callback) => {
    try {
        const query = 'UPDATE client SET full_name = ?, username = ?, password = ?, billing_address = ?, phone_number = ?, email = ? WHERE client_id = ?';
        let hashedPassword = bcrypt.hashSync(client.password, 10);
        const params = [client.full_name, client.username, hashedPassword, client.billing_address, client.phone_number, client.email, client_id];
        let successMessage = `Profile information updated successfully!`;

        u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to delete a client by client_id
userDb.delete = (pool, client_id, callback) => {
    try {
        const query = 'DELETE FROM client WHERE client_id = ?';
        const params = [client_id];
        let successMessage = `Client deleted successfully`;

        u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};*/