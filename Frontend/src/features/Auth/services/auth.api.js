import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})


 export async function register({username ,email,password}) {

    try{
        const responce = await api.post("/register",
        {username,email,password})
         return responce.data
    }
    catch(err){
        console.log(err.message)
    }
    
}

 export async function login({email,password}) {

    try{
        const responce = await api.post("/login",
        {email,password})
         return responce.data
    }
    catch(err){
        console.log(err.message)
    }
    
}

 export async function logout() {
    try{
        const responce = await api.post("/logout")
         return responce.data
    }
    catch(err){
        console.log(err.message)
    }}
 export async function getme() {
    try{
        const responce = await api.get("/get-me")
         return responce.data
    }
    catch(err){
        console.log(err.message)
    }}