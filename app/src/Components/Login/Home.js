import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onLogButtonClick = () => {
    if (loggedIn) {
      // navigate to user profile
      // localStorage.removeItem('user');
      // props.setLoggedIn(false);
      navigate(`/${email}`)
    } else {
      navigate('/login')
    }
  }

  const onSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <div className="mainContainer">
      <div className='titleContainer'>
        <h2>Welcome!</h2>
      </div>
      <h2>This is the home page.</h2>
      <div className='buttonContainer'>
        <button className='user-button' onClick={onSignUpClick}>
          Sign Up
        </button>
        <button className='user-button' onClick={onLogButtonClick}>
          Log In
        </button>
      </div>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
    </div>
  )
}

export default Home