import { useNavigate } from 'react-router-dom';
import Navbar from '../UI/Navbar.js';
import './Login.css';

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()
  const navLinks = [
    { text: "Sign Up", url: "/signup"},
    { text: "Log In", url: "/login"}
  ]

  const onLogOutHandler = () => {
      localStorage.removeItem('user');
      props.setLoggedIn(false);
  }

  return (
    <>
      {loggedIn && <Navbar links={navLinks}/>}
      <div className="mainContainer">
        <div className='titleContainer'>
          <h2>Welcome!</h2>
        </div>
        <h2>This is the home page.</h2>
        {loggedIn && 
          <div className='buttonContainer div-continue'>
            <button 
              style={{ width: 'auto', padding: '10px 30px' }} 
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
    </>
  )
}

export default Home