import express from "express";
import Contact from "../models/contact.model.js";

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            message: "Contact message submitted successfully",
            contactId: contact._id
        });
    } catch (error) {
        console.error("Contact POST error:", error);
        res.status(500).json({
            message: "Server error while submitting contact message"
        });
    }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages
 * @access  Admin (protect later)
 */
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.json({
            count: contacts.length,
            contacts
        });
    } catch (error) {
        console.error("Contact GET error:", error);
        res.status(500).json({
            message: "Server error while fetching contacts"
        });
    }
});

/**
 * @route   PATCH /api/contact/:id/respond
 * @desc    Mark contact as responded
 * @access  Admin
 */
router.patch("/:id/respond", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact message not found"
            });
        }

        contact.responded = true;
        await contact.save();

        res.json({
            message: "Contact message marked as responded"
        });
    } catch (error) {
        console.error("Contact PATCH error:", error);
        res.status(500).json({
            message: "Server error while updating contact"
        });
    }
});

export default router;
