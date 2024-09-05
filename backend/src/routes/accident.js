
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import {authenticateJWT} from '../middleware/middleware.js'
import { Router } from 'express';
const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
import dotenv from 'dotenv';
dotenv.config();


router.post('/report', authenticateJWT, async (req, res) => {
    try {
        const { scooterId, location } = req.body;

        // Validate input
        if (!scooterId || !location) {
            return res.status(400).json({ error: 'Location and ScooterId are required' });
        }

        // Find the scooter and include the related user
        const scooter = await prisma.scooter.findUnique({
            where: { id: scooterId },
            include: { user: true },
        });

        // Check if the scooter exists
        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found in the database' });
        }

        // Create the accident report
        const newAccident = await prisma.accident.create({
            data: {
                userId: scooter.userId,
                scooterId,
                location,
            },
        });

        // Send the SMS alert to the user's contact
        // Construct the message with location details
        const message = `Accident detected at location Latitude: ${location.latitude}, Longitude: ${location.longitude}. Immediate assistance required.`;

        const alertResponse = await axios.post(`${process.env.BASE_URL}/v1/alert/send`, {
            accidentId: newAccident.id,
            type: 'SMS', // or 'WhatsApp'
            recipient: scooter.user.contact,
            message, // Send the constructed message
        }, {
            headers: {
                Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
            },
        });


        // Respond with success message
        res.status(201).json({
            message: 'Accident reported successfully and alert sent',
            accident: newAccident,
            alert: alertResponse.data,
        });
    } catch (error) {
        console.error('Error reporting accident:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;