import { useState, useEffect } from "react";
import facade from '../../apiFacade';

export function useRole(){ 
  const [uRole, setRole] = useState(["any"]); 
  
  useEffect(() => { 
    const fetchRoles = async () => {
    const roles = await facade.getRolesFromToken();
     setRole(roles); 
 
   };
   fetchRoles();
  }, []); 
  
  return uRole; 
}
