# 🌾 Kisan Connect - Agriculture Super App (Backend)

A full-featured backend API built with **Node.js + Express + MongoDB** to support agriculture services for dealers and farmers in Pakistan. Built using modern JS (ES6) with complete modular structure.

---

## ✅ Features

- 🔐 OTP-based login with Twilio
- 🧑‍🌾 Role-based access: Dealer & Admin
- 🌾 CRUD APIs for Seeds, Tractors, Fertilizers, Mandi Rates
- 📸 Image & Document uploads (CNIC, NOC, Receipts)
- 💬 Dealer to Admin chat system
- 📦 Tractor/Seed booking with admin approval
- 💰 Payment system with receipt upload
- 📄 PDF invoice download
- 📊 Admin dashboard stats
- 🌐 Localization API (English, Urdu, Sindhi)
- 🧾 Action logs (activity tracking)
- 📤 REST API ready for mobile or React frontend

---

## 🔧 Tech Stack

- Node.js / Express.js
- MongoDB (Free-tier Atlas)
- JWT Auth
- Twilio SMS
- Multer, PDFKit, Express-Validator, Rate Limiter

---

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/bazedgul/kisan-app.git
cd Backend

2. Install dependencies
npm install

3. Create .env file
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE=+92...

4. Run server
npm start

📁 Folder Structure
bash
Copy
Edit
/controllers
/models
/routes
/middlewares
/utils
/uploads        // image/docs
/downloads      // generated PDFs
server.js


📬 API Base URL
http://localhost:5000/api/

✅ Upcoming Features
Admin → Dealer reply in chat

Stripe / JazzCash payment integration

Push notifications (Expo / FCM)

