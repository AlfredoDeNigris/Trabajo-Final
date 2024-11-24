import bcrypt from 'bcrypt';
import u from "../utilities.js";
const inspectorDb = {};

const entity = "inspector";

//Function to fetch all inspectors' information
inspectorDb.getI = (pool, callback) => {
    try {
        const query =
            `SELECT u.full_name, u.license, u.date_birth, u.billing_address, u.phone_number, u.email, i.badge_number FROM user u
LEFT JOIN inspector i ON u.user_id = i.user_id WHERE u.role = 'inspector';`;
        u.readQuery(pool, query, null, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to get a specific inspector by badge_number
inspectorDb.getIP = (pool, badge_number, callback) => {
    try {
        const query = `SELECT u.full_name, u.license, u.date_birth, u.billing_address, u.phone_number, u.email, i.badge_number FROM user u
LEFT JOIN inspector i ON u.user_id = i.user_id WHERE badge_number = ?`;
        const params = [badge_number];

        u.readQuery(pool, query, params, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to create a new inspector
inspectorDb.create = async (pool, inspector, callback) => {
    try {
        const query = `START TRANSACTION;
            INSERT INTO user (full_name, license, date_birth, password, billing_address, phone_number, email, role) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            
            SET @last_user_id = LAST_INSERT_ID();

            ${inspector.role === "inspector" ? `INSERT INTO inspector (user_id) VALUES (@last_user_id);` : ''}

            COMMIT;`;

        const hashedPassword = await bcrypt.hash(inspector.password, 10);
        const params = [
            inspector.full_name,
            inspector.license,
            inspector.date_birth,
            hashedPassword,
            inspector.billing_address,
            inspector.phone_number,
            inspector.email,
            inspector.role
        ];

        let successMessage = 'Inspector registered successfuly.';

        await u.executeQuery(pool, query, params, successMessage, callback, entity);
    } catch (err) {
        u.globalError(pool, callback, err, null, entity);
    }
};

//Function to delete a inspector by badge_number
inspectorDb.delete = async (pool, badge_number, role, callback) => {
    let connection;
    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();

        const userQuery = 'SELECT user_id FROM inspector WHERE badge_number = ?';
        const userParams = [badge_number];
        const [userResult] = await connection.query(userQuery, userParams);

        if (!userResult || userResult.length === 0) {
            await connection.rollback();
            return u.globalError(pool, callback, null, userResult, entity);
        }

        const user_id = userResult[0].user_id;

        const roleQuery = 'UPDATE user SET role = ? WHERE user_id = ?';
        const roleParams = [role, user_id];
        await connection.query(roleQuery, roleParams);

        const deleteInspectorQuery = 'DELETE FROM inspector WHERE badge_number = ?';
        const deleteInspectorParams = [badge_number];
        await connection.query(deleteInspectorQuery, deleteInspectorParams);

        await connection.commit();

        const successMessage = 'Inspector deleted successfully';
        callback(null, { message: successMessage });

    } catch (err) {
        if (connection) {
            await connection.rollback();
        }
        u.globalError(pool, callback, err, null, entity);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export default inspectorDb;