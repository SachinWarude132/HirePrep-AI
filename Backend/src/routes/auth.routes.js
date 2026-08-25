const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authRouter = express.Router()
const authMiddleware = require("../middleware/auth.middleware")

/**
 * @route POST /api/auth/register 
 * @description : register a new user 
 */
authRouter.post("/register",authcontroller.RegisterUser)

/**
 * @route POST /api/auth/login
 * @description : Login the existing user 
 */
authRouter.post("/login",authcontroller.LoginUser)

/**
 * @route POST /api/auth/logout
 * @description : Logout the current user 
 */
authRouter.post("/logout", authcontroller.UserLogout)

/**
 * @route GET /api/auth/get-me
 * @description : get the user data
 */
authRouter.get("/get-me", authMiddleware.AuthUser,authcontroller.getme)












module.exports =authRouter