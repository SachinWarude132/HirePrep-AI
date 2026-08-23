import React from 'react'
import "../auth.form.scss"
import { Link,useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
 

const Login = () => {

  const [email, setEmail] = useState("")
  const [password ,setPassword] = useState("")
  
  const Navigate =useNavigate()
  const {loading ,handleLogin} =useAuth() 
  
  function HandleSubmit(e){
    e.preventDefault();
    handleLogin({email,password})
    Navigate("/")

  }
  if(loading){
    return(<main><h1>Loading......</h1></main>)
  }

  return (
    <main>
      <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>

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

                  <button type="submit" className='button primary-button'>Login</button>
            </form>
             <p>Don't Have an Account  <Link to={"/register"}>Sign Up</Link></p>
      </div>
    </main>
  )
}

export default Login