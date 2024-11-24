import bcrypt from 'bcrypt';
import u from "../utilities.js";
const userDb = {};

const entity = "user";

//Function to fetch all users' information
userDb.getU = (pool, callback) => {
    try {
        const query = 'SELECT  user_id, full_name, license, date_birth, billing_address, phone_number, email, role FROM user';
        u.readQuery(pool, query, null, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific user by user_id
userDb.getUP = (pool, user_id, callback) => {
    try {
        const query = 'SELECT full_name, license, date_birth, billing_address, phone_number, email, role FROM user WHERE user_id = ?';
        const params = [user_id];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific user by full_name (maybe)
userDb.getUF = (pool, full_name, callback) => {
    try {
        const query = 'SELECT full_name, license, date_birth, billing_address, phone_number, email FROM user WHERE full_name = ?';
        const params = [full_name];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to create a new user
userDb.create = async (pool, user, callback) => {
    try {
        const query = 'INSERT INTO user (full_name, license, date_birth, password, billing_address, phone_number, email, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const params = [user.full_name, user.license, user.date_birth, hashedPassword, user.billing_address, user.phone_number, user.email, user.role];
        let successMessage = `Your registration has been successful.`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to update a user's information
userDb.update = async (pool, user_id, user, callback) => {
    try {
        const query = 'UPDATE user SET full_name = ?, license = ?, date_birth = ?, password = ?, billing_address = ?, phone_number = ?, email = ? WHERE user_id = ?';
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const params = [user.full_name, user.license, user.date_birth, hashedPassword, user.billing_address, user.phone_number, user.email, user_id];
        let successMessage = `Profile information updated successfully!`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


//Function to delete a user by user_id
userDb.delete = (pool, user_id, callback) => {
    try {
        const query = 'DELETE FROM user WHERE user_id = ?';
        const params = [user_id];
        let successMessage = `user deleted successfully`;

        u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


export default userDb;