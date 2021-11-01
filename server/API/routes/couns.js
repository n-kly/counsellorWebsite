import express from 'express';
import counsellorEmail from '../models/counsellorEmail.model.js';

const router = express.Router();

// Read
router.get('/read', (req, res) => {
    counsellorEmail.find()
        .then((counsellorEmail) => res.json(counsellorEmail))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.patch('/edit', (req, res) => {
    console.log(req.body)
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
});

// Create
router.post('/create', (req, res) => {
    const name = req.body.name;
    const counsEmail = req.body.counsEmail;
    const receiveEmail = req.body.receiveEmail;

    const newCounsEmail = new counsellorEmail({
        name,
        counsEmail,
        receiveEmail,
    });

    newCounsEmail.save()
        .then(() => res.json('Counsellor email added'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/remove', (req, res) => {
    counsellorEmail.findByIdAndDelete(req.body.id)
        .then(() => {res.json('Couns deleted');})
        .catch((err) => {res.status(400).json('Error: ' + err)});
});

export default router;
