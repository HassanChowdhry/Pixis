import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../UI/Navbar.js';
import "./Login.css";
  
const Signup = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const navigate = useNavigate()

  const navLinks = [
    { text: "Home", url: "/"},
    { text: "Log In", url: "/login"}
  ]
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    // Set initial error values to empty
    setFirstNameError('')
    setLastNameError('')
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === firstName) {
      setFirstNameError('Please enter your first name')
      return
    }

    if ('' === lastName) {
      setLastNameError('Please enter your last name')
      return
    }

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

    await signUp()
  };

  const signUp = async() => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password
    });
    
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/auth/signup`, {
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
      navigate(`/${email}`);
    })
    .catch((error) => {
      window.alert('User already exists please log in');
      console.error(`Error: ${error}`);
    });
  };

  return (
    <>
      <Navbar links={navLinks}/>
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Sign Up</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={'inputContainer'}>
            <input
              value={firstName}
              placeholder="Enter your first name"
              onChange={(ev) => setFirstName(ev.target.value)}
              className={'inputBox'}
              required
            />
            <label className="errorLabel">{firstNameError}</label>
            <input
              value={lastName}
              placeholder="Enter your last name"
              onChange={(ev) => setLastName(ev.target.value)}
              className={'inputBox'}
              required
            />
            <label className="errorLabel">{lastNameError}</label>
          </div>
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
          <div className='buttonContainer'>
            <button className='user-button'> Sign Up </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup