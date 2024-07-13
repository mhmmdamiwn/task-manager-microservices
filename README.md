# Task Manager Microservices

## Project Overview

This project is a microservices-based task management application designed to demonstrate skills in Node.js development, RESTful APIs, microservices architecture, database interactions, caching, rate limiting, and documentation. The application includes user authentication and authorization, task management features, and integrates various technologies including PostgreSQL, Redis, RabbitMQ, and Docker.

## Features

- **User Authentication and Authorization**:
  - Register and login using JWT (JSON Web Tokens).
  - Role-based access control (Admin and User).

- **Task Management**:
  - CRUD operations for tasks.
  - Task search with filtering options.
  - Functionality to mark tasks due today as "in-progress".

- **Microservices Architecture**:
  - **Authentication Service**: Handles user registration, login, and JWT management.
  - **Task Management Service**: Manages tasks including creation, retrieval, update, and deletion.
  - Uses RabbitMQ for inter-service communication.

- **Database**:
  - PostgreSQL for persistent data storage.

- **Caching**:
  - Redis for caching frequently accessed data.

- **Rate Limiting**:
  - Implemented to prevent abuse of the API.

## Architecture

This project uses the [Porto](https://github.com/Mahmoudz/Porto) architecture, which provides a modular and maintainable structure for building scalable microservices. The architecture promotes clear separation of concerns, allowing each microservice to be developed, tested, and deployed independently.

### Microservices

1. **Authentication Service**:
   - Handles user registration and authentication.
   - Exposes endpoints for user management.
   - Communicates with RabbitMQ for service interactions.

2. **Task Management Service**:
   - Manages tasks and provides endpoints for task operations.
   - Utilizes PostgreSQL for data persistence and Redis for caching.
   - Communicates with RabbitMQ for inter-service messaging.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mhmmdamiwn/task-manager-microservices.git
   cd task-manager-microservices
   ```

2. **Build and Run the Services**

Use Docker Compose to build and start the services:

   ```bash
   docker-compose up --build
   ```
This will start the following services:

- PostgreSQL (Database)
- RabbitMQ (Message Broker)
- Redis (Caching)
- Authentication Service
- Task Management Service

### 3. **Configuration**
Update the environment variables in docker-compose.yml as needed to fit your configuration.

### 4. **Running the Application**
- Authentication Service: Accessible at http://localhost:3001
- Task Management Service: Accessible at http://localhost:3002


### 5. **Running the Tests**

## Running the Tests

To run unit and integration tests for both services:

1. **Authentication Service Tests**

   ```bash
   cd Authentication
   npm run test

2. **Task Management Service Tests**

   ```bash
   cd Authentication
   npm run test


### 6. **API Documentation**


## API Documentation

### Authentication Service

- **Register User**

  - **Endpoint**: `/register` (POST)
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Responses**:
    - `201`: User registered successfully.
    - `400`: Invalid input.

- **Login User**

  - **Endpoint**: `/login` (POST)
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Responses**:
    - `200`: Login successful, returns JWT token.
    - `401`: Invalid credentials.

### Task Management Service

- **Get All Tasks**

  - **Endpoint**: `/tasks` (GET)
  - **Security**: Bearer Auth
  - **Responses**:
    - `200`: A list of tasks.

- **Create a New Task**

  - **Endpoint**: `/tasks` (POST)
  - **Request Body**:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending",
      "dueDate": "2024-07-13T00:00:00Z"
    }
    ```
  - **Responses**:
    - `201`: Task created successfully.

- **Get Task by ID**

  - **Endpoint**: `/tasks/{id}` (GET)
  - **Parameters**:
    - `id`: Task ID
  - **Responses**:
    - `200`: A single task.
    - `404`: Task not found.

- **Update Task by ID**

  - **Endpoint**: `/tasks/{id}` (PUT)
  - **Parameters**:
    - `id`: Task ID
  - **Request Body**:
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "status": "in-progress",
      "dueDate": "2024-07-14T00:00:00Z"
    }
    ```
  - **Responses**:
    - `200`: Task updated successfully.
    - `404`: Task not found.

- **Delete Task by ID**

  - **Endpoint**: `/tasks/{id}` (DELETE)
  - **Parameters**:
    - `id`: Task ID
  - **Responses**:
    - `204`: Task deleted successfully.
    - `404`: Task not found.

- **Search Tasks**

  - **Endpoint**: `/tasks/search` (GET)
  - **Parameters**:
    - Query parameters for filtering tasks (e.g., by status, due date).

- **Mark Tasks Due Today**

  - **Endpoint**: `/tasks/mark-today` (PUT)
  - **Responses**:
    - `200`: All tasks due today marked as "in-progress".


## Built-in Admin User

For testing purposes, a built-in admin user is available with the following credentials:

- **Email**: `admin@example.com`
- **Password**: `adminpassword`

Use these credentials to test admin-level API operations, including managing all tasks and viewing user-specific data.


## Architectural Decisions

1. **Microservices**: Split into Authentication and Task Management services to allow independent scaling and development.
2. **Database**: PostgreSQL used for reliable data persistence.
3. **Caching**: Redis implemented to cache frequently accessed data and reduce database load.
4. **Message Broker**: RabbitMQ used for inter-service communication, ensuring asynchronous processing and decoupling.
5. **Rate Limiting**: Added to prevent abuse of the API.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
