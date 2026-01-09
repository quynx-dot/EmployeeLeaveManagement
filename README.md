# Employee Leave Management System

A web-based application for managing employee leave requests. Employees can sign up, apply for leave, and track status. Admins can view, approve, or reject requests.

## 🚀 Features
- **User Authentication**: Secure signup and login for Employees and Admins.
- **Role-Based Access Control**:
  - **Employees**: Apply for leave, view history, track status.
  - **Admins**: Dashboard view of all requests, approve/reject functionality.
- **Security**: Password hashing (Bcrypt), Session management (MongoDB Store), and protected routes.
- **UI/UX**: Responsive design using Bootstrap 5.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS (Templating), Bootstrap 5
- **Authentication**: Express-Session, Connect-Mongo

## ⚙️ Installation & Setup

1. **Prerequisites**
   - Node.js installed
   - MongoDB installed and running locally

2. **Clone/Unzip the project**
   ```bash
   cd leave-management-system