# Task Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for task management with analytics dashboard.

## Project Overview

This project implements a task management system with user authentication, task creation/management, and analytics visualization. It's designed to follow modern DevOps practices including containerization, CI/CD pipelines, and production deployment.

## Features

- User registration and authentication
- Task creation, updating, and deletion 
- Task categorization and prioritization
- Task status tracking
- Visual analytics dashboard
- RESTful API design

## Technology Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- RESTful API design

### Frontend
- React.js
- React Hooks for state management
- Modern CSS with flexbox/grid layouts

### DevOps & Deployment
- Docker for containerization
- GitHub Actions for CI/CD
- Testing across different operating systems

## Project Structure

```
/
├── backend/              # Express server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   └── routes/           # Express routes
│
├── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # React components
│       ├── pages/        # Page components
│       └── services/     # API services
│
└── docker-compose.yml    # Docker compose configuration
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-management-app.git
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

4. Create a .env file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Run the development servers

   Backend:
   ```
   cd backend
   npm run dev
   ```

   Frontend:
   ```
   cd frontend
   npm start
   ```

## License

MIT
