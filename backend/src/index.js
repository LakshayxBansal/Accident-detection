// import express from 'express';
// import accidentRouter from './routes/accident.js';
// import alertRouter from './routes/alert.js';
// import scooterRouter from './routes/scooter.js';
// import userRouter from './routes/user.js';
// import contactRouter from './routes/contact.js';
// import cors from 'cors';

// const app = express();
// const port = 3000;

// // CORS Configuration
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// };

// app.use(cors(corsOptions)); // Use CORS with options
// app.use(express.json()); // Middleware to parse JSON requests

// // Route Definitions
// app.use('/v1/accident', accidentRouter);
// app.use('/v1/alert', alertRouter);
// app.use('/v1/scooter', scooterRouter);
// app.use('/v1/user', userRouter);
// app.use('/v1/contact', contactRouter);

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



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