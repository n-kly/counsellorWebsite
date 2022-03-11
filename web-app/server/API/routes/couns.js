// Counselor route, featuring all endpoints

import express from 'express';
import counsellorEmail from '../models/counsellorEmail.model.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Read
router.get('/read', (req, res) => {
    counsellorEmail.find()
        .then((counsellorEmail) => res.json(counsellorEmail))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.patch('/edit', (req, res) => {
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        counsellorEmail.findById(req.body.id)
        .then((counsellorEmail) => {
            counsellorEmail.name = req.body.name;
            counsellorEmail.counsEmail = req.body.counsEmail;
            counsellorEmail.receiveEmail = req.body.receiveEmail;


            counsellorEmail.save()
                .then(() => res.json('Couns updated'))
                .catch((err) => res.status(400).json('Error1: ' + err));
        })
        .catch((err) => res.status(400).json('Error2: ' + err));
    } else {
        res.status(403).json('Invalid Token')
    }
});

// Create
router.post('/create', (req, res) => {
    const name = req.body.name;
    const counsEmail = req.body.counsEmail;
    const receiveEmail = req.body.receiveEmail;
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        const newCounsEmail = new counsellorEmail({
            name,
            counsEmail,
            receiveEmail,
        });
    
        newCounsEmail.save()
        .then(() => res.json('Counsellor email added'))
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json('Invalid Token')
    }
});

router.delete('/remove', (req, res) => {
    let token = req.body.adminToken

    if(!!token && jwt.verify(token, process.env.JWT_SECRET)){
        counsellorEmail.findByIdAndDelete(req.body.id)
        .then(() => {res.json('Couns deleted');})
        .catch((err) => {res.status(400).json('Error: ' + err)});
    } else {
        res.status(403).json('Invalid Token')
    }
});

export default router;
