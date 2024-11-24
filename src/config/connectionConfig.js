import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


const db = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
    connectionLimit: 10,
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Conexión exitosa");
        connection.release();
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    }
})();


export default db;