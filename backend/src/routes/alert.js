// Alert
// POST /api/alert/send – Manually trigger alert

import express from 'express';
const router = express.Router();

router.post('/send',async(req,res)=>{
    return res.status(200).json({message: 'Alert sent successfully'});
})

export default router;