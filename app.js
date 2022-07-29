import express from 'express';
import morgan from 'morgan';
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// db connection

import { mongoose } from 'mongoose';
try {
    const conn = await mongoose.connect('mongodb://localhost:27017/mvc',);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send('Hi ✌️!');
});

// Routes
import bookRoute from './routes/bookRoute.js';
app.use('/api/v1/', bookRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

