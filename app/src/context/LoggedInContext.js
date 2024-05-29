import { createContext, useState } from 'react';

export const LoggedInContext = createContext();

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, email, setEmail }}>
      {children}
    </LoggedInContext.Provider>
  );
};
