// Accident Management
// POST /api/accident/report – Report an accident.
// GET /api/accident/history – Get accident history.

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

