import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tabs = document.querySelector(".tabs");
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const subtext = document.getElementById("subtext");
const loginHint = document.getElementById("loginHint");
const signupHint = document.getElementById("signupHint");

// AUTO REDIRECT IF ALREADY LOGGED IN
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "./html/homepage.html";
  }
});

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

  signupForm.addEventListener("submit", async (e) => {
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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });
      signupHint.textContent = "Account created successfully!";

      setTimeout(() => {
        window.location.href = "./html/homepage.html";
      }, 1000);
    } catch (error) {
      signupHint.textContent = error.message;
    }
  });

  // LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      loginHint.textContent = "Login successful!";

      setTimeout(() => {
        window.location.href = "./html/homepage.html";
      }, 1000);
    } catch (error) {
      loginHint.textContent = error.message;
    }
  });
}
