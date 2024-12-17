# TaskFlow - Simple Task Manager

## Overview
TaskFlow is a full stack task management application designed for efficient task management. It is containerized using docker.

## Features
- User Registration and Login
- Create, View, Edit, and Delete Tasks
- Simple task Analytics Dashboard
- Secure Authentication with JWT

## Technologies Used
### Frontend:
- React.js
- Axios
- CSS for styling

### Backend:
- Node.js
- Express.js
- SQLite for the database
- JWT for authentication

### Deployment:
- Docker
- Docker Compose

## Installation and Setup
## Installation and Setup

### Prerequisites
- Node.js (v16+)
- Docker and Docker Compose

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ColoMack/simple-task-manager/tree/master

2. cd simple-task-manager

3. docker-compose up --build

4. Access the app:
   Frontend: http://localhost:3000
   Backend: http://localhost:5000

5. Usage Instructions
    1. Sign up for a new account or log in with existing credentials.
    2. Create tasks by clicking the "New Task" button on the dashboard.
    3. View all tasks in the task list.
    4. Edit or delete tasks using the respective buttons.
    5. View detailed task analytics on the dashboard.

## Environment Variables
Create a `.env` file in the `backend` folder with the following variables:
    JWT_SECRET=your_jwt_secret
    PORT=5000

## Known Issues
- App is not design responsive.
- Ensure Docker containers are restarted after any code changes.