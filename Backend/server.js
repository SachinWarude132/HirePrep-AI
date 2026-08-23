require("dotenv").config();

 
const app =  require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB();

app.listen(3000 , ()=>{
    console.log("The server is running on the Port 3000 ")
})