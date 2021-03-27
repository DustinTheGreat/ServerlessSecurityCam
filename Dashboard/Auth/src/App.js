import React, { useState, useEffect, ReactElement } from 'react';
import logo from './logo.svg';
import Signup from './Signup'
import Signin from './Signin'
import UserStatus from './UserStatus'
import './App.css';

const App = () => {

  return(
    
      <div className="App">
        <UserStatus />
      </div>
    );
  
};

export default App;
