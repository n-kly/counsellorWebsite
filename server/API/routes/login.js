import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import counsellorEmail from '../models/counsellorEmail.model.js';

dotenv.config();

const router = express.Router();

router.post('/login', async (req,res) =>{
    const password = req.body.password;
    const email = req.body.email;

    const exists = await counsellorEmail.exists({counsEmail:email});

    if (password === process.env.ADMIN_PASSWORD && exists){
        const token = jwt.sign({email:email},process.env.JWT_SECRET);
        res.status(200).json({adminToken:token});
    } else{
        res.status(200).json('FALSE');
    }
});

router.post('/verify', (req,res) =>{
    const token = req.body.adminToken;
    if(!!token){
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (verified){
            res.status(200).json(true);
        } else {
            res.status(200).json(false)
        }
    } else {
        res.status(200).json(false)
    }
    
})

export default router;