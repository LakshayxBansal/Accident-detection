//Authentication
// POST /api/user/signup – Register new users.
// POST /api/user/login – User login and JWT generation.
// GET /api/user/profile – Fetch user profile.
// PUT /api/user/profile – Update user profile.


import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
const secretKey = process.env.JWT_SECRET;


// Signing up
router.post('/signup', async (req, res) => {
    try {
        const { name, email, username, password, contact, bday } = req.body;

        if (!name || !email || !username || !password || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const birthday = new Date(bday);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
                contact,
                bday: birthday,
            }
        });

        const token = jwt.sign({ id: user.id }, secretKey);

        return res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });
    } catch (e) {
        console.error("Signup Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Logging in 
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await prisma.user.findFirst({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, secretKey, {expire: '1h'});

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (e) {
        console.error("Login Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



// Middleware to authenticate the user using JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({
        error: "Token unavailable"
    });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({
            error : "Error during jwt verification"
        });
        req.user = user;
        next();
    });
};


// Get the details of the user
router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (e) {
        console.error("Profile Fetch Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Update the profile of the user
router.put('/update', authenticateJWT, async (req, res) => {
    try {
        const { username, password, email, contact, bday } = req.body;
        const userId = req.user.id;

        
        let hashedPassword = undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: username || undefined,
                password: hashedPassword || undefined,
                email: email || undefined,
                contact: contact || undefined,
                bday: bday ? new Date(bday) : undefined,
            },
        });

        res.status(200).json(updatedUser);
    } catch (e) {
        console.error("Update Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;

