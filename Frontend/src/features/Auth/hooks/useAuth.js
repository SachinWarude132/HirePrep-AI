import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,getme,logout } from "../services/auth.api";


export const useAuth =  ()=>{
    const context = useContext(AuthContext)
    const {user ,setUser,loading,setLoading} = context

    const handleRegister = async({username,email,password})=>{
        setLoading(true)
       const data = await register({username,email,password})
       setUser(data.user)
       setLoading(false)
    }

    const handleLogin = async({email,password})=>{

        setLoading(true)
        const data = await login({email,password})
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async()=>{
        setLoading(true)
        const data = await logout()
        setUser(null)
    }

    const handleGetme = async ()=>{
        setLoading(true)
        const data = await getme()
        setUser(data.user)
    }

    return{
        user,loading,handleLogin,handleRegister,handleGetme,handleLogout
    }
}