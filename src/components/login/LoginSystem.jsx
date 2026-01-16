import React from "react";
import LogIn from "./LogIn";
import facade from "../../apiFacade";


function LoginBox({ setLoggedIn, removeMessage }) {

  const login = (user, pass) => {
    return facade.login(user, pass).then(() => setLoggedIn(true));
  };

  return (
    <div>
      <LogIn login={login} removeMessage={removeMessage}  />
    </div>
  );
}

export default LoginBox;
