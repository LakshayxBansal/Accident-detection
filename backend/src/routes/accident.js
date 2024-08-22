// Accident Management
// POST /v1/accident/report – Send an alert of the accident with the location(longitude and latitude)
// GET /v1/accident/history – Get accident history. 

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
const prisma = new PrismaClient().$extends(withAccelerate());
import { Router } from 'express';

const router = Router();


router.post('/report', async(req, res) => {
    res.send("Report Accident");
});

router.get('/history', async(req, res) => {
   res.send("Accident History");
});


export default router;

