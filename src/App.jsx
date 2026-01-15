import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import LoginBox from './components/login/LoginSystem';
import facade from "./apiFacade";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());
  const [statusMessage, setStatusMessage] = useState("");

   function removeMessage() {
    setStatusMessage("");
  }
  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} removeMessage={removeMessage} />

      <main className="appContent">
        <h1 className="appTitle">policymatch</h1>

        {statusMessage && <p>{statusMessage}</p>}

        {!loggedIn && <LoginBox setLoggedIn={setLoggedIn} removeMessage={removeMessage} />}

        <Outlet context={{ setStatusMessage, removeMessage }} />
      </main>
    </>
  );
}

export default App;