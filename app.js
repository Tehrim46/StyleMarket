// Select the tab container and tab buttons
const tabs = document.querySelector(".tabs");
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

// Select login and signup forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Select text areas used for messages
const subtext = document.getElementById("subtext");
const loginHint = document.getElementById("loginHint");
const signupHint = document.getElementById("signupHint");

// Switches the interface between Login and Signup mode
function setMode(mode){
  const isSignup = mode === "signup";

  // Update tab styling depending on mode
  tabs.dataset.mode = isSignup ? "signup" : "login";
  tabLogin.classList.toggle("is-active", !isSignup);
  tabSignup.classList.toggle("is-active", isSignup);

  // Show the correct form and hide the other
  loginForm.classList.toggle("is-visible", !isSignup);
  signupForm.classList.toggle("is-visible", isSignup);

  // Update the helper text under the tabs
  subtext.textContent = isSignup
    ? "Create your account."
    : "Welcome! Log in to continue.";

  // Clear hint messages when switching forms
  loginHint.textContent = "";
  signupHint.textContent = "";
}

// Switch to login mode when login tab is clicked
tabLogin.addEventListener("click", () => setMode("login"));

// Switch to signup mode when signup tab is clicked
tabSignup.addEventListener("click", () => setMode("signup"));

// Handle login form submission (demo behavior)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginHint.textContent = "Login form submitted (demo).";
});

// Handle signup form submission
signupForm.addEventListener("submit", (e) => {
e.preventDefault();

// Get password values from signup inputs
const pass = document.getElementById("signupPassword").value;
const confirm = document.getElementById("signupConfirm").value;

// Check if passwords match
if(pass !== confirm){
signupHint.textContent = "Passwords do not match.";
return;
}

// Demo success message
signupHint.textContent = "Account created (demo).";
});

// Set the default page state to login mode
setMode("login");