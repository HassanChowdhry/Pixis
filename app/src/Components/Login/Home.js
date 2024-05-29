import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoggedInContext } from '../../context/LoggedInContext.js';
import './Login.css';

const Home = () => {
  const { loggedIn, setLoggedIn, email } = useContext(LoggedInContext);
  const navigate = useNavigate()
  const onLogOutHandler = () => {
      sessionStorage.removeItem('user');
      setLoggedIn(false);
  }

  return (
    <div className='flex'>
      <div className="mainContainer">
        <div className='titleContainer'>
          <h1>Welcome!</h1>
        </div>
        <h1>This is the home page.</h1>
        {loggedIn && 
          <div className='buttonContainer div-continue w-auto'>
            <button 
              style={{ height: 'auto', width: 'auto', padding: '10px 30px' }} 
              className='user-button btn-continue'
              onClick={() => navigate(`/${email}`)}
            >
              Continue as <em>{email}</em>?
            </button>
            <button
              className='user-button'
              onClick={onLogOutHandler}
            >

              Log Out
            </button>
          </div>}
        {!loggedIn && 
          <div className='buttonContainer'>
            <button className='user-button' onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <button className='user-button' onClick={() => navigate('/login')}>
              Log In
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Home