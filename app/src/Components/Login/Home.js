import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onLogInClick = () => {
    navigate('/login')
  }

  const onSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onSignUpClick}
          value="Sign Up"
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={onLogInClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home