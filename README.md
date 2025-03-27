# Secure Auth App (Supabase + Expo)

## 📌 Overview
A **secure authentication app** built using **Supabase** for the backend and **Expo (React Native)** for the frontend. It supports **sign-up, login, logout**, and **CRUD operations** on user profiles while ensuring **Row Level Security (RLS)** for data privacy.

## 🚀 Features
- 🔐 **User Authentication** (Email/password-based login with Supabase)
- 📝 **CRUD Operations** (Create, Read, Update, Delete user details)
- 🔄 **Session Management** (Auto-login redirect & logout functionality)
- 🛡 **Row Level Security (RLS)** (Ensures restricted data access)

## 🛠 Tech Stack
- **Frontend:** Expo (React Native)  
- **Backend:** Supabase (PostgreSQL)  
- **Authentication:** Supabase Auth (Email/Password)

## 📖 Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/arshdeepsingh11/Secure-Auth-App.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Supabase:**
   - Create a `user_details` table with **UUID, Name, Email**.
   - Enable **Row Level Security (RLS)**.
   - Configure authentication settings.

4. **Start the project:**
   ```bash
   expo start
   ```

## 👤 Author  
**Arshdeep Singh**  
📧 arsh.016vs@gmail.com 
💻 arshdeepsingh11

---
