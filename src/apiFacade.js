import { fetchData } from "./util/persistence";

const BASE_URL = "/api/v1/"
// til dev "http://127.0.0.1:7073/api/v1/"

const LOGIN_ENDPOINT = "auth/login"

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

const login = async (user, password) => {
  const data = await fetchData(BASE_URL + LOGIN_ENDPOINT, "POST", { username: user, password }, false);
  setToken(data.token);
  return data;
};


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
    getRolesFromToken,
    getUsernameFromToken
}

export default facade;