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
// router.post('/register', authenticateJWT, async (req, res) => {
//     try {
//         const { model, vehicleNumber } = req.body;
//         const userId = req.user.id;

//         if (!model || !vehicleNumber) {
//             return res.status(400).json({
//                 error: "Model and Vehicle number are required"
//             });
//         }

//         const existingScooter = await prisma.scooter.findFirst({
//             where: {
//                 vehicleNumber,
//                 userId
//             }
//         });

//         if (existingScooter) {
//             return res.status(400).json({
//                 error: "Vehicle already registered"
//             });
//         }

//         // Create new scooter
//         const newScooter = await prisma.scooter.create({
//             data: {
//                 vehicleNumber,
//                 model,
//                 userId
//             }
//         });

//         res.status(201).json({
//             message: "Scooter successfully registered",
//             scooter: newScooter // Corrected here
//         });
//     } catch (e) {
//         console.error("Error during registration", e);
//         return res.status(500).json({
//             error: "Internal server error"
//         });
//     }
// });


// router.get('/details', authenticateJWT, async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Check if scooters are cached
//         const cachedScooters = await redisClient.get(`scooters:${userId}`);

//         if (cachedScooters) {
//             return res.status(200).json({
//                 message: "Scooters fetched successfully",
//                 scooters: JSON.parse(cachedScooters)
//             });
//         }

//         // Fetch scooters from the database
//         const scooters = await prisma.scooter.findMany({
//             where: { userId }
//         });

//         if (scooters.length === 0) {
//             return res.status(404).json({
//                 error: "No scooters found"
//             });
//         }

//         // Cache the scooters for future access (TTL of 1 hour)
//         await redisClient.set(`scooters:${userId}`, JSON.stringify(scooters), { EX: 3600 });

//         res.status(200).json({
//             message: "Scooters fetched successfully",
//             scooters
//         });
//     } catch (e) {
//         console.error("Error fetching scooters", e);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

router.post('/register', authenticateJWT, async (req, res) => {
    try {
        const { model, vehicleNumber } = req.body;
        const userId = req.user.id;

        if (!model || !vehicleNumber) {
            return res.status(400).json({
                error: "Model and Vehicle number are required"
            });
        }

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

        // Invalidate cached scooters for the user
        await redisClient.del(`scooters:${userId}`);

        res.status(201).json({
            message: "Scooter successfully registered",
            scooter: newScooter
        });
    } catch (e) {
        console.error("Error during registration", e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


router.get('/details', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const fetchFresh = req.query.fresh === 'true';  // Check if fresh data is requested

        // Check if scooters are cached and bypass if fresh data is requested
        if (!fetchFresh) {
            const cachedScooters = await redisClient.get(`scooters:${userId}`);

            if (cachedScooters) {
                return res.status(200).json({
                    message: "Scooters fetched successfully",
                    scooters: JSON.parse(cachedScooters)
                });
            }
        }

        // Fetch fresh scooters from the database
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

router.delete('/delete/:vehicleNumber', authenticateJWT, async (req, res) => {
    try {
        const { vehicleNumber } = req.params;
        const userId = req.user.id;

        // Check if the scooter exists
        const scooter = await prisma.scooter.findFirst({
            where: {
                vehicleNumber,
                userId
            }
        });

        if (!scooter) {
            return res.status(404).json({
                error: "Scooter not found"
            });
        }

        // Delete the scooter
        await prisma.scooter.delete({
            where: {
                id: scooter.id
            }
        });

        // Invalidate the cache for the user
        await redisClient.del(`scooters:${userId}`);

        res.status(200).json({
            message: "Scooter deleted successfully"
        });
    } catch (e) {
        console.error("Error deleting scooter", e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.delete('/delete/all', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Deleting scooters for user:', userId); // Log userId

        // Check if there are scooters for the user
        const scooters = await prisma.scooter.findMany({
            where: { userId }
        });

        console.log('Scooters found:', scooters); // Log the found scooters

        if (scooters.length === 0) {
            return res.status(404).json({
                error: "No scooters found"
            });
        }

        // Delete all scooters for the user
        await prisma.scooter.deleteMany({
            where: { userId }
        });

        // Invalidate the cache for the user
        await redisClient.del(`scooters:${userId}`);

        res.status(200).json({
            message: "All scooters deleted successfully"
        });
    } catch (e) {
        console.error("Error deleting scooters", e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});



export default router;
