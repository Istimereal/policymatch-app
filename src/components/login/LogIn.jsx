import { useState } from "react"
import styles from "./LogIn.module.css";
import LoadState from "../common/LoadState.";
import { useOutletContext } from "react-router-dom";

function LogIn({ login }) {
  const [loading, setLoading] = useState(false);
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

const outlet = useOutletContext() || {};

// destructoring outlet props
const { setStatusMessage, removeMessage } = outlet;

  const performLogin = async (evt) => {
    evt.preventDefault();
    removeMessage?.();
    setLoading(true);
    try{
       await login(loginCredentials.username, loginCredentials.password);
    }
   catch (error) {
     
      console.error("Login failed:", error?.message || error);
      setStatusMessage(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }

  return (
  <div className={styles.card}>
    <LoadState loading={loading} />
    <h2>Login</h2>

    <form className={styles.form} onSubmit={performLogin}>
      <input
        placeholder="User Name"
        id="username"
        onChange={onChange}
        value={loginCredentials.username}
      />

      <input
        placeholder="Password"
        id="password"
        type="password"
        onChange={onChange}
        value={loginCredentials.password}
      />

      <button type="submit">Login</button>
    </form>
  </div>
);
}

export default LogIn