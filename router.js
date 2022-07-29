import bookRoute from './routes/bookRoute.js';


export const router = (app)  => {
    app.use('/api/v1/', bookRoute);

}

