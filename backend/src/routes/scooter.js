// Route to register a scooter for a user.
// POST /v1/scooter/register – Register a scooter.
// GET /v1/scooter/details – Fetch scooter details.
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient().$extends(withAccelerate());
const secretKey = process.env.JWT_SECRET


// Middleware ( for authentication of user) 
const authenticateJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({
        error: "Token is unavailable"
    })

    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.status(403).json({
                error: "Error during authentication "
            })
        }
        req.user = user;
        next();
    })
}


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


// Details of register scooter for the user
router.get('/details',authenticateJWT,async(req,res)=>{
    try{
        const userId = req.user.id ; 
        const scooters = await prisma.scooter.findMany({
            where : {
                userId
            }
        });

        if(scooters.length === 0){
            return res.status(404).json({
                error: "No scooters found"
            })
        }

        res.status(200).json({
            message: "Scooters fetched successfully",
            scooters
        })
    }catch(e){
        console.error("Error fetcching scooter",e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

export default router;