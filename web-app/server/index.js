// Setting up server

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Some middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

// Routes
import bookingRouter from './API/routes/booking.js';
import counsRouter from './API/routes/couns.js';
import loginRouter from './API/routes/login.js'

app.use('/booking', bookingRouter);
app.use('/couns', counsRouter);
app.use('/login', loginRouter)
app.use('*', (req, res) => res.status(404).json({ error: 'Page not found' }));

// Connect to database
const url = process.env.ATLAS_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true});
const connection = mongoose.connection;
connection.once('open', () => {console.log('Connected to MongoDB');});

// Start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

mongoose.set('useFindAndModify', false);
