# 📌 TaskBoard – Project Task Management System

A full-stack project management application built with **React + ASP.NET Core Web API + SQLite (EF Core)**.

It allows users to manage projects, tasks, and track progress with filtering, sorting, pagination, and dashboard analytics.

---

## 🚀 Features

### 📁 Project Management
- Create / View / Delete projects
- Task summary per project (Todo, In Progress, Review, Done)
- Cascade delete support

### ✅ Task Management
- Create, update, delete tasks
- Priority levels: Low / Medium / High / Critical
- Status tracking: Todo / In Progress / Review / Done
- Due date validation (future only)
- Filtering + Sorting + Pagination

### 📊 Dashboard
- Total projects & tasks
- Task status breakdown
- Overdue task tracking
- Due soon stats

### 💬 Comments System
- Add comments on tasks
- View task activity

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- React Toastify
- Tailwind CSS

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- C# Services + Interfaces architecture

---

## 🗂️ Project Structure

### Backend                                
TaskBoard.Api/
├── Controllers
├── Services
├── Models
├── Data (DbContext + Migrations)
├── Middleware


### Frontend
src/
├── pages
├── components
├── api
├── hooks


---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd TaskBoard.Api
dotnet restore
dotnet ef database update
dotnet run
```
Runs on: http://localhost:5143

💻 Frontend
```
cd frontend
npm install
npm run dev
```

Runs on: http://localhost:5173

🗄️ Database
1. SQLite used via EF Core
2. Migrations included
3. Relationships:
     Project → Tasks (1:M)
     Task → Comments (1:M)


📌 API Endpoints
Projects
```
GET /api/projects
POST /api/projects
GET /api/projects/{id}
DELETE /api/projects/{id}
```
Tasks
```
GET /api/projects/{projectId}/tasks
POST /api/projects/{projectId}/tasks
GET /api/tasks/{id}
PUT /api/tasks/{id}
DELETE /api/tasks/{id}
```
Comments
```
GET /api/tasks/{taskId}/comments
POST /api/tasks/{taskId}/comments
```
Dashboard
```
GET /api/dashboard
```
🧪 Key Features Implemented
Filtering (status, priority)
Sorting (createdAt, dueDate, priority)
Pagination (page + pageSize)
Validation in backend service layer
Global exception handling (basic)
Toast notifications in frontend
Modal-based UI for create operations
📸 Screenshots
## 📊 Dashboard View

![Dashboard Screen](task-board-ui/src/assets/Dashboard.png)

### 📁 Projects
![Projects](task-board-ui/src/assets/Projects.png)

### ➕ Create Project
![Create Project](task-board-ui/src/assets/createProject.png)

### 📝 Create Task
![Create Task](task-board-ui/src/assets/CreateTask.png)


🧠 What I Learned
Full-stack architecture separation
EF Core relationships + migrations
API design using service pattern
React state management + hooks
Real-world CRUD system design
📦 Future Improvements
Authentication (JWT)
Drag & drop Kanban board
Real-time updates (SignalR)
Better UI animations


Architecture Diagram
```mermaid
graph TD

A[React Frontend] --> B[UI Layer]
B --> C[API Layer]
C --> D[ASP.NET Core API]
D --> E[Service Layer]
E --> F[EF Core DbContext]
F --> G[SQLite Database]

D --> D1[Projects Controller]
D --> D2[Tasks Controller]
D --> D3[Comments Controller]
D --> D4[Dashboard Controller]

E --> E1[Business Logic]
E --> E2[Validation]
E --> E3[Error Handling]
E --> E4[Filtering & Pagination]

F --> F1[Project Entity]
F --> F2[Task Entity]
F --> F3[Comment Entity]
F --> F4[Migrations]

%% ===== STYLES =====
classDef frontend fill:#E3F2FD,stroke:#1E88E5,color:#000;
classDef backend fill:#E8F5E9,stroke:#43A047,color:#000;
classDef service fill:#FFF3E0,stroke:#FB8C00,color:#000;
classDef db fill:#F3E5F5,stroke:#8E24AA,color:#000;

class A,B frontend;
class C,D,D1,D2,D3,D4 backend;
class E,E1,E2,E3,E4 service;
class F,F1,F2,F3,F4 db;
class G db;
```
