import express from 'express';
import dotenv from 'dotenv';
import db from './config/connectionConfig.js';
import userRoutes from './routes/userR.js';
import inspectorRoutes from './routes/inspectorR.js';
import vehicleRoutes from './routes/vehicleR.js';
import fineRoutes from './routes/fineR.js';
import a from './middlewares/auth.js';


dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const app = express();


app.use((req, res, next) => {
    req.pool = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());


app.use('/user', userRoutes);
app.use('/inspector', inspectorRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/fine', fineRoutes);
app.post('/login', a.login);


app.get('/isAlive', (req, res) => {
    res.sendStatus(200);
});

app.use((req, res) => {
    res.status(404).send('Resource not found.');
});

export default app;