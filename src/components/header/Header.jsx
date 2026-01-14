import { NavLink } from "react-router-dom";
import facade from "../../apiFacade";
import styles from "./Header.module.css"; 

function RenderAdminQuestions({ loggedIn, removeMessage }) {
if (!loggedIn) return null;

const roles = facade.getRolesFromToken();

if (!roles.includes("ADMIN")) return null;

  return (
    <>
    <li className={styles.adminItem}>
        <NavLink
          to="/questions/add"
          onClick={removeMessage}
          className={({ isActive }) =>
            `${styles.link} ${styles.adminLink} ${isActive ? styles.active : ""}`
          }
        >
          Add Questions
        </NavLink>
      </li>

      <li className={styles.adminItem}>
        <NavLink
          to="/questions/manage"
          onClick={removeMessage}
          className={({ isActive }) =>
            `${styles.link} ${styles.adminLink} ${isActive ? styles.active : ""}`
          }
        >
          Manage Questions
        </NavLink>
        </li>
      </>
  );
}

function RenderAdminAndUserConditional({ loggedIn, removeMessage }) {
  if (!loggedIn) return null;
 
const roles = facade.getRolesFromToken();
  if (!roles.includes("ADMIN") && !roles.includes("USER") ) return null;

  return (
    <>
  
     <li>
        <NavLink
          to="/questions"
          onClick={removeMessage}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          Answer Questions
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/responses"
          onClick={removeMessage}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
        >
          Policy Match Evaluation
        </NavLink>
      </li>
      </>
  );
}

const Header = ({loggedIn, setLoggedIn, removeMessage}) => {
  
  const username = facade.getUsernameFromToken(); 

  function makeLogout() {
    facade.logout();
    setLoggedIn(false);
  }

return (

 <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
              Home
            </NavLink>
          </li>

          {!loggedIn && (
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
              >
                Login
              </NavLink>
            </li>
          )}

          {!loggedIn && (
            <li>
              <NavLink
                to="/auth/register/"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
              >
                Register
              </NavLink>
            </li>
)}               
    <RenderAdminQuestions loggedIn={loggedIn} removeMessage={removeMessage}/>
<RenderAdminAndUserConditional loggedIn={loggedIn} removeMessage={removeMessage}/>
    </ul>    
</nav>

   {loggedIn && (
        <div className={styles.userBox}>
          <span className={styles.userText}>User: {username}</span>
          <button className={styles.logoutBtn} onClick={makeLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
);
};
export default Header