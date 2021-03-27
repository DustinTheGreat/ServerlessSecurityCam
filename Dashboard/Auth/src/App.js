import React, { useState, useEffect, ReactElement } from 'react';
import logo from './logo.svg';
import Signup from './Signup'
import Signin from './Signin'
import UserStatus from './UserStatus'
import './App.css';
import Player from './Player'


const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    // Run auth check on load
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      // Get tokens from current user
      const tokens: Tokens = getTokensFromStorage();
      console.error(tokens)
      console.error("##################################")
      console.error("im here baby")

      // Connection to GraphQL and set in state

      // Check to see if user had existing tokens
      if (tokens.accessToken) userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
    }

    // Show app
    setIsAuthenticating(false);
  };
const getTokensFromStorage = () => {
  // const idToken = localStorage.getItem('id') || null;
  const accessToken = localStorage.getItem('CognitoIdentityServiceProvider.userPool.identity.accessToken') || null;
  // const refreshToken = localStorage.getItem('refresh') || null;

  return { accessToken };
};

  return(
    

    // );
   <div className="App">
   {isAuthenticated &&( <Player />)}
  <UserStatus />

   </div>
  );
  
};

export default App;
