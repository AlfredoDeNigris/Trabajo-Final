import express from 'express';
import db from './config/connectionConfig.js';
import user from './controller/userC.js';
import inspector from './controller/inspectorC.js';

const app = express();


app.use((req, res, next) => {
    req.pool = db;
    next();
});

app.use(express.json());
//app.use(express.text());


app.use('/user', user);
app.use('/inspector', inspector);

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