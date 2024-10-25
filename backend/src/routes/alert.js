import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';
import redisClient from '../services/redis/redis.js'; // Import the Redis client

dotenv.config();

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route to send alert messages
router.post('/send', async (req, res) => {
    const { accidentId, type, recipient, message } = req.body;

    try {
        if (!accidentId || !type || !recipient || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Send SMS or WhatsApp message
        if (type === 'SMS') {
            await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: recipient,
            });
        } else if (type === 'WhatsApp') {
            await client.messages.create({
                body: message,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                to: `whatsapp:${recipient}`,
            });
        } else {
            return res.status(400).json({ error: 'Invalid type. Must be SMS or WhatsApp' });
        }

        // Optionally, cache the alert information if needed
        await redisClient.set(`alert:${accidentId}`, JSON.stringify({ type, recipient, message }), { EX: 3600 });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default router;
