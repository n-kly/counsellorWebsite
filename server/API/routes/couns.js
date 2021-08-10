import express from "express";
import counsellorEmail from "../models/counsellorEmail.model.js";

const router = express.Router();

// Read
router.get('/read', (req,res) => {
    counsellorEmail.find()
        .then(counsellorEmail => res.json(counsellorEmail))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Create
router.post('/create',(req,res)=>{
    const name = req.body.name;
    const counsEmail = req.body.counsEmail;

    const newCounsEmail = new counsellorEmail({
        name,
        counsEmail,
    });

    newCounsEmail.save()
        .then(()=> res.json('Counsellor email added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Delete
router.delete('/delete/:id', (req,res) => {
    counsellorEmail.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router;