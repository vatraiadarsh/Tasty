import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hi ✌️!');
});




app.listen(3000, () => {
    console.log('Express app listening on port 3000!');
});


export default app;