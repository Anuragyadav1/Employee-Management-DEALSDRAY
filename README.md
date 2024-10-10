# MERN Employee Management System

A **MERN stack** application for managing employee data, with features like authentication, CRUD operations, search, pagination, and responsive design.

## Features

- **Authentication:** Secure login for users.
- **Employee Management:** Add, edit, delete, and view employees.
- **Search & Pagination:** Search employees by name and navigate through the list with pagination.
- **Sorting:** Employees sorted by the date they were added.
- **Responsive Design:** Optimized for all devices.

## Technologies

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/employee-management-system.git
    ```
2. Install dependencies:
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```

## Environment Variables

Create a `.env` file in the `backend` folder with:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000

## Run the Application

To run the project, follow these steps:

1. **Start the Backend:**

    Navigate to the `backend` directory and run the following command to start the backend server:

    ```bash
    cd backend
    node server.js
    ```

    The backend will run on `http://localhost:5000`.

2. **Start the Frontend:**

    Navigate to the `frontend` directory and run the following command to start the React frontend:

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will run on `http://localhost:5173`.

After both servers are running, you can access the application by navigating to `http://localhost:5173` in your browser.

