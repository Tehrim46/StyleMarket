const tabs = document.querySelector(".tabs");
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");


const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


const subtext = document.getElementById("subtext");
const loginHint = document.getElementById("loginHint");
const signupHint = document.getElementById("signupHint");


function setMode(mode) {
  const isSignup = mode === "signup";


  tabs.dataset.mode = isSignup ? "signup" : "login";
  tabLogin.classList.toggle("is-active", !isSignup);
  tabSignup.classList.toggle("is-active", isSignup);


  loginForm.classList.toggle("is-visible", !isSignup);
  signupForm.classList.toggle("is-visible", isSignup);


  subtext.textContent = isSignup
    ? "Create your account."
    : "Welcome back. Log in to continue.";


  loginHint.textContent = "";
  signupHint.textContent = "";
}


tabLogin.addEventListener("click", () => setMode("login"));
tabSignup.addEventListener("click", () => setMode("signup"));


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();


  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();


  if (email === "" || password === "") {
    loginHint.textContent = "Please fill in all fields.";
    return;
  }


  loginHint.textContent = "Login successful.";


  window.location.href = "homepage.html";
});


signupForm.addEventListener("submit", (e) => {
  e.preventDefault();


  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirm").value.trim();


  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    signupHint.textContent = "Please fill in all fields.";
    return;
  }


  if (password !== confirmPassword) {
    signupHint.textContent = "Passwords do not match.";
    return;
  }


  signupHint.textContent = "Account created successfully.";


  window.location.href = "homepage.html";
});


setMode("login");
