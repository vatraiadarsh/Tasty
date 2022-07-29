import express from 'express';
const app = express();

// middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hi ✌️!');
});

// Routes
import bookRoute from './routes/bookRoute.js';
app.use('/api/v1', bookRoute);



app.listen(3000, () => {
    console.log('Express app listening on port 3000!');
});


export default app;