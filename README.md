# Employee Leave Management System

A robust, full-stack web application designed to streamline employee leave requests and approvals. This system provides a secure interface for employees to apply for leave and for administrators to manage those requests efficiently.

## 🚀 Key Features

### 🔹 User Roles & Authentication
* **Secure Sign-up/Login:** Role-based access (Admin vs. Employee) powered by `bcryptjs` for password security and `express-session` for state management.
* **Session Security:** Sessions are stored persistently in MongoDB using `connect-mongo`.
* **Route Protection:** Middleware ensures users cannot access unauthorized pages (e.g., Employees cannot view the Admin Dashboard).

### 🔹 Employee Features
* **Apply for Leave:** Simple interface to select dates and provide a reason for leave.
* **Validation:** Prevents invalid applications (e.g., End Date before Start Date).
* **Status Tracking:** Real-time view of leave history and approval status (Pending/Approved/Rejected).

### 🔹 Admin Features
* **Dashboard Overview:** A centralized view of all leave requests from all employees.
* **Approval Workflow:** Approve or Reject leave requests with a single click.
* **Advanced Filtering:** Filter requests by status (Pending, Approved, Rejected).
* **Search Functionality:** Quickly find requests by username or reason text.
* **Pagination:** efficiently handles large lists of requests.

### 🔹 Bonus Features Implemented
* **Search & Filter:** Admin dashboard includes robust search and filtering capabilities.
* **Pagination:** Admin dashboard is paginated for better performance and UI.

---

## 🛠️ Technology Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** EJS (Embedded JavaScript templates), Bootstrap 5
* **Authentication:** `express-session`, `connect-mongo`, `bcryptjs`
* **Utilities:** `nodemailer` (Email), `dotenv` (Env variables)

---

## ⚙️ Installation & Setup

Follow these steps to run the application locally.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a cloud URI)

### 2. Clone and Install
Extract the project folder and open a terminal in the root directory.

```bash
# Install dependencies
npm install

3. Environment Configuration
The project uses a .env file for configuration. A sample is provided below:

Code snippet

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/leave_management
SESSION_SECRET=your_super_secret_key_123

4. Run the Application
Bash

# Start the server
npm start


📂 Project Structure
Plaintext

leave-management-system/
├── src/
│   ├── config/          # Database connection logic
│   ├── controllers/     # Business logic (Auth, Leaves)
│   ├── middlewares/     # Route protection (isAdmin, isAuthenticated)
│   ├── models/          # Mongoose Schemas (User, Leave)
│   ├── routes/          # API Routes
│   └── views/           # EJS Templates (Frontend)
├── public/              # Static assets (CSS/Images)
├── screenshots/         # Screenshots of the working application
├── server.js            # Entry point
└── README.md            # Documentation