
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

// Create a new contact
router.post('/:userId/contact', async (req, res) => {
    const { userId } = req.params;
    const { contact } = req.body;

    if (!contact) {
        return res.status(400).json({ error: 'Contact is required' });
    }

    try {
        const newContact = await prisma.contact.create({
            data: {
                userId: userId,
                contact: contact,
            },
        });

        res.status(201).json(newContact);
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(400).json({ error: 'Error adding contact' });
    }
});

// Get all contacts for a user
router.get('/:userId/contacts', async (req, res) => {
    const { userId } = req.params;

    try {
        const contacts = await prisma.contact.findMany({
            where: { userId: userId },
        });

        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(400).json({ error: 'Error fetching contacts' });
    }
});

export default router;
