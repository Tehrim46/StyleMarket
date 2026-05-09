import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CHECK LOGIN STATUS

onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById("authBtn");

  if (user) {
    console.log("Logged in:", user.email);

    updateCartCount();

    // UPDATE NAVBAR BUTTON

    if (authBtn) {
      authBtn.textContent = "Log Out";
      authBtn.href = "#";

      authBtn.onclick = function (e) {
        e.preventDefault();
        logoutUser();
      };
    }
  } else {
    console.log("No user logged in");

    updateCartCount();

    // RESET NAVBAR BUTTON

    if (authBtn) {
      authBtn.textContent = "Log In";
      authBtn.href = "../index.html";

      authBtn.onclick = null;
    }
  }
});

async function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  const user = auth.currentUser;

  if (!user) {
    cartCount.textContent = "0";
    return;
  }

  const snapshot = await getDocs(collection(db, "users", user.uid, "cart"));

  let totalItems = 0;

  snapshot.forEach((doc) => {
    totalItems += doc.data().quantity || 1;
  });

  cartCount.textContent = totalItems;
}

window.updateCartCount = updateCartCount;

// LOGOUT FUNCTION

window.logoutUser = async function () {
  try {
    await signOut(auth);

    showNotification("Logged out successfully!");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);
  } catch (error) {
    showNotification("Logout failed.");
  }
};
