# React Training Project | GearRent — Camera & Gear Rental Dashboard

## Description
This training project is designed to help junior developers practice modern React
concepts. They will work on a small but complete web application for a fictional
equipment rental shop. The project emphasizes React Router, Redux Toolkit, custom
hooks, and Tailwind CSS, all set up with Vite (not Create React App). The app should be
implemented in JavaScript (not TypeScript).
Additionally, developers should focus on organizing their workflow, planning the steps
carefully, and committing progress in small, atomic commits on GitHub.

## 📚 Table of Contents

- [Goals](#goals)
- [Suggested Repository Structure](#suggested-repository-structure)
- [Git Workflow](#git-workflow)
- [Client Requirements](#client-requirements)
- [Usage](#usage)
- [License](#license)
- [Authors](#authors)

## Goals

- Implement routing with React Router DOM (public, protected, nested routes).
- Manage state with Redux Toolkit slices and async thunks.
- Create reusable custom hooks such as useAuth, useDebounce, and
- ePaginatedQuery.
- Style the application fully using Tailwind CSS (responsive and consistent design).
- Use Vite for fast development and modern tooling.
- Practice organized Git workflows with clear, atomic commits.
- liverables
- A Vite + React app fully styled with Tailwind.
- Authentication flow (with mock or fake API).
- Public catalog (list and item details).
- Dashboard with CRUD for Inventory and Bookings.
- Global search with debounce and paginated lists.
- README file documenting setup and decisions.
- GitHub repository with well-structured commit history.

## Suggested Repository Structure
```react-training-project

├── src/
├── app/ (store.js)
├── routes/ (public.js, dashboard.js)
├── layouts/ (PublicLayout.jsx, DashboardLayout.jsx)
├── features/
├── auth/ (authSlice.js, useAuth.js, LoginPage.jsx)
├── inventory/ (inventorySlice.js, pages/)
├── bookings/ (bookingsSlice.js, pages/)
├── components/ (UI components, SearchBar.jsx)
├── hooks/ (useDebounce.js, usePaginatedQuery.js, useForm.js)
├── styles/ (index.css)
├── main.jsx
├── App.jsx
```

## Git Workflow

- Commit frequently with meaningful messages.
- Each feature or bug fix should be a separate commit.
- Use feature branches when working on larger tasks.
- Push commits to GitHub regularly.
- Ensure commit history is clear, readable, and atomic


## Client Requirements

As the client, we are requesting the development of a web-based application named
GearRent. This application should serve as a mini dashboard for a fictional equipment
rental shop that manages camera and gear rentals. The goal is to provide an
environment where junior developers can demonstrate their ability to apply modern
React concepts in a structured project.

### Business Objectives

- Allow potential customers to browse a catalog of equipment.
- Enable authenticated staff to manage inventory and bookings.
- Provide a simple authentication flow to separate public and private sections.
- Ensure the application is responsive and styled consistently using Tailwind CSS.
- Expect clean GitHub commit history to review progress and workflow discipline.

### Technical Requirements

- The project must be built using React with Vite (JavaScript only, not TypeScript).
- Routing should be handled with React Router DOM, including nested and protected 
routes.
- State management must use Redux Toolkit (slices, thunks, selectors).
- Custom hooks must be implemented (authentication, debounce search, pagination).
- Tailwind CSS must be used for all styling with reusable UI components.
- The application should include public catalog pages and private dashboard pages.

### Functional Requirements

- Public Catalog: display inventory items with search and pagination.
- Item Details: show detailed information about each item.
- Authentication: login flow with mock credentials (e.g., admin/admin).
- Dashboard Inventory: create, update, and remove items.
- Dashboard Bookings: view and manage customer bookings.
- Global search with debounce and paginated results.
- Error handling and loading states throughout the app.



## License

This project is licensed under the [MIT License](LICENSE), except for third-party assets.

## Authors

Currently just promiselb