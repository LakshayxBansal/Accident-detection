import { OAuth2Client } from 'google-auth-library'; // Ensure this import is at the top of your file

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';
import {authenticateJWT} from '../middleware/middleware.js'
import redisClient from '../services/redis/redis.js';

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
const secretKey = process.env.JWT_SECRET;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Replace with your actual Google Client ID



// Signing up
router.post('/signup', async (req, res) => {
    try {
        const { name, email, username, password, contact } = req.body;

        if (!name || !email || !username || !password || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
                contact,
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

        const token = jwt.sign({ id: user.id }, secretKey, {expiresIn: '1h'});

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (e) {
        console.error("Login Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get the details of the user

router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the user data is in the cache
        const cachedUser = await redisClient.get(`user:${userId}`);

        if (cachedUser) {
            return res.status(200).json(JSON.parse(cachedUser));
        }

        // If not found in cache, fetch from DB
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Store the fetched user data in Redis (with a TTL of 1 hour)
        await redisClient.set(`user:${userId}`, JSON.stringify(user),{ EX: 3600 });

        res.status(200).json(user);
    } catch (e) {
        console.error("Profile Fetch Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Update the profile of the user
router.put('/update', authenticateJWT, async (req, res) => {
    try {
        const { username, password, email, contact } = req.body;
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
            },
        });

        res.status(200).json(updatedUser);
    } catch (e) {
        console.error("Update Error:", e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Google Sign-in
router.post('/google-signup', async (req, res) => {
    const { token } = req.body;  // Token sent from the frontend
  
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }
  
    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      });
  
      const payload = ticket.getPayload();  // Extract user data from the Google token
      const { email, name } = payload;

      // Generate a username based on the user's name or email
      let username = name ? name.split(' ').join('') : email.split('@')[0]; // Remove spaces from the name or use the email prefix

      // Ensure the username is unique
      let existingUser = await prisma.user.findFirst({
        where: { username },
      });

      // If the username already exists, append a number to make it unique
      let counter = 1;
      while (existingUser) {
        username = `${username}${counter}`;
        existingUser = await prisma.user.findFirst({
          where: { username },
        });
        counter++;
      }
  
      // Check if the user already exists in the database
      let user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        // If the user doesn't exist, create a new user without a password field
        user = await prisma.user.create({
          data: {
            email,
            name,
            username,  // Using the generated username
            // password field is omitted as it's not required for Google login
          },
        });
      }
  
      // Generate a JWT token for the authenticated user
      const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Send the JWT token back to the frontend
      res.json({ token: jwtToken, user });
  
    } catch (error) {
      console.error('Error during Google authentication:', error);
      res.status(500).json({ error: 'Google authentication failed' });
    }
});


export default router;
