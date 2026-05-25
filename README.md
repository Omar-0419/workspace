<<<<Workspace Task Manager>>>>
Table of Contents
1 Project Overview
2 Tech Stack
3 Architecture & Filesystem
4 Functional Logic Breakdown
5 Setup and Installation
6 Future Improvements

<<<<Project Overview>>>>

Workspace is a modern, responsive To-Do application built with a modular approach. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks, providing a seamless user experience with real-time filtering, persistent dark mode, and state management.

<<<<Tech Stack>>>>
 •Frontend: HTML5, Tailwind CSS.

 •Logic: Vanilla JavaScript (ES6 Modules).

 •Build Tool: Vite.

 •Icons: FontAwesome.

 •Data Persistence: JSON Server (REST API) & Browser Storage (LocalStorage/SessionStorage).

<<<<Architecture & Filesystem>>>>
1. HTML (⁠index.html⁠)
The structure follows a mobile-first philosophy using Tailwind utility classes.

 The Container: A centered, rounded, flex-column layout acting as the primary dashboard.
 Controls: Includes an input field for new tasks, a search bar for filtering, and specific controls for toggling the UI theme (Dark Mode) and task categories (All/Pending/Completed).

 Dynamic Injection: The ⁠<ul>⁠ with the ID ⁠listTask⁠ serves as the anchor point where JavaScript injects task items dynamically based on the state.

2. Styles (⁠style.css⁠)
We combine standard CSS with Tailwind directives:
 Tailwind Integration: ⁠@import "tailwindcss"⁠ and ⁠@import "@fortawesome/fontawesome-free"⁠.

 Custom Variables: The ⁠:root⁠ selector defines a color palette for main backgrounds, text, and alert states (⁠--success⁠, ⁠--error⁠).

 Dark Mode Support: Utilizes ⁠darkMode: 'class'⁠ strategy. The CSS interacts with the ⁠dark⁠ class added to the ⁠html⁠ element to swap variable values or background colors.

3. JavaScript (⁠main.js⁠ & ⁠api.js⁠)
The logic is split to separate concerns:
 ⁠api.js⁠: Handles all asynchronous communication with the JSON-server. It uses ⁠fetch⁠ to handle ⁠GET⁠, ⁠POST⁠, ⁠PATCH⁠, and ⁠DELETE⁠ requests, returning promises that keep the UI in sync with the server.
 
 •⁠main.js⁠: The brain of the application.
 State Management: An object ⁠state⁠ tracks the filter status, search input, and theme preference.
 Persistence: Uses ⁠localStorage⁠ to keep the user's Dark Mode preference across sessions. ⁠sessionStorage⁠ is utilized to hold "draft" task data, preventing data loss on accidental page refreshes.

 Render Engine: A ⁠renderTasks()⁠ function that performs client-side filtering on the data fetched from the API before mapping it to the DOM.
4. JSON (⁠db.json⁠)
The mock database acts as the single source of truth. It stores an array of objects where each object contains:

 •⁠id⁠: Unique identifier.

•⁠title⁠: The task description.

 •⁠completed⁠: A boolean representing the task status.

<<<<unctional Logic Breakdown>>>>
Filtering and Search
The application implements a non-destructive filter. When ⁠renderTasks()⁠ is triggered, it performs a chain of operations:

1 Filter by Search: Checks if the task title includes the string from ⁠state.search⁠.

2 Filter by Status: If ⁠state.filter⁠ is set to 'completed' or 'pending', it uses ⁠.filter()⁠ to prune the array accordingly.

3 Dynamic Rendering: It re-builds the DOM tree for the list, appending appropriate classes (like ⁠line-through⁠ for completed tasks).

<<<<Persistent Dark Mode>>>>
 Detection: On load, the script checks ⁠localStorage.getItem('darkMode')⁠.

 Toggling: The ⁠toggleDarkMode⁠ function uses ⁠document.documentElement.classList.toggle('dark')⁠. Because Tailwind is configured for ⁠class⁠ mode, this instantly cascades color changes throughout the application.

<<<<Setup and Installation>>>>
Prerequisites
 •Node.js installed.
 ⁠•json-server⁠ installed globally or as a dependency.

 <<<<Installation Steps>>>>
 1. clone the repository
 2. install dependencies: 
 bash; 
 •nmp install

 <<<<Future Improvements>>>>
 Drag-and-Drop: Implement HTML5 drag-and-drop API to reorder tasks.

 Due Dates: Expand the JSON schema to include timestamps for task deadlines.

 Animations: Use Framer Motion or simple CSS keyframes for smoother task entry and removal.
 
Developed as a collaborative project, ensuring high performance and modular code maintenance.
