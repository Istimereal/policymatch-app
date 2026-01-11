const BASE_URL = "http://localhost:7075/api/v1/"
const LOGIN_ENDPOINT = "auth/login"

function handleHttpErrors(res) {
if (!res.ok) {
  return Promise.reject({ status: res.status, fullError: res.json() })
}
return res.json()
}

function getRolesFromToken(){
try{
    const token = getToken();
  if (!token) return ["any"];
const rolePayload = token.split('.')[1];
const decodePayload = JSON.parse(window.atob(rolePayload));
const role = decodePayload.roles; 
console.log(decodePayload);
  console.log(role);
return role;
}
catch{
  return  ["any"];
}
}

function getUsernameFromToken(){
try{
    const token = getToken();
  if (!token) return null;
const rolePayload = token.split('.')[1];
const decodePayload = JSON.parse(window.atob(rolePayload));
const username = decodePayload.username; 
console.log(decodePayload);
  console.log(username);
return username;
}
catch{
  return  null;
}
}
/* Insert utility-methods from later steps 
here (REMEMBER to uncomment in the returned 
object when you do)*/
const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const logout = () => {
  localStorage.removeItem("jwtToken");
}

const login = (user, password) => {
  const options = makeOptions("POST", false, {username: user, password: password });
return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then(res => {setToken(res.token) })  
 }

const fetchData = () => {/*TODO */  }

const makeOptions= (method,addToken,body) =>
  {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json',
    }
  }
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}


const facade = {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getRolesFromToken,
    getUsernameFromToken
}

export default facade;