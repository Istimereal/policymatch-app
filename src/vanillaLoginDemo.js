export function initVanLoginDemo() {
  const userEl = document.getElementById("vUser");
  const loginBtn = document.getElementById("vLoginBtn");
  const logoutBtn = document.getElementById("vLogoutBtn");
  const msgEl = document.getElementById("vMsg");

  loginBtn.addEventListener("click", () => {
    msgEl.textContent = 'Vanilla: "logget ind" som ' + userEl.value;
    sessionStorage.setItem("demoUsername", userEl.value);
  });

  logoutBtn.addEventListener("click", () => {
    msgEl.textContent = "Vanilla: logget ud";
    sessionStorage.removeItem("demoUsername");
  });
  
}/*  <div id="vanillaDemo">
     <h3>Vanilla DOM demo</h3>

  <input id="vUser" placeholder="username"/>
  <button id="vLoginBtn">Login</button>
  <button id="vLogoutBtn">Logout</button>

  <p id="vMsg"></p>
</div> */