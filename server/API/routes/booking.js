import express from "express";
import bookingDateInfo from '../models/bookingDateInfo.model.js';

const router = express.Router();

// Get region data and date for calendar filtering
router.get('/readforform', (req,res) => {
    bookingDateInfo.find({"aptDate" : {$gte: new Date()}},{aptDate:1, status:1, "booking.uniRegion":1}).sort('aptDate')
        .then(bookingDateInfo => res.json(bookingDateInfo))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create a booking
router.put('/create', (req,res)=> {
    const aptDate = req.body.aptDate
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    const newBooking = new bookingDateInfo({
        aptDate:aptDate,
        status:status,
        booking:{
            uniName,
            uniRepName,
            uniRepJobTitle,
            uniRepEmail,
            uniRegion,
        }
    });

    bookingDateInfo.findOneAndUpdate({"aptDate":aptDate},newBooking)
        .then(()=> res.json('Booking created'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Read
router.get('/read', (req,res) => {
    bookingDateInfo.find()
        .then(bookingDateInfo => res.json(bookingDateInfo))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create
router.post('/create',(req,res)=>{
    const aptDate = req.body.aptDate
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    const newBooking = new bookingDateInfo({
        aptDate:aptDate,
        status:status,
        booking:{
            uniName,
            uniRepName,
            uniRepJobTitle,
            uniRepEmail,
            uniRegion,
        }
    });

    newBooking.save()
        .then(()=> res.json('Booking created'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Delete
router.delete('/delete/:id', (req,res) => {
    bookingDateInfo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Booking deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Update
router.patch('/update/:id', (req,res) => {
    bookingDateInfo.findById(req.params.id)
        .then(bookingDateInfo => {
            bookingDateInfo.booking.uniName = req.body.uniName;
            bookingDateInfo.booking.uniRepName = req.body.uniRepName;
            bookingDateInfo.booking.uniRepJobTitle = req.body.uniRepJobTitle;
            bookingDateInfo.booking.uniRepEmail = req.body.uniRepEmail;
            bookingDateInfo.booking.uniRegion = req.body.uniRegion;

            bookingDateInfo.save()
                .then(() => res.json('Booking updated'))
                .catch(err=> res.status(400).json('Error: ' + err));

        })
        .catch(err=> res.status(400).json('Error: ' + err));
})

export default router;