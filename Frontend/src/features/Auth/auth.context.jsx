import { useEffect } from "react";
import { createContext,useState } from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext()

 export const AuthProvider = ({children})=>{
    
   const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

 
    useEffect(() => {
    const getandsetUser = async () => {
        try {
            const data = await getme();
            setUser(data?.user);
        } catch (error) {
            console.log(error)
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    getandsetUser();
}, []);


    return (
        <AuthContext.Provider value={{user ,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )

 }