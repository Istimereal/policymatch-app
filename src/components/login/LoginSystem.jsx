import React from 'react';
import LogIn from './LogIn';
import facade from '../../apiFacade';


function LoginBox({ setLoggedIn, removeMessage}) {

  const login = (user, pass) => {
    removeMessage();
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