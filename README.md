# 🚀 Employee Management System

### A Full Stack Web Application | React • Spring Boot • MySQL

A secure and responsive **Employee Management System** built using React for the frontend and Spring Boot for the backend. The application simplifies employee data management with JWT-based authentication, role-based authorization, and RESTful APIs.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-project-architecture)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🎯 Overview

The Employee Management System provides a centralized platform for managing employee information efficiently. It combines a modern React interface with a Spring Boot REST API and a MySQL database.

The application includes authentication, employee management operations, input validation, exception handling, and employee search and pagination.

## ✨ Features

- 🔐 **JWT Authentication** — Secure login and token-based authentication.
- 🛡️ **Role-Based Authorization** — Separate permissions for administrators and regular users.
- 👥 **Employee Management** — Create, view, update, and delete employee records according to permissions.
- 🔎 **Search & Filtering** — Find employees using supported search criteria, department, and status.
- 📄 **Pagination** — Retrieve employee records in manageable pages.
- ✅ **Input Validation** — Validate employee details before processing requests.
- ⚠️ **Global Exception Handling** — Return structured error responses for common API failures.
- 📊 **Dashboard** — View employee information and summary statistics.
- 🔗 **RESTful APIs** — Connect the React frontend to the Spring Boot backend.
- 🗄️ **MySQL Integration** — Persist employee and application data.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Backend | Java, Spring Boot, Spring Web |
| Security | Spring Security, JWT |
| Database | MySQL |
| Data Access | Spring Data JPA / Hibernate |
| Build Tool | Maven |
| API Testing | Postman |
| Version Control | Git & GitHub |

## 🏗️ Project Architecture

```text
Employee-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── ...
│
├── .gitignore
└── README.md
```

The frontend communicates with the backend through HTTP requests. The backend validates requests, applies authentication and authorization rules, performs business operations, and interacts with MySQL.

## 🔌 API Endpoints

The following endpoints illustrate the main API operations. Confirm the exact authentication paths and HTTP mappings in your backend before publishing this section.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/employees` | Retrieve employee records |
| GET | `/api/employees/{id}` | Retrieve an employee by ID |
| GET | `/api/employees/page` | Retrieve paginated and filtered results |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

**Pagination example:**

```http
GET /api/employees/page?search=chandu&department=IT&status=Active&page=0&size=10
```

Authenticated endpoints require a valid JWT in the request header:

```http
Authorization: Bearer <your-jwt-token>
```

## 🚀 Getting Started

### Prerequisites

Install the following before running the application:

- Java version compatible with the project's Maven configuration
- Node.js and npm
- MySQL Server
- Git
- Maven, or use the Maven Wrapper if included

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/Employee-Management-System.git
cd Employee-Management-System
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Configure MySQL

Create the database configured for your backend. For example:

```sql
CREATE DATABASE employee_management;
```

Use the actual database name from your project configuration if it differs.

Configure your database URL, username, and password using environment variables or your local application configuration. Never commit real credentials to GitHub.

### 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

Use the port configured in your Spring Boot application. The examples in this README assume `8080`; adjust them if your configuration differs.

### 4. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### 5. Test the application

1. Log in with a valid account.
2. Verify that the JWT is included in protected API requests.
3. Test employee creation, viewing, updating, and deletion according to the account's permissions.
4. Test search, department/status filters, and pagination.
5. Verify that invalid input produces appropriate error responses.

## ⚙️ Environment Configuration

Configure the values required by your application locally.

Typical settings include:

- MySQL connection URL
- Database username and password
- JWT signing secret
- Frontend API base URL
- Allowed frontend origin for CORS

Use environment variables for sensitive values in development and deployment. Do not publish real credentials, JWT signing secrets, or production tokens.

## 🧪 Testing

The application can be tested using:

- **Postman:** Authentication, CRUD operations, filtering, pagination, and error responses.
- **Frontend browser testing:** Login flow, dashboard, employee pages, and API integration.
- **Automated tests:** Add and run JUnit and Mockito tests for service, repository, and controller logic where appropriate.

## 🔮 Future Enhancements

- Swagger / OpenAPI documentation
- Automated backend test coverage
- Employee profile image uploads
- CSV or Excel export
- Docker-based deployment
- Cloud deployment with production monitoring
- Audit logging for important employee operations

## 👨‍💻 Author

**Chandrakantha K**

Aspiring Java Full Stack Developer

Interested in Java, Spring Boot, React, REST APIs, SQL, and building practical software applications.

- GitHub: [chandrakanthc072-pixel](https://github.com/chandrakanthc072-pixel)
- LinkedIn: Add your LinkedIn profile URL here.

---

⭐ If you find this project useful, consider giving the repository a star.

**Built with Java, React, Spring Boot, and MySQL.**
