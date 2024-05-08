import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css";

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const onSignUpClick = () => {
    navigate('/signup')
  }

  const navigate = useNavigate()

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
    
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: myHeaders,
      body: body
    })      
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
  };
  
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
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
      <br />
      <div className={'inputContainer'}>
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
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton login'} type="button" onClick={onButtonClick} value={'Log in'} />
        <input
          className={'inputButton login'}
          type="button"
          onClick={onSignUpClick}
          value="Sign Up"
        />
      </div>
    </div>
  )
}

export default Login