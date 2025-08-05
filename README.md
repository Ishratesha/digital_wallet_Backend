# digital_wallet_Backend
Here’s a full-featured `README.md` file tailored for your **Digital Wallet System Backend** project, including setup instructions, API overview, tech stack, features, and development guidance.

---

## 📱 Digital Wallet System – Backend API

A secure, role-based backend API for managing a mobile wallet system in Bangladesh. Built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**, it supports **users**, **agents**, and **admins** with distinct permissions.

---

### 🚀 Features

#### 👤 Users

* 🔐 Register/Login with phone number and password
* 💰 Add money (top-up)
* 💸 Withdraw money
* 📤 Send money to another user
* 📜 View transaction history

#### 🧑‍💼 Agents

* 💵 Cash-in (add money to user wallets)
* 💴 Cash-out (withdraw money from user wallets)
* 💼 View own commission history (optional)

#### 🛡️ Admin

* 🧾 View all users, agents, wallets, transactions
* ❌ Block/Unblock wallets
* ✅ Approve/Suspend agents
* ⚙️ (Optional) Set transaction fees and commission rates

---

### 🧱 Tech Stack

* **Node.js + Express.js** – Backend framework
* **MongoDB + Mongoose** – Database and ODM
* **TypeScript** – Type-safe development
* **JWT** – Authentication & Role-based Authorization
* **Bcrypt** – Password hashing
* **http-status-codes** – Clean status management

---

### 📁 Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── user/         // User model, controller, service
│   │   ├── wallet/       // Wallet model, controller, service
│   │   ├── transaction/  // Transaction logic (add, withdraw, send, cash-in/out)
│   │   ├── auth/         // Login & token management
│   └── middlewares/     // Error handling, auth middleware
├── config/               // Environment config
├── scripts/              // Seeder for super admin
├── server.ts             // App entrypoint
```

---

### ⚙️ Setup Instructions

#### 1. Clone the repo

```bash
git clone https://github.com/your-username/digital-wallet-backend.git
cd digital-wallet-backend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create `.env` file

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/digi_wallet
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES=7d
```

#### 4. Seed Super Admin

```bash
npm run seed:admin
```

Credentials:

```bash
Phone: 01703507716
Password: 54321
```

#### 5. Run development server

```bash
npm run dev
```

---

### 📬 API Endpoints Overview

| Method | Endpoint                        | Role   | Description               |
| ------ | ------------------------------- | ------ | ------------------------- |
| POST   | `/api/auth/login`               | All    | Login user/admin/agent    |
| POST   | `/api/users/register`           | Public | Register new user         |
| POST   | `/api/transactions/add-money`   | User   | Top-up wallet             |
| POST   | `/api/transactions/withdraw`    | User   | Withdraw from wallet      |
| POST   | `/api/transactions/send-money`  | User   | Send to another user      |
| GET    | `/api/transactions/history`     | User   | View own transactions     |
| POST   | `/api/transactions/cash-in`     | Agent  | Add to user wallet        |
| POST   | `/api/transactions/cash-out`    | Agent  | Withdraw from user wallet |
| GET    | `/api/admin/users`              | Admin  | View all users            |
| GET    | `/api/admin/transactions`       | Admin  | View all Transactions     |
| PATCH  | `/api/admin/wallets/:id/block`  | Admin  | Block/unblock wallet      |
| PATCH  | `/api/admin/agents/:id/suspend` | Admin  | Suspend/approve agent     |

---

### 🔐 Authentication

* Send token in `Authorization` header:

```http
Authorization: Bearer <accessToken>
```

---

### 📫 Future Improvements

* Transaction fee & commission rate configuration
* Email/SMS OTP verification
* Agent performance tracking
* Unit & integration testing (Jest/Supertest)

---

### 🧑‍💻 Author

**Ishrat Jahan**
🔗 *\[https://github.com/Ishratesha]*

---

Would you like me to include a **Postman collection export** or setup Swagger docs next?
