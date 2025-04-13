# MERN Stack Authentication Project

This is a full-stack authentication project built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Next.js**. It includes user registration, login, logout, email verification, and password reset functionality.

> 🔧 Based on the YouTube video: **"Full Advanced Authentication Tutorial - Node.js, JWT, React.js, Next.js, MongoDB, Express"**

---

## 📦 Tech Stack

### Frontend
- Next.js 15
- React 19
- Axios
- React Hot Toast
- TailwindCSS

### Backend
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens)
- Nodemailer (with Express Handlebars for email templates)
- Bcrypt

### Dev Tools
- Docker & Docker Compose
- TypeScript (Frontend)
- Dotenv
- Nodemon

---

## 🔐 Features

- User registration with email verification
- Secure login/logout with JWT and HTTP-only cookies
- Password reset with email link
- Protected routes
- Fully containerized with Docker

---

## 🛠️ How to Run the Project

Make sure you have **Docker** and **Docker Compose** installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Julian0399/MERNstackAuthentication.git
   cd MERNstackAuthentication
   ```

2. **Create environment variables:**

   Inside the `/backend` folder, create a `.env` file with the following variables (adjust values as needed):

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   USER_EMAIL=your_email@example.com
   USER_PASS=your_email_password_or_app_password
   SMTP_USER=noreply@gmail.com
   NODE_ENV=development 
   ```

3. **Run the project using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the App:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000/api/v1](http://localhost:8000/api/v1)

---

## 📬 Email Features

- Email verification is sent upon signup.
- Password reset emails include secure, hashed tokens.
- Emails use customizable Handlebars templates via Nodemailer.

---

## 🔐 Security

- Passwords are hashed using Bcrypt.
- Tokens are securely handled and stored (hashed in DB).
- HTTP-only cookies for access tokens.

---

## License

This project is open-source and available for educational purposes.