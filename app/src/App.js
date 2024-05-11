import { Routes, Route } from 'react-router-dom';
import UserPage from "./Components/User/UserPage.js";
import Home from "./Components/Login/Home.js"
import Login from './Components/Login/Login.js';
import Signup from './Components/Login/Signup.js';
import { useEffect, useState } from 'react';
import "./App.css";

/*
TODO:
1) Add Navbar with Logout / Home / ETC
TODO:
2) Update UI (Gallery, Signup, Login Pages)
TODO:
3) Deny access to anyone who is not the user in localstorage when accessing by params
TODO:
4) Switch from email to username
TODO:
5) Integrate to AWS. [(Server to EC2), (FrontEnd to S3), (Upload Stoare to S3), (User Auth to Incognito || Google Auth || Firebase Auth)]
TODO:
6) Think of other fixes
*/

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {

    const user = (JSON.parse(localStorage.getItem('user')));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch('http://localhost:8080/auth/verify', {
      method: "POST",
      headers: {
        'jwt-token': user.token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn('success' === data.message);
        setEmail(user.email || '');
      })
    
  }, []);
  
  return (
  <>
    <Routes>
      {/* <Route path='/' exact> 
        <Redirect to='/hassan' />
      </Route> */}
      <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail} />} />

      <Route path='/:user' element={<UserPage/>} />
    </Routes>
  </>
  );
}

export default App;
