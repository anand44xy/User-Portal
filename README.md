# User Management Portal

![User Portal Screenshot](https://github.com/anand44xy/User-Portal/blob/main/Frontend/public/Screenshot%20(275).png)

This project is a **Full-Stack User Management Portal** built using **React** for the frontend and **Node.js/Express** for the backend. The application allows administrators to manage users by providing features like user registration, editing, deletion, and toggling their active/inactive status. The design is responsive, optimized for various screen sizes, and includes a show/hide password functionality for better user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **User Registration**: Register new users with name, email, contact number, and password.
- **Edit User**: Update user details using the form.
- **Delete User**: Remove users from the system with a single click.
- **Toggle User Status**: Change the status (active/inactive) of users.
- **Show/Hide Password**: Toggle visibility of the password field in the registration form.
- **Responsive Design**: Mobile, tablet, and desktop friendly layout using **Tailwind CSS**.
- **Notifications**: Toast notifications for success and error messages using **React Toastify**.

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js to communicate with the backend API.
- **React Toastify**: For displaying toast notifications.
- **Tailwind CSS**: Utility-first CSS framework for building responsive UIs.
- **Font Awesome**: Icons used for buttons (e.g., delete and edit).

### Backend:
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **MongoDB** (assumed): NoSQL database for storing user data.

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js and npm installed
- MongoDB instance running (optional: MongoDB Atlas for cloud storage)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/anand44xy/user-management-portal.git
    cd user-management-portal
    ```

2. **Install frontend dependencies**:
    ```bash
    cd client
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    cd server
    npm install
    ```

4. **Set up MongoDB**: 
    If you are using MongoDB locally, ensure that it's running, or configure your MongoDB Atlas connection string in the backend environment variables.

5. **Start the backend server**:
    ```bash
    cd server
    npm start
    ```
    This will start the backend API server on `http://localhost:5000`.

6. **Start the frontend React app**:
    ```bash
    cd client
    npm start
    ```
    The React app will be running at `http://localhost:3000`.

7. **Test the application**:
    Open your browser and go to `http://localhost:3000` to view and use the User Management Portal.


## API Endpoints

Here are the available API routes for the user management system:

### Users API
- **GET** `/user/`: Fetch all users.
- **POST** `/user/register`: Register a new user.
- **PATCH** `/user/update/:id`: Update an existing user.
- **DELETE** `/user/delete/:id`: Delete a user.

### Example Request:

- **GET** `/user/`
    ```json
    {
        "statusType": 1,
        "users": [
            {
                "_id": "123456789",
                "name": "John Doe",
                "email": "johndoe@mail.com",
                "contact": "9876543210",
                "statusType": 1
            }
        ]
    }
    ```

## Screenshots

### 1. User Dashboard

_The main dashboard showing the list of users, where you can add, edit, or delete users._

### 2. Register User Form

_Form used to register a new user._

### 3. Responsive View (Mobile)

_Mobile-friendly layout for ease of use on smaller devices._

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or find any bugs.

---

### Contact

For any inquiries, you can reach out to me via:
- **Email**: anand44xy@gmail.com
- **GitHub**: [anand44xy](https://github.com/anand44xy)

---

Happy coding! 😊

