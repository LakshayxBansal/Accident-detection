
// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate';
// import {authenticateJWT} from '../middleware/middleware.js'
// import { Router } from 'express';
// const router = Router();
// import redisClient from '../services/redis/redis.js';
// const prisma = new PrismaClient().$extends(withAccelerate());
// import dotenv from 'dotenv';
// dotenv.config();


// router.post('/report', authenticateJWT, async (req, res) => {
//     try {
//         const { scooterId, location } = req.body;

//         if (!scooterId || !location) {
//             return res.status(400).json({ error: 'Location and ScooterId are required' });
//         }

//         const scooter = await prisma.scooter.findUnique({
//             where: { id: scooterId },
//             include: { user: true },
//         });

//         if (!scooter) {
//             return res.status(404).json({ error: 'Scooter not found' });
//         }

//         const newAccident = await prisma.accident.create({
//             data: {
//                 userId: scooter.userId,
//                 scooterId,
//                 location,
//             },
//         });

//         const message = `Accident detected at location Latitude: ${location.latitude}, Longitude: ${location.longitude}. Immediate assistance required.`;

//         const alertResponse = await axios.post(`${process.env.BASE_URL}/v1/alert/send`, {
//             accidentId: newAccident.id,
//             type: 'SMS',
//             recipient: scooter.user.contact,
//             message,
//         });

//         // Cache the accident report
//         await redisClient.set(`accident:${newAccident.id}`, JSON.stringify(newAccident), { EX: 3600 });

//         res.status(201).json({
//             message: 'Accident reported successfully and alert sent',
//             accident: newAccident,
//             alert: alertResponse.data,
//         });
//     } catch (error) {
//         console.error('Error reporting accident:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// export default router;



import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import {authenticateJWT} from '../middleware/middleware.js'
import { Router } from 'express';
const router = Router();
import redisClient from '../services/redis/redis.js';
const prisma = new PrismaClient().$extends(withAccelerate());
import dotenv from 'dotenv';
dotenv.config();


router.post('/report', authenticateJWT, async (req, res) => {
    try {
        const { scooterId, location } = req.body;

        if (!scooterId || !location) {
            return res.status(400).json({ error: 'Location and ScooterId are required' });
        }

        const scooter = await prisma.scooter.findUnique({
            where: { id: scooterId },
            include: { user: true },
        });

        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found' });
        }

        const newAccident = await prisma.accident.create({
            data: {
                userId: scooter.userId,
                scooterId,
                location,
            },
        });

        const message = `Accident detected at location Latitude: ${location.latitude}, Longitude: ${location.longitude}. Immediate assistance required.`;

        const alertResponse = await axios.post(`${process.env.BASE_URL}/v1/alert/send`, {
            accidentId: newAccident.id,
            type: 'SMS',
            recipient: scooter.user.contact,
            message,
        });

        // Cache the accident report
        await redisClient.set(`accident:${newAccident.id}`, JSON.stringify(newAccident), { EX: 3600 });

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