 
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
async function AuthUser (req,res,next){

    const token = req.cookies.token
   
if(!token){
    return res.status(401).json({
        message:"Invalid request"
    })
}

Istokenblacklisted = await tokenBlacklistModel.findOne({token})

if(Istokenblacklisted){
    return res.status(401).json({
        message:"Token is invalid"
    })
}

   try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = decoded
     next();

   }  
   catch(err){
            return res.status(401).json("Invalid Token")
   }
}

module.exports={
    AuthUser
}