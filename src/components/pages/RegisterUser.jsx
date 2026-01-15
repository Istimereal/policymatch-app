import { useState } from "react";
import { fetchData } from "../../util/persistence";
import facade from "../../apiFacade";
import LoadState from "../common/LoadState.";
import { useOutletContext } from "react-router-dom";
import styles from "./RegisterUser.module.css";

const blankUser = {username: '', password: '', email: '', city: '' };

export default function RegisterUser(){
const [user, setUser] = useState(blankUser);
const { setStatusMessage, removeMessage } = useOutletContext();
const [loading, setLoading] = useState(false);

const ApiURLregister = "http://127.0.0.1:7075/api/v1/auth/register";

const handleChange = (event) =>{
const value = event.target.value;
const name = event.target.id;

    setUser({...user, [name]: value});
}
async function registerNewUser(){
setLoading(true);
removeMessage();

try{
    const data = await fetchData(ApiURLregister, "POST", user, false);
 console.log(data);
       facade.setToken(data.token);
       setStatusMessage(data.username + " Have succesfully been created. Go to answer questions before you can geat an evaluation.");
    } catch (error) {
      console.error("Failed to register user:", error.message);
      setStatusMessage(error.message);
  }
  finally { setLoading(false) }
}


  return (
    <div className={styles.page}>
      <LoadState loading={loading}>
        <div className={styles.card}>
          <h2 className={styles.title}>Register</h2>

          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="city"
              value={user.city}
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.submitBtn} onClick={registerNewUser}>
              Register
            </button>
          </div>
        </div>
      </LoadState>
    </div>
  );
}

