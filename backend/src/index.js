import express from 'express';
import accidentRouter from './routes/accident.js';
import alertRouter from './routes/alert.js';
import locationRouter from './routes/location.js';
import scooterRouter from './routes/scooter.js';
import userRouter from './routes/user.js';

const app = express();
const port = 3000;

app.use(express.json());

// const accidentRouter = require('./routes/accident');
// const alertRouter = require('./routes/alert');
// const authRouter = require('./routes/auth');
// const locationRouter = require('./routes/location');
// const scooterRouter = require('./routes/scooter');
// const userRouter = require('./routes/user');


app.use('/v1/accident', accidentRouter);
app.use('/v1/alert', alertRouter);
app.use('/v1/location', locationRouter);
app.use('/v1/scooter', scooterRouter);
app.use('/v1/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
