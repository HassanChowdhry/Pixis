import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoggedInProvider } from './context/LoggedInContext.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID} >
      <LoggedInProvider>
        <App />

      </LoggedInProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);