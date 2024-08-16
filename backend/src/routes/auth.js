// Authentication
// POST /api/auth/signup – Register new users.
// POST /api/auth/login – User login and JWT generation.
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
const secretKey = process.env.JWT_SECRET

router.post('/signup' , async(req, res)=>{
    
    try{
        const { name, email, username, password, contact, bday } = req.body;
        if (!name || !email || !username || !password || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password : hashedPassword,
                contact,
                bday,
            }
        });
        const token = jwt.sign({ id: user.id }, secretKey);

        return res.status(201).json({
            message: 'User created successfully',
            user,
            token});
    } catch(e){
        return res.status(400).json({error: 'User already exists'})
    }
})


router.post('/login', async(req,res)=>{
    const { username , password } = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'All fields are required'});
    }

    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    });

    if(!user){
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const token = jwt.sign({ id: user.id} , secretKey, {expiresIn: '1h'});


    res.status(200).json({message: 'Login successful', user,token});
})

export default router;