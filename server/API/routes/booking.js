import express from 'express';
import bookingDateInfo from '../models/bookingDateInfo.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();

// Create nodemail transporter with gmail authorization
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAUTH2',
        user: 'bishvirtualsignup@gmail.com',
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// async function getLogo(){
    
// }

const router = express.Router();

// Get data for calendar formatting
router.get('/readforform', (req, res) => {
    bookingDateInfo.find(
        { aptDate: { $gte: new Date() } },
        { aptDate: 1, status: 1, 'booking.uniRegion': 1 })
        .sort('aptDate')
        .then((bookingDateInfo) => res.json(bookingDateInfo))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// Create a booking
router.put('/create', (req, res) => {
    const aptDate = req.body.aptDate;
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    const newBooking = {
        aptDate: aptDate,
        status: status,
        booking: {
            uniName,
            uniRepName,
            uniRepJobTitle,
            uniRepEmail,
            uniRegion,
        },
    };

    bookingDateInfo.findOneAndUpdate(
        { aptDate: aptDate }, 
        newBooking)
        .then(() => {
            res.json('Booking created');
            // Create mail 
            let mailOptions = {
                from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                to: uniRepEmail,
                subject: 'Your presentation information',
                text: `Thank you for signing up ${uniRepName}!
                Your presentation is at ${aptDate}`,
            };

            // Send mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent');
                }
            });
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});


// Get data for display
router.get('/readfordisplay', (req, res) => {
    bookingDateInfo.find(
        { aptDate: { $gte: new Date() }, status:"Booked"},
        { aptDate: 1, 'booking': 1 })
        .sort('aptDate')
        .then((bookingDateInfo) => res.json(bookingDateInfo))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// Edit a booking
router.patch('/editbooking', (req, res) => {
    bookingDateInfo.findById(req.body.id)
        .then((bookingDateInfo) => {
            bookingDateInfo.booking.uniName = req.body.booking.uniName;
            bookingDateInfo.booking.uniRepName = req.body.booking.uniRepName;
            bookingDateInfo.booking.uniRepJobTitle = req.body.booking.uniRepJobTitle;
            bookingDateInfo.booking.uniRepEmail = req.body.booking.uniRepEmail;
            bookingDateInfo.booking.uniRegion = req.body.booking.uniRegion;
            bookingDateInfo.aptDate = req.body.aptDate;

            bookingDateInfo.save()
                .then(() => res.json('Booking updated'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});


// Remove a booking
router.delete('/remove', (req, res) => {
    bookingDateInfo.findByIdAndDelete(req.body.id)
        .then(() => {res.json('Booking deleted');})
        .catch((err) => {res.status(400).json('Error: ' + err)});
});

// Edit dates
router.post('/editcalendar', (req, res) =>{
    let changeLog = req.body

    let changes =  []
    Object.keys(changeLog).forEach((key) => {
        if(changeLog[key]==true){
            changes.push({'insertOne':{"document":{aptDate:key,status:"Available"}}})
        } else {
            changes.push({'deleteOne':{"filter":{aptDate:key}}})
        }
    });

    bookingDateInfo.bulkWrite(changes)
        .then(() => {res.json('Dates updated');})
        .catch((err) => {res.status(400).json('Error: ' + err)})   
});

// Manually create a booking for insomnia
router.post('/createm', (req, res) => {
    const aptDate = req.body.aptDate;
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    const newBooking = new bookingDateInfo({
        aptDate: aptDate,
        status: status,
        booking: {
            uniName,
            uniRepName,
            uniRepJobTitle,
            uniRepEmail,
            uniRegion,
        },
    });

    newBooking.save()
        .then(() => res.json('Booking created'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

export default router;
