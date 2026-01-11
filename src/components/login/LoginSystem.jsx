import React from 'react';
import LogIn from './LogIn';
import facade from '../../apiFacade';

function LoginBox({ setLoggedIn }) {
    
  const login = (user, pass) => {
    facade.login(user,pass)
.then(() => setLoggedIn(true));
  } 

  return (
    <div>
     <LogIn login={login} />
    </div>
    
  )
}

export default LoginBox;