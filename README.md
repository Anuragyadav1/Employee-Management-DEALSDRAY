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
    cd server && npm install
    cd ../client && npm install
    ```

## Environment Variables

Create a `.env` file in the `server` folder with:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
