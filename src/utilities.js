async function globalError(pool, callback, err, result, entity) {
    if (!pool) {
        callback({
            status: 500,
            message: 'Database pool is not available',
            detail: err
        });
        return;
    }
    if (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            callback({
                status: 409,
                message: `This ${entity} cannot be deleted due to one or more reference conflicts.`,
                detail: err
            });
        } else if (err.code === "INVALID_DATA_TYPE") {
            callback({
                status: 400,
                message: err.message,
                detail: err
            });
        } else if (err.code === "ER_BAD_FIELD_ERROR") {
            callback({
                status: 400,
                message: "The entered data type is not correct",
                detail: err
            });
        } else if (err.code === "ER_DUP_ENTRY") {
            callback({
                status: 400,
                message: err.message,
                detail: err
            });
        } else {
            console.log(err);
            callback({
                status: 500,
                message: "Unknown error",
                detail: err
            });
        }
    } else if ((result && result.affectedRows === 0) || (result && result.length === 0)) {
        callback({
            status: 404,
            message: `No registered ${entity} found with the entered search criteria`
        });
    } else {
        console.log(err);
        callback({
            status: 500,
            message: "Unknown behavior",
            detail: err
        });
    }
}

async function executeQuery(pool, query, params, successMessage, callback, entity) {
    let connection;
    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();

        const [result] = await connection.query(query, params);

        if (result.affectedRows === 0 || result.length === 0) {
            await connection.rollback();
            connection.release();
            return globalError(pool, callback, null, result, entity);
        }

        await connection.commit();

        connection.release();

        callback(undefined, {
            message: successMessage,
            detail: result
        });
    } catch (err) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        globalError(pool, callback, err, null, entity);
    }
}

async function readQuery(pool, query, params, callback, entity) {
    try {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(query, params);

            if (!result || result.length === 0) {
                return globalError(pool, callback, null, result, entity);
            }
            callback(null, { result });
        } catch (err) {
            globalError(pool, callback, err, null, entity);
        } finally {
            connection.release();
        }
    } catch (err) {
        globalError(pool, callback, err, null, entity);
    }
}


const u = {
    globalError,
    executeQuery,
    readQuery,
};

export default u;