import { Routes, Route } from 'react-router-dom';
import UserPage from "./Components/User/UserPage.js";
import Landing from "./Components/Login/Landing.js"
import Signup from './Components/Login/Signup.js';
import Signin from './Components/Login/Signin.js';
import { useEffect, useContext } from 'react';
import ProfileUpdateForm from './Components/Login/ProfileUpdateForm.js'
import "./App.css";
import Navbar from './Components/UI/Navbar.js';
import { LoggedInContext } from './context/LoggedInContext.js';

/*
TODO: 
1) Integrate to AWS. [(FrontEnd to S3), (User Auth to Incognito || Google Auth || Firebase Auth)]
*/

function App() {
  const { setLoggedIn, setEmail } = useContext(LoggedInContext);
  
  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_IP)
    console.log(process.env.REACT_APP_SERVER_PORT)
    const user = (JSON.parse(sessionStorage.getItem('user')));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/auth/verify`, {
      method: "POST",
      headers: {
        'jwt-token': user.token
      },
    })
      .then((response) => {
        if (response.status >= 401) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLoggedIn('success' === data.message);
        setEmail(user.email || '');
      })
      .catch((error) => {
        window.alert("Access Denied");
      })
    
  }, []);
  
  return (
  <> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path='/:user' element={<UserPage/>} />
      <Route path='/edit' element={<ProfileUpdateForm/>} />
    </Routes>
  </>
  );
}

export default App;
