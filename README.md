# Inventus test front 

### Frontend Overview

The front-end of the Inventus Agency test project is built using React.

It consists of three main user pages: login, sign up, and home. 

The home page displays various tables, each with a different style based on their type. Users can click on a table to view its details and make a reservation if they are logged in. The details and reservation functionality are integrated into a sidebar component.

Admin users have additional capabilities, including the ability to change the position of tables within the restaurant layout. They can freely rearrange tables unless they are locked. Admins can also modify table information and lock/unlock tables from the sidebar.

Additionally, admin users have access to a mini dashboard for managing tables, users, and reservations. This dashboard provides features such as viewing, adding, editing, and deleting entries for each entity.

### Technologies Used

- **React**: A JavaScript library for building user interfaces, used for developing the front-end components and managing application state.
- **Axios**: A promise-based HTTP client for making requests to the backend API endpoints.
- **Material-UI**: A popular React UI framework that provides pre-designed components and themes for building responsive and visually appealing user interfaces.
- **React Router DOM**: A library for handling navigation and routing within a React application, used for defining different routes and rendering components accordingly.
- **Day.js**: A lightweight and modern JavaScript library for parsing, validating, manipulating, and displaying dates and times in the browser.
- **Outlet**: A library that simplifies the management of global states and data sharing between components in React applications.

### Instructions

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install the required dependencies.
3. **Start the Development Server**: Run `npm start` to start the development server. The application will open automatically in your default web browser.
4. **Explore the Application**: Use the navigation links to access the login, sign up, and home pages. Explore the functionality provided for both regular users and admin users.
