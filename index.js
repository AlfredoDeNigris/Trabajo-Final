import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const port = 8080;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});