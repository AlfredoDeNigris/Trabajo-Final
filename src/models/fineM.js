import u from "../utils/utilities.js";
const fineDb = {};

const entity = "fine";

//Function to fetch all fines' information
fineDb.getF = (pool, callback) => {
    try {
        const query = `SELECT f.fine_id, f.issued_at, f.fine_description, f.paid, fr.reason_description, fr.amount, v.information, u.full_name
        FROM  fine f JOIN fine_reason fr ON f.reason_id = fr.reason_id JOIN vehicle v ON f.patent = v.patent JOIN  user u ON v.user_id = u.user_id;`;

        u.readQuery(pool, query, null, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific fine by user_id
fineDb.getFI = (pool, user_id, callback) => {
    try {
        const query = `SELECT f.issued_at, f.fine_description, f.paid, fr.reason_description, fr.amount, v.information
        FROM fine f JOIN fine_reason fr ON f.reason_id = fr.reason_id JOIN vehicle v ON f.patent = v.patent WHERE v.user_id = ?;`;
        const params = [user_id];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to issue a new fine
fineDb.issueFine = async (pool, fine, callback) => {
    try {
        const query = 'INSERT INTO fine (issued_at, fine_description, patent, badge_number, reason_id) VALUES (?, ?, ?, ?, ?)';
        const params = [fine.issued_at, fine.fine_description, fine.patent, fine.badge_number, fine.reason_id];
        let successMessage = `Fine issued successfully.`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to pay a fine
fineDb.payFine = async (pool, fine_id, callback) => {
    try {
        const query = 'UPDATE fine SET paid = true WHERE fine_id = ?;';
        const params = [fine_id];
        let successMessage = `The payment was successful`;

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};


export default fineDb;