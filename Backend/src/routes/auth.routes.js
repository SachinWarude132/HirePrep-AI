const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authRouter = express.Router()
const authMiddleware = require("../middleware/auth.middleware")

/**
 * @route POST /api/auth/register 
 * @description : register a new user 
 */
authRouter.post("/register",authcontroller.RegisterUser)

authRouter.post("/login",authcontroller.LoginUser)

authRouter.post("/logout", authcontroller.UserLogout)

authRouter.get("/get-me", authMiddleware.AuthUser,authcontroller.getme)












module.exports =authRouter