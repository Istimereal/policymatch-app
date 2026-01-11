import { useState } from "react";
import { fetchData } from "../../util/persistence";
import facade from "../../apiFacade";
import LoadState from "../common/LoadState.";

const blankUser = {username: '', password: '', email: '', city: '' };

export default function RegisterUser(){
const [user, setUser] = useState(blankUser);
const [statusMessage, setStatusMessage] = useState("");
const [loading, setLoading] = useState(false);

const ApiURLregister = "http://127.0.0.1:7075/api/v1/auth/register";

const handleChange = (event) =>{
const value = event.target.value;
const name = event.target.id;

    setUser({...user, [name]: value});
}
async function registerNewUser(){
setLoading(true);
setStatusMessage("");

try{
    const data = await fetchData(ApiURLregister, "POST", user, false);
 console.log(data);
       facade.setToken(data.token);
       setStatusMessage(data.username + " Have succesfully been created. Go to answer questions before you can geat an evaluation.");
    } catch (error) {
      console.error("Failed to register user:", error.message);
      setStatusMessage(error.message);
  }
}

return(

    <div>
        <LoadState loading={loading}>
         {statusMessage && <p>{statusMessage}</p>}
 
 <label htmlFor="username">Username:</label>
<input name="username" id="username" type="text" placeholder="username"
 value={user.username} onChange={handleChange}/>
 
 <label htmlFor="password">Password:</label>
<input name="password" id="password" type="text" placeholder="password"
value={user.password} onChange={handleChange}/>

<label htmlFor="email">Email:</label>
<input name="email" id="email" type="text" placeholder="email"
value={user.email} onChange={handleChange}/>

<label htmlFor="city">City:</label>
<input name="city" id="city" type="text" placeholder="city"
value={user.city} onChange={handleChange}/>
   
   <button onClick={registerNewUser}>Register</button>
   </LoadState>
    </div>
)
    
}