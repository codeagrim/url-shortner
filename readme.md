# 🔗 URL Shortener

A simple and efficient URL shortener built with **Node.js**, **Express**, and **MongoDB**. Converts long URLs into short, shareable links.

---

## 🚀 Features

- Shortens long URLs to short IDs
- Redirects to the original URL using the short ID
- Uses MongoDB for storing URL data
- REST API powered by Express.js
- Environment variable support with `dotenv`
- Add Url to QR Code Functionality
- Track click analytics
- Set expiration dates for short URLs 
-  User authentication and authorization (WIP)
    - Secure password hashing with bcrypt
    - Token-based auth using JWT (JSON Web Tokens)



### 1. Clone the Repository

```bash
git clone https://github.com/codeagrim/url-shortner
cd url-shortener
```
### 2. Install Dependencies

```bash 
npm install
```

### 3.  Start the Server

```bash 
npm start
```

### Also Setup .env by your Own 

```bash
PORT = 3001
MONGO_URI = 
BASE_URL = https://localhost:3001
JWT_SECRET=
JWT_EXPIRES_IN=

```