import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../UI/Navbar.js';
import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const navigate = useNavigate()

  const navLinks = [
    { text: "Home", url: "/"},
    { text: "Sign Up", url: "/signup"}
  ]

  const onButtonClick = async() => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    await logIn();
  }

  const logIn = async() => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password
    });
    
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/auth/login`, {
      method: "POST",
      headers: myHeaders,
      body: body
    })      
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      return response.json()
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify({ email, token: data.token }))
      props.setLoggedIn(true);
      props.setEmail(email);
      // navigate to path
      navigate(`/${email}`);
    })
    .catch((error) => {
      window.alert('Wrong email or password');
      console.error(`Error: ${error}`);
    });
  };
  
  return (
    <>
      <Navbar links={navLinks}/>
      <div className='mainContainer'>
        <div className='titleContainer'>
          <div>Login</div>
        </div>
        <div className='inputContainer'>
          <input
            value={email}
            placeholder="Enter your email here"
            type='email'
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
            required
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className='inputContainer'>
          <input
            value={password}
            type='password'
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
            required
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className='buttonContainer'>
          <button className='user-button' type="button" onClick={onButtonClick}>
            Log In
          </button>
        </div>
      </div>
    </>
  )
}

export default Login