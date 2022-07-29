import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
const app = express();

// middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// db connection
import { databaseConnection } from './database.js';
databaseConnection();

// Server
import {server} from './server.js';
server(app);


// Routes

import { router } from './router.js';
router(app);


export default app;