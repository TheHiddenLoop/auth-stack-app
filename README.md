# 🔐 Full-Stack Authentication App

A secure and scalable authentication system built with Node.js, Express, MongoDB, and React + Recoil. It features OTP-based email verification, hashed passwords, JWT cookies, password recovery, protected routes, and rate-limiting—all structured for production readiness and professional presentation.

---

## 🚀 Features

- User signup with OTP email verification  
- Secure login with bcrypt password hashing  
- JWT authentication via HTTP-only cookies (valid for 7 days)  
- Forgot password via email token link  
- Password reset functionality  
- Protected routes using middleware  
- Rate limiting for critical endpoints  
- Logout that clears authentication cookie  
- Custom HTML email templates sent via Nodemailer  
- React frontend powered by Recoil for global state  

---

## 🧰 Tech Stack

| Layer      | Tech                                            |
|------------|-------------------------------------------------|
| Backend    | Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Nodemailer |
| Frontend   | React, Recoil, Axios, Vite, Tailwind CSS        |
| Dev Tools  | ESLint, dotenv, Morgan, CORS                    |

---

## ⚙️ Installation Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

---

## 📡 API Endpoints

All routes served under `/api/auth`.

| Method | Endpoint                  | Description                                |
|--------|---------------------------|--------------------------------------------|
| POST   | `/signup`                 | Register user with OTP                     |
| POST   | `/login`                  | Login with bcrypt (rate-limited)           |
| POST   | `/verify/otp`             | Verify OTP and activate account            |
| GET    | `/check`                  | Protected route to verify auth status      |
| POST   | `/reset/password`         | Request password reset via email           |
| POST   | `/reset-password`         | Reset password using token                 |
| POST   | `/logout`                 | Logout and clear auth cookie               |

---

## 📁 Folder Structure

### 🔧 Backend (`/server`)

```
server/
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── libs/
│   │   ├── email.js
│   │   ├── EmailTemplets.js
│   │   └── utils.js
│   ├── middleware/
│   │   └── middleware.js
│   ├── model/
│   │   └── db.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
├── .env
├── .env.example
├── package.json
```

### 🎨 Frontend (`/client`)

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── atoms/
│   │   ├── atoms.js
│   │   ├── checkAuth.js
│   │   └── useCheckAuth.js
│   ├── lib/
│   │   └── axios.js
│   ├── pages/
│   │   ├── EmailVarify.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── RequesResetPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Signup.jsx
│   ├── store/
│   │   └── useAuthStore.js
│   └── App.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── package.json
```

---

## 🧪 Running Locally

```bash
# Start backend (port 3000)
cd server
npm run dev

# Start frontend (port 5173)
cd ../client
npm run dev
```

Frontend runs on `http://localhost:5173` and connects to backend at `http://localhost:3000`.

---

## 🔐 Environment Variables (.env)

Backend `.env` file:

```
MONGO_URI=mongodb://localhost:27017/db_name
JWT_SECRET_ADMIN=
PORT=3000
GMAIL_USER=
GMAIL_PASS=
FRONTEND_URL=http://localhost:5173
```

---

## 🛡️ Security Practices

- **Password hashing** with bcrypt  
- **JWT tokens** stored in secure, HTTP-only cookies  
- **Email verification** via OTP  
- **Rate limiting** with custom middleware  
- **Token-based password reset** with expiration logic  
- **Environment variables** for secrets & sensitive configs  

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 Author

**Angesh**  
Backend & Full-Stack Developer  

---