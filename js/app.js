const tabs = document.querySelector(".tabs");
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const subtext = document.getElementById("subtext");
const loginHint = document.getElementById("loginHint");
const signupHint = document.getElementById("signupHint");

// AUTO REDIRECT IF ALREADY LOGGED IN
if (localStorage.getItem("currentUser")) {
  window.location.href = "./HTML/homepage.html";
}

if (
  tabs &&
  tabLogin &&
  tabSignup &&
  loginForm &&
  signupForm &&
  subtext &&
  loginHint &&
  signupHint
) {
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

  // SIGN UP
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document
      .getElementById("signupConfirm")
      .value.trim();

    if (!name || !email || !password || !confirmPassword) {
      signupHint.textContent = "Please fill in all fields.";
      return;
    }

    if (password.length < 8) {
      signupHint.textContent = "Password must be at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      signupHint.textContent = "Passwords do not match.";
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      signupHint.textContent = "Account already exists.";
      return;
    }

    // Save user
    users[email] = { name, password };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);

    signupHint.textContent = "Account created. Redirecting...";

    setTimeout(() => {
      window.location.href = "./HTML/homepage.html";
    }, 1000);
  });

  // LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      loginHint.textContent = "Please fill in all fields.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      loginHint.textContent = "Account not found.";
      return;
    }

    if (users[email].password !== password) {
      loginHint.textContent = "Incorrect password.";
      return;
    }

    loginHint.textContent = "Login successful. Redirecting...";

    // Save logged-in user
    localStorage.setItem("currentUser", email);

    setTimeout(() => {
      window.location.href = "./HTML/homepage.html";
    }, 1000);
  });
}
