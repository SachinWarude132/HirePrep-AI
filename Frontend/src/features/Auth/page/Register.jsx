import React from 'react'
import { useState } from 'react'
import { useNavigate ,Link  } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password ,setPassword] = useState("")
  
  const {loading,handleRegister} =useAuth();


  const Navigate = useNavigate()

  function HandleSubmit(e){
    e.preventDefault();
    console.log(username)
    console.log(email)
    console.log(password)
    handleRegister({username,email,password})
    Navigate("/login")


  }
    if(loading){
    return(<main><h1>Loading......</h1></main>)
  }


  return (
      <main>
      <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={HandleSubmit}>

                <div className='Input-group'>
                  <label htmlFor="Username">Username </label>
                  <input type="text" 
                  id='Username'
                    name='Username'
                    placeholder='Enter Your Username'
                    value={username}
                    onChange={(e)=>{
                      setUsername(e.target.value);
                    }}
                    />
                </div>

                <div className='Input-group'>
                  <label htmlFor="Email">Email </label>
                  <input type="text" name='Email' id='Email'
                   placeholder='Enter Your email address'
                      value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                   />
                </div>

                <div className='Input-group'>
                  <label htmlFor="Password">Password</label>
                  <input type="password" name='Password' id="Password"
                   placeholder='Enter Your Password'
                      value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value);
                    }}/>
                </div>

                  <button type="submit" className='button primary-button'>Register</button>
            </form>
            <p>already have an Accout ? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register