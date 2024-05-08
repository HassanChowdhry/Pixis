import { Routes, Route } from 'react-router-dom';
import UserPage from "./Components/User/UserPage.js";
import Home from "./Components/Login/Home.js"
import Login from './Components/Login/Login.js';
import Signup from './Components/Login/Signup.js';
import { useEffect, useState } from 'react';
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

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
