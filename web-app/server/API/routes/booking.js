// Booking route, featuring all endpoints

import express, { query } from 'express';
import bookingDateInfo from '../models/bookingDateInfo.model.js';
import counsellorEmail from '../models/counsellorEmail.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios'
import jwt from 'jsonwebtoken'

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
        accessToken: process.env.OAUTH_ACCESS_TOKEN
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function getLogo(uniName){
    let query = (uniName.replace(/ /g,"+")) + "+Logo" // Create query string
    let queryString = 
    `https://serpapi.com/search.json?engine=google&q=${query}&google_domain=google.com&gl=us&hl=en&safe=active&tbm=isch&api_key=${process.env.IMAGE_API_KEY}`
    let res = await axios.get(queryString) // Get result 
    let imageURL = await res.data.images_results[0].thumbnail // Filter for first result
    return await imageURL
}

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
router.post('/create', (req, res) => {
    const aptDate = req.body.aptDate;
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    getLogo(uniName)
    .then( logoUrl => {
        const newBooking = {
            aptDate: aptDate,
            status: status,
            booking: {
                uniName,
                uniRepName,
                uniRepJobTitle,
                uniRepEmail,
                uniRegion,
                logoUrl,
            },
        };
        
        bookingDateInfo.findOneAndUpdate(
            { aptDate: aptDate }, 
        newBooking)
        .then(() => {
            res.json('Booking created'); 
            let mailOptions = {
                from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                to: uniRepEmail,
                subject: 'Your presentation information',
                text: `Thank you for signing up ${uniRepName}!
                Your presentation is at ${aptDate}`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent');
                }
            });

            counsellorEmail.find({ receiveEmail: true })
            .then((counsList)=>{
                counsList.forEach((couns)=>{
                    let counsMailOptions = {
                        from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                        to: couns.counsEmail,
                        subject: 'Booking Created',
                        text: `${uniRepName} has just registered for the: ${uniName}!
                        The date they registered for is: ${aptDate}
                        Representative's job title: ${uniRepJobTitle}
                        Representative's email: ${uniRepEmail}
                        University's region: ${uniRegion}`,
                    }

                    transporter.sendMail(counsMailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Message sent');
                        }
                    }); 
                })
            })
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
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
    let allowMail = req.body.allowMail;
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        bookingDateInfo.findById(req.body.id)
        .then((bookingDateInfo) => {
            bookingDateInfo.booking.uniName = req.body.booking.uniName;
            bookingDateInfo.booking.uniRepName = req.body.booking.uniRepName;
            bookingDateInfo.booking.uniRepJobTitle = req.body.booking.uniRepJobTitle;
            bookingDateInfo.booking.uniRepEmail = req.body.booking.uniRepEmail;
            bookingDateInfo.booking.uniRegion = req.body.booking.uniRegion;
            bookingDateInfo.booking.logoUrl = req.body.booking.logoUrl;
            bookingDateInfo.aptDate = req.body.aptDate;

            bookingDateInfo.save()
            .then(() => {
                res.json('Booking updated')
                if(allowMail){
                    let mailOptions = {
                        from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                        to: req.body.booking.uniRepEmail,
                        subject: 'Updated presentation information',
                        text: `Your booking information for a presentation with BISH has changed, new information:
                        University Name: ${req.body.booking.uniName}
                        Name ${req.body.booking.uniRepName}
                        Job title: ${req.body.booking.uniRepJobTitle}
                        Representative's email: ${req.body.booking.uniRepEmail}
                        University's region: ${req.body.booking.uniRegion}
                        Presentation date: ${req.body.aptDate}`,
                    };
        
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Message sent');
                        }
                    });
        
                    counsellorEmail.find({ receiveEmail: true })
                    .then((counsList)=>{
                        counsList.forEach((couns)=>{
                            let counsMailOptions = {
                                from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                                to: couns.counsEmail,
                                subject: 'Updated booking information',
                                text: `Updates have been made to a registered booking, new information:
                                University Name: ${req.body.booking.uniName}
                                Name ${req.body.booking.uniRepName}
                                Job title: ${req.body.booking.uniRepJobTitle}
                                Representative's email: ${req.body.booking.uniRepEmail}
                                University's region: ${req.body.booking.uniRegion}
                                Presentation date: ${req.body.aptDate}
                                Logo URL: ${req.body.booking.logoUrl}`,
                            }
    
                            transporter.sendMail(counsMailOptions, (err, info) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Message sent');
                                }
                            });
                        })
                    })
                }
            })
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json('Invalid Token')
    }
});

// Remove a booking
router.delete('/remove', (req, res) => {
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        bookingDateInfo.findByIdAndDelete(req.body.id)
        .then(() => {res.json('Booking deleted');})
        .catch((err) => {res.status(400).json('Error: ' + err)});
    } else {
        res.status(403).json('Invalid Token')
    }
});

// Edit dates
router.post('/editcalendar', (req, res) =>{
    let changeLog = req.body.changeLog
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        let changes =  []
        Object.keys(changeLog).forEach((key) => {
            if(changeLog[key]==true){
                changes.push({'insertOne':{"document":{aptDate:key,status:"Available"}}})
            } else {
                changes.push({'deleteOne':{"filter":{aptDate:key}}})
            }
        });

        bookingDateInfo.bulkWrite(changes)
        .then(() => {
            res.json('Dates updated')
            counsellorEmail.find(
                { receiveEmail: true },
                { counsEmail: 1 }
            )
            .then((counsList)=>{
                Object.keys(changeLog).forEach((key) => {
                    let text = '';
                    if(changeLog[key]==true){
                        text = `${text} \n ${key} - Added`
                    } else {
                        text = `${text} \n ${key} - Removed`
                    }
                })

                counsList.forEach((couns)=>{
                    let counsMailOptions = {
                        from: 'BISH Signup <bishvirtualsignup@gmail.com> ',
                        to: couns.counsEmail,
                        subject: 'Changes to available dates',
                        text: `Updates have been made to the list of available dates:
                        ${text}`,
                    }

                    transporter.sendMail(counsMailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Message sent');
                        }
                    });
                })
            })
        })
        .catch((err) => {res.status(400).json('Error: ' + err)})
    } else {
        res.status(403).json('Invalid Token')
    }
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

    getLogo(uniName).then( logoUrl => {
        const newBooking = new bookingDateInfo({
            aptDate: aptDate,
            status: status,
            booking: {
                uniName,
                uniRepName,
                uniRepJobTitle,
                uniRepEmail,
                uniRegion,
                logoUrl,
            },
        });

        newBooking.save()
        .then(() => res.json('Booking created'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })   
});

export default router;
