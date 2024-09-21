import express from 'express';
import accidentRouter from './routes/accident.js';
import alertRouter from './routes/alert.js';
import scooterRouter from './routes/scooter.js';
import userRouter from './routes/user.js';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use('/v1/accident', accidentRouter);
app.use('/v1/alert', alertRouter);
app.use('/v1/scooter', scooterRouter);
app.use('/v1/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
