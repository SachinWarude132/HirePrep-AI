 
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");


// =========================
// REGISTER USER
// =========================

async function RegisterUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        // Check if user already exists
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists with this email or username"
            });
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User has been registered",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong while registering"
        });
    }
}


// =========================
// LOGIN USER
// =========================

async function LoginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });

        // Don't reveal whether the email exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User successfully logged in",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong while logging in"
        });
    }
}


// =========================
// LOGOUT USER
// =========================

async function UserLogout(req, res) {
    try {
        const { token } = req.cookies;

        if (token) {
            await tokenBlacklistModel.create({
                token
            });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "User has logged out"
        });

    } catch (error) {
        console.error("LOGOUT ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong while logging out"
        });
    }
}


// =========================
// GET CURRENT USER
// =========================

async function getme(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("GET ME ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}


module.exports = {
    RegisterUser,
    LoginUser,
    UserLogout,
    getme
};

