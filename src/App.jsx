import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import LoginBox from './components/login/LoginSystem';
import facade from "./apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());
   
  return (
    <>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <h1>policymatch</h1>
      {!loggedIn && <LoginBox setLoggedIn={setLoggedIn} />}
      <Outlet />
    </>
  );
}

export default App
