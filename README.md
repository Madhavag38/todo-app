# 📝 Full Stack Todo App
A modern full-stack Todo application with authentication, CRUD operations, and dark mode support.
---
## 🚀 Features
- 🔐 User Authentication (Signup / Signin using JWT)
- ➕ Add Todo
- ✏️ Edit Todo
- ✅ Mark Todo as Completed
- 🗑 Delete Todo
- 🌙 Dark Mode Toggle
- 🔄 Real-time UI updates
- 🔒 Protected Routes (Auth Middleware)
---
## 🛠 Tech Stack
### Frontend:
- HTML
- CSS
- JavaScript
### Backend:
- Node.js
- Express.js
### Database:
- MongoDB (Mongoose)
---
## 📂 Project Structure
TODOAPP/
│
├── backend/ # Express server & APIs
├── frontend/ # UI (HTML, CSS, JS)
├── .env.example # Environment variables template
├── .gitignore # Ignored files
└── README.md # Project documentation
---
## ⚙️ Installation & Setup
### 1️⃣ Clone the repository
git clone https://github.com/Madhavag38/todo-app.git
cd todo-app
---
### 2️⃣ Install dependencies
npm install
---
### 3️⃣ Setup environment variables
Create a `.env` file in the root folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
---
### 4️⃣ Run the backend
npm start
---
### 5️⃣ Open frontend
Open `index.html` in browser
---
## 🌐 API Endpoints
| Method | Endpoint        | Description       |
|--------|---------------|------------------|
| POST   | /signup       | Register user    |
| POST   | /signin       | Login user       |
| GET    | /todos        | Get all todos    |
| POST   | /todo         | Create todo      |
| PUT    | /todo/:id     | Update todo      |
| DELETE | /todo/:id     | Delete todo      |
---
## 📸 Screenshots

---
## 📌 Future Improvements
- 📅 Due Dates for Todos
- ⭐ Priority Levels
- 📱 Mobile Responsive UI
- 🔔 Notifications
---
## 👨‍💻 Author
**Madhav Agarwal**
---
## ⭐ Show your support
If you like this project, give it a ⭐ on GitHub!
