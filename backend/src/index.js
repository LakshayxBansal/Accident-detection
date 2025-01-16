
import express from 'express';
import cors from 'cors';

import accidentRouter from './routes/accident.js';
import alertRouter from './routes/alert.js';
import scooterRouter from './routes/scooter.js';
import userRouter from './routes/user.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());
app.use('/v1/accident', accidentRouter);
app.use('/v1/alert', alertRouter);
app.use('/v1/scooter', scooterRouter);
app.use('/v1/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});