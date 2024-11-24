import express from 'express';
import db from './config/connectionConfig.js';
import user from './controller/userC.js';

const app = express();


app.use((req, res, next) => {
    req.pool = db;
    next();
});

app.use(express.json());
//app.use(express.text());


app.use('/user', user);

app.get('/isAlive', (req, res) => {
    res.sendStatus(200);
});

app.use((req, res) => {
    res.status(404).send('Recurso no encontrado');
});

const puerto = 8080;

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});


/*async function getUserByName(full_name) {
    const query = "SELECT * FROM user WHERE full_name = ?"
    try {
        const [rows] = await db.execute(query, [full_name]); //tener presenta si usar execute o query
        return rows.length > 0 ? rows : console.log(`no hay usuarios con el nombre ${full_name}`);
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
}

getUserByName("Juan");*/