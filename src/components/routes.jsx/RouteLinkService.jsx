import { useState, useEffect } from "react";
import facade from '../../apiFacade';

export function useRole(loggedIn){ 
  const [uRole, setRole] = useState(["any"]); 
  
  useEffect(() => { 
    const fetchRoles = async () => {
    const roles = await facade.getRolesFromToken();
     setRole(roles); 
 
   };
   fetchRoles();
  }, [loggedIn]); 
  
  return uRole; 
}
