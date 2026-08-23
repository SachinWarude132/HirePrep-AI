const userModel =  require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")



async function RegisterUser(req,res) {
    
    const { username , email , password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email ,password"
        })
    }


const isUserAlreadyExists = await userModel.findOne({
    $or:[
        {username},{email}
    ]
})

if(isUserAlreadyExists){
    return res.status(400).json({
        message:"Account already  exists with this email or username"
    })
}

const hash =  await bcrypt.hash(password,10)
const user =  await userModel.create({
    username,
    email,
    password:hash 
})

const token = jwt.sign(
 {  id :user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

    res.cookie("token",token)
return res.status(201).json({
    message:"User has been registered ",
    user:{
        username:user.username,
        email:user.email
    }
})}
    
// login controller 

async function LoginUser(req,res) {

    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(404).json({
            message:"User Does not fonud "
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)
     
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Password does not Match"
        })  

    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    return res.status(201).json({
        message:"User Successfully logged In",
        user:{
            username : user.username,
            email: user.email,
        }
    })

}


async function UserLogout(req,res) {
    const {token} = req.cookies
  if(token){
     await tokenBlacklistModel.create({ token })
  }
res.clearCookie("token");
  
  res.status(200).json({
    message:"User has Logged Out"
  })
}

async function getme (req,res){
    const user = await userModel.findById(req.user.id)
    
    return res.status(200).json({
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports ={
    RegisterUser,
    LoginUser,
    UserLogout,
    getme
}