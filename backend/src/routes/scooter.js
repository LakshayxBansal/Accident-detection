// Route to register a scooter for a user.
// POST /v1/scooter/register – Register a scooter.
// GET /v1/scooter/details – Fetch scooter details.
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';
import { authenticateJWT } from '../middleware/middleware.js';
import redisClient from '../services/redis/redis.js';

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
const secretKey = process.env.JWT_SECRET


// Add a scooter for the user
router.post('/register', authenticateJWT, async (req, res) => {
    try {
        const { model, vehicleNumber } = req.body;
        const userId = req.user.id;

        if (!model || !vehicleNumber) {
            return res.status(400).json({
                error: "Model and Vehicle number are required"
            });
        }

        // Check for duplicate scooter
        const existingScooter = await prisma.scooter.findFirst({
            where: {
                vehicleNumber,
                userId
            }
        });

        if (existingScooter) {
            return res.status(400).json({
                error: "Vehicle already registered"
            });
        }

        // Create new scooter
        const newScooter = await prisma.scooter.create({
            data: {
                vehicleNumber,
                model,
                userId
            }
        });

        res.status(201).json({
            message: "Scooter successfully registered",
            scooter: newScooter // Corrected here
        });
    } catch (e) {
        console.error("Error during registration", e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


// // Details of register scooter for the user
// router.get('/details',authenticateJWT,async(req,res)=>{
//     try{
//         const userId = req.user.id ; 
//         const scooters = await prisma.scooter.findMany({
//             where : {
//                 userId
//             }
//         });

//         if(scooters.length === 0){
//             return res.status(404).json({
//                 error: "No scooters found"
//             })
//         }

//         res.status(200).json({
//             message: "Scooters fetched successfully",
//             scooters
//         })
//     }catch(e){
//         console.error("Error fetching scooter",e);
//         return res.status(500).json({
//             error: "Internal server error"
//         });
//     }
// })

router.get('/details', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if scooters are cached
        const cachedScooters = await redisClient.get(`scooters:${userId}`);

        if (cachedScooters) {
            return res.status(200).json({
                message: "Scooters fetched successfully",
                scooters: JSON.parse(cachedScooters)
            });
        }

        // Fetch scooters from the database
        const scooters = await prisma.scooter.findMany({
            where: { userId }
        });

        if (scooters.length === 0) {
            return res.status(404).json({
                error: "No scooters found"
            });
        }

        // Cache the scooters for future access (TTL of 1 hour)
        await redisClient.set(`scooters:${userId}`, JSON.stringify(scooters), { EX: 3600 });

        res.status(200).json({
            message: "Scooters fetched successfully",
            scooters
        });
    } catch (e) {
        console.error("Error fetching scooters", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
