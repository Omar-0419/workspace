Workspace — Modern To-Do Application
📌 Project Overview

Workspace is a modern and responsive To-Do Application designed with a modular architecture and a clean user experience in mind.
The application enables users to efficiently manage tasks through complete CRUD operations (Create, Read, Update, Delete) while maintaining smooth performance and intuitive interactions.

Key features include:

✅ Real-time task filtering
🌙 Persistent Dark Mode
🔎 Live search functionality
💾 Data persistence with LocalStorage & SessionStorage
🔄 REST API integration using JSON Server
⚡ Modular ES6 JavaScript architecture
🛠 Tech Stack
Technology	Purpose
HTML5	Application structure
Tailwind CSS	Responsive UI styling
Vanilla JavaScript (ES6 Modules)	Application logic
Vite	Development & build tool
FontAwesome	Icons
JSON Server	Mock REST API
LocalStorage / SessionStorage	Client-side persistence
🏗 Architecture & File Structure
workspace/
│
├── index.html
├── style.css
├── main.js
├── api.js
├── db.json
├── package.json
└── vite.config.js
📄 1. HTML Structure (index.html)

The application follows a mobile-first design philosophy using Tailwind utility classes.

Main Layout
Centered dashboard container
Rounded modern UI
Flexible column layout
User Controls

The interface contains:

Task input field
Search bar
Theme switcher (Dark Mode)
Task filters:
All
Pending
Completed
Dynamic Rendering

The task list is dynamically injected into:

<ul id="listTask"></ul>

This element acts as the rendering root where tasks are generated via JavaScript.

🎨 2. Styling (style.css)

The project combines Tailwind CSS with custom CSS variables for better maintainability.

Tailwind Imports
@import "tailwindcss";
@import "@fortawesome/fontawesome-free";
CSS Variables
:root {
  --success: #22c55e;
  --error: #ef4444;
}

These variables centralize:

Colors
Backgrounds
Alert states
Theme customization
🌙 Dark Mode System

Dark Mode is implemented using Tailwind's:

darkMode: 'class'

The application toggles the dark class on the root HTML element:

document.documentElement.classList.toggle('dark')

This instantly updates the UI theme across the application.

⚙️ 3. JavaScript Logic

The logic is divided into two main modules for better separation of concerns.

📡 api.js

Responsible for all communication with the JSON Server API.

Supported Requests
GET
POST
PATCH
DELETE
Example
fetch('http://localhost:3000/tasks')

This module ensures synchronization between the UI and the database.

🧠 main.js

Acts as the core controller of the application.

State Management

A centralized state object stores:

const state = {
  filter: 'all',
  search: '',
  darkMode: false
}
💾 Persistence Layer
LocalStorage

Stores:

Dark Mode preference
localStorage.setItem('darkMode', true)
SessionStorage

Stores:

Draft task content

This prevents data loss after accidental page refreshes.

🔍 Functional Logic Breakdown
Real-Time Filtering System

The application uses a non-destructive filtering strategy inside renderTasks().

Filtering Flow
1️⃣ Search Filtering
task.title.includes(state.search)

Filters tasks according to the user's input.

2️⃣ Status Filtering
.filter(task => task.completed)

Depending on the active filter:

All
Pending
Completed
3️⃣ Dynamic Rendering

Tasks are re-rendered dynamically into the DOM.

Completed tasks receive styles such as:

line-through

for visual feedback.

🌙 Persistent Dark Mode
Detection on Startup
localStorage.getItem('darkMode')

The app checks stored preferences when loading.

Theme Toggle
toggleDarkMode()

Updates the root class and persists the preference automatically.

🗄 Database Structure (db.json)

The mock database acts as the application's single source of truth.

Example Schema
{
  "id": 1,
  "title": "Finish project documentation",
  "completed": false
}
🚀 Setup & Installation
Prerequisites

Before starting, make sure you have installed:

Node.js
JSON Server
📥 Installation Steps
1️⃣ Clone the repository
git clone <repository-url>
2️⃣ Install dependencies
npm install
3️⃣ Start JSON Server
json-server --watch db.json
4️⃣ Run the development server
npm run dev
✨ Future Improvements
📌 Drag & Drop Support

Implement the HTML5 Drag-and-Drop API for task reordering.

📅 Due Dates

Expand the database schema with:

deadlines
timestamps
reminders
🎞 UI Animations

Add smoother transitions using:

CSS Keyframes
Framer Motion
🔔 Notifications

Add toast notifications for:

Task creation
Updates
Errors
🤝 Collaboration & Maintainability

This project was developed collaboratively with a strong focus on:

⚡ Performance
🧩 Modular architecture
🧹 Clean code practices
📱 Responsive design
🔧 Scalability
✅ Conclusion

Workspace demonstrates how a lightweight stack using Vanilla JavaScript + Tailwind CSS can deliver a modern and scalable task management experience while maintaining excellent performance and maintainable architecture.
