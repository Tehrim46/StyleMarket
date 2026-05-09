import { db } from "./firebase.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function openSearch() {
  document.getElementById("searchPanel").classList.add("active");
  searchInput.focus();
  renderRecentSearches();
}

function closeSearch() {
  document.getElementById("searchPanel").classList.remove("active");
}

function quickSearch(term) {
  searchInput.value = term;
  runSearch();
}

async function getUploadedProducts() {
  const snapshot = await getDocs(collection(db, "products"));

  const uploaded = [];

  snapshot.forEach((doc) => {
    uploaded.push(doc.data());
  });

  return uploaded;
}

async function getAllProducts() {
  const uploaded = await getUploadedProducts();
  const uploadedMap = {};

  uploaded.forEach((p) => {
    uploadedMap[p.id] = p;
  });

  return {
    ...window.products,
    ...uploadedMap,
  };
}

function saveRecentSearch(term) {
  if (!term) return;

  let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recent = recent.filter((item) => item !== term);
  recent.unshift(term);

  if (recent.length > 6) recent.pop();

  localStorage.setItem("recentSearches", JSON.stringify(recent));
  renderRecentSearches();
}

function renderRecentSearches() {
  const list = document.getElementById("recentList");
  if (!list) return;

  const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];

  if (recent.length === 0) {
    list.innerHTML = "<p class='empty-recent'>No recent searches</p>";
    return;
  }

  list.innerHTML = recent
    .map(
      (term) => `
      <span class="recent-item" onclick="quickSearch('${term}')">
        ${term}
      </span>
    `,
    )
    .join("");
}

function clearRecentSearches() {
  localStorage.removeItem("recentSearches");
  renderRecentSearches();
}

async function runSearch() {
  const searchValue = searchInput.value.toLowerCase().trim();

  if (searchValue === "") {
    searchResults.innerHTML = "";
    return;
  }

  const allProducts = await getAllProducts();

  const results = Object.entries(allProducts).filter(([id, p]) => {
    return (
      p.name.toLowerCase().includes(searchValue) ||
      p.category.toLowerCase().includes(searchValue) ||
      p.condition.toLowerCase().includes(searchValue) ||
      p.size.toLowerCase().includes(searchValue) ||
      p.color.toLowerCase().includes(searchValue)
    );
  });

  displayResults(results);
}

function displayResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = "<p class='no-results'>No results found.</p>";
    return;
  }

  searchResults.innerHTML = results
    .map(
      ([id, p]) => `
      <a href="product.html?item=${id}" class="search-result-item">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h4>${p.name}</h4>
          <p>${p.price}</p>
          <span>${p.category}</span>
        </div>
      </a>
    `,
    )
    .join("");
}

// LIVE SEARCH RESULTS
searchInput?.addEventListener("input", runSearch);

// DELAYED SAVE FOR RECENT SEARCHES
let typingTimer;
const delay = 1500;

searchInput?.addEventListener("input", function () {
  clearTimeout(typingTimer);

  const value = searchInput.value.toLowerCase().trim();

  typingTimer = setTimeout(() => {
    if (value !== "") {
      saveRecentSearch(value);
    }
  }, delay);
});

window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.quickSearch = quickSearch;
window.clearRecentSearches = clearRecentSearches;
