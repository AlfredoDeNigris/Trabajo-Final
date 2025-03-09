import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});