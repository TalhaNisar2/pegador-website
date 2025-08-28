const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const multer = require('multer');
const path = require('path');

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage });

async function userSignUp(req, res) {
    try {
        const { email, password, name } = req.body; // Use a single 'name' field
        const profilePic = req.file ? req.file.path : null;

        // Validate input
        if (!email) throw new Error("Please provide email");
        if (!name) throw new Error("Please provide name");
        if (!password) throw new Error("Please provide password");

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new userModel({
            email,
            name,                // Now properly defined
            password: hashedPassword,
            role: 'GENERAL',
            profilePic
        });

        // Save user to the database
        await user.save();

        // Respond with success
        res.status(201).json({
            message: "User signed up successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = {
    userSignUp,
    upload
};
