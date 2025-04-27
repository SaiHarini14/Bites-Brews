import express from 'express'
import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js'

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js'; 
import SubscriptionRouter from './routes/sunbsription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import ReviewRouter from './routes/review.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({encoded:false}));
app.use(cookieParser());


app.use(errorMiddleware);

app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/subscriptions',SubscriptionRouter);
app.use('/api/v1/reviews', ReviewRouter);

app.get('/', (req, res) => {
    res.send("Welcome to Subscription Tracker API!")
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API running on http://localhost:${PORT}`)

    await connectToDatabase();
})

export default app;
