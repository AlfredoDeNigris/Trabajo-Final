import u from "../utils/utilities.js";
const vehicleDb = {};

const entity = "vehicle";

//Function to fetch all vehicles' information
vehicleDb.getV = (pool, callback) => {
    try {
        const query = 'SELECT  patent, information FROM vehicle';
        u.readQuery(pool, query, null, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific vehicle by patent
vehicleDb.getVP = (pool, patent, callback) => {
    try {
        const query = `SELECT v.information, u.full_name, u.license, u.date_birth, u.billing_address, u.phone_number, u.email, u.role
        FROM vehicle v INNER JOIN  user u ON  v.user_id = u.user_id WHERE v.patent = ?;`;
        const params = [patent];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to create a new vehicle
vehicleDb.create = async (pool, vehicle, callback) => {
    try {
        const query = 'INSERT INTO vehicle (patent, information, user_id) VALUES (?, ?, ?)';
        const params = [vehicle.patent, vehicle.information, vehicle.user_id];
        let successMessage = `${entity} registrated successfuly.`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to update a vehicle's information
vehicleDb.updateVehicle = async (pool, patent, vehicle, callback) => {
    try {
        const query = 'UPDATE vehicle SET information = ? WHERE patent = ?';
        const params = [vehicle.information, patent]
        let successMessage = `${entity}'s information updated successfully!`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


//Function to delete a vehicle by patent
vehicleDb.delete = (pool, patent, callback) => {
    try {
        const query = 'DELETE FROM vehicle WHERE patent = ?';
        const params = [patent];
        let successMessage = `${entity} deleted successfully`;

        u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


export default vehicleDb;