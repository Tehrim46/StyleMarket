const tabs = document.querySelector(".tabs");
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const subtext = document.getElementById("subtext");
const loginHint = document.getElementById("loginHint");
const signupHint = document.getElementById("signupHint");

function setMode(mode){
  const isSignup = mode === "signup";

  tabs.dataset.mode = isSignup ? "signup" : "login";
  tabLogin.classList.toggle("is-active", !isSignup);
  tabSignup.classList.toggle("is-active", isSignup);

  loginForm.classList.toggle("is-visible", !isSignup);
  signupForm.classList.toggle("is-visible", isSignup);

  subtext.textContent = isSignup
    ? "Create your account."
    : "Welcome! Log in to continue.";

  loginHint.textContent = "";
  signupHint.textContent = "";
}

tabLogin.addEventListener("click", () => setMode("login"));
tabSignup.addEventListener("click", () => setMode("signup"));

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginHint.textContent = "Login form submitted (demo).";
});

signupForm.addEventListener("submit", (e) => {
e.preventDefault();

const pass = document.getElementById("signupPassword").value;
const confirm = document.getElementById("signupConfirm").value;

if(pass !== confirm){
signupHint.textContent = "Passwords do not match.";
return;
}

signupHint.textContent = "Account created (demo).";
});

setMode("login");