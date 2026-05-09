# StyleMarket
StyleMarket is a web-based fashion marketplace designed to give clothing a second life through buying and selling. The platform provides users with a clean and visually appealing shopping experience where they can browse products, save items to a wishlist, upload listings, manage carts, and securely complete purchases through Stripe checkout integration.

<br>
The application focuses on responsive design, organized navigation, and a smooth user experience through dynamic product rendering and Firebase-powered backend functionality.


# System Architecture (High-Level)
- Frontend: HTML, CSS, and JavaScript
- Backend Services: Firebase Authentication, Cloud Firestore Database and Stripe Checkout API
- Design Process: Wireframes and UI planning created using sketches and GoodNotes before development
- Development: Implemented in VS Code and used Live Server
- Data Handling: Cloud Firestore used for products, cart, orders, rewards, and user data. localStorage used for cart, wishlist, search history, and temporary product storage
- Version Control: GitHub for collaboration, version tracking, and deployment preparation

# Phases
Phase 1 – Planning & Setup:

- Planned website structure and user navigation using sketches and wireframes
- Set up project structure in VS Code (HTML, JS, CSS, and file organization)
- Initialized GitHub repository and task tracking system
- Designed and implemented login/signup interface UI consistent with site theme

Phase 2 – Development & Design:

- Built homepage, product pages, sell page, wishlist, cart, account pages and help section using HTML, CSS and JS
- Developed category pages (Women, Men, Shoes, Accessories & Sell) with dropdown navigation
- Created reusable product card system for consistent UI design
- Implemented dynamic product rendering using JavaScript

Phase 3 – Styling & UX:

- Applied CSS styling for layout consistency, spacing, and responsiveness
- Improved responsiveness, alignment, font sizing, and visual hierarchy
- Added dropdown menus, search functionality, smooth navigation, and hover interactions
- Standardized branding and pink-themed visual identity across all pages

Phase 4 – Testing & Debugging:

- Fixed navigation and file path inconsistencies
- Resolved caching issues with Live Server
- Tested all layouts, links, and interactive components
- Refactored JavaScript and page structure for maintainability

Phase 5 – Backend & Firebase Integration

- Configured Firebase Authentication for secure user login/signup
- Integrated Cloud Firestore for product, cart, reward, and order storage
- Connected frontend components to Firebase using JavaScript APIs
- Implemented persistent cart and wishlist functionality
- Added reward system and order history tracking

Phase 6 – Stripe Checkout Integration

- Integrated Stripe Checkout API for secure payment processing
- Implemented discounted checkout flow with rewards support
- Added successful payment handling and order confirmation logic
- Connected Stripe payment completion with Firestore order storage

# Installation & Execution Instructions

- Clone the repository
- Open the project in VS Code
- Run frontend using Live Server
- Start backend server
- Launch the website locally and access all marketplace features through the integrated Firebase and Stripe systems.
