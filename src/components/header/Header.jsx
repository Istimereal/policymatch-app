import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRole } from "../routes.jsx/RouteLinkService";
import facade from "../../apiFacade";
import 

function RenderAdminQuestions() {

   const [uRole, setRole] = useState(["any"]);
   
  useEffect(() => { 
     const fetchRoles = async () => {
      const roles = await facade.getRolesFromToken();
    setRole(roles); 
     };
     fetchRoles();
  }, []);

  if (!uRole.includes("ADMIN")) return null;

  return (
    <>
  <li>
       <NavLink to="/questions/add">
        Add Questions
      </NavLink>
      </li>
      <li>
       <NavLink to="/questions/manage">
       ManageQuestions 
      </NavLink>
      </li>
      </>
  );
}

function RenderAdminAndUserConditional() {

    const role = useRole();

  if (!role.includes("ADMIN") && !role.includes("USER") ) return null;

  return (
    <>
  
     <li>
        <NavLink to="/questions">
           Answer Questions
        </NavLink>
    </li>
      <li>
       <NavLink to="/responses">
        Policy Match Evaluation
      </NavLink>
      </li>
      </>
  );
}

const Header = ({loggedIn, setLoggedIn}) => {
  
  const username = facade.getUsernameFromToken(); 

  function makeLogout() {
    facade.logout();
    setLoggedIn(false);
  }

return (
<>
<nav className="header">
    <li>
        <NavLink to="/" end>
            Home
        </NavLink>
    </li>
  {!loggedIn && (
  <li>
    <NavLink to="/" end>
      Login
    </NavLink>
  </li>
)}

  {!loggedIn && (
  <li>
    <NavLink to="/auth/register/">
      Register
    </NavLink>
  </li>
)}               
    <RenderAdminQuestions />
<RenderAdminAndUserConditional />
        
</nav>

 {loggedIn && (
        <div style={{ padding: "8px 0" }}>
          User: {username}
          <button onClick={makeLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      )}
</>
);
};
export default Header