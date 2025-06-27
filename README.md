# 🍽️ RestoReserve Backend

This is the backend of the **RestoReserve** Restaurant Reservation and Review Platform, built with **Node.js**, **Express.js**, and **MongoDB**.

## 🔧 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT Authentication**
* **Multer** for file uploads (restaurant images)
* **Cloudinary** or local storage for image hosting
* **Razorpay** for payment gateway (optional)

---

## 📁 Folder Structure

```
backend/
│
├── config/              # DB connection and cloud configs
├── controllers/         # Business logic
├── middleware/          # Auth, error handling
├── models/              # Mongoose models
├── routes/              # Express routes
├── utils/               # Utility functions (email, Razorpay etc.)
├── .env                 # Environment variables
├── server.js            # Entry point
└── package.json
```

---

## 🚀 Features

### ✅ Reservation Management

* Create, update, and cancel reservations
* Real-time availability checks

### ✅ User Reviews

* Leave text reviews, star ratings, and upload images
* Edit or delete own reviews
* Restaurant owners can respond

### ✅ Admin Panel

* Manage restaurants, users, and reservations
* View all reviews

### ✅ Authentication

* Secure JWT-based auth for users and admins

---

## 🔐 Environment Variables

Create a `.env` file and set the following:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret


---

## 🛠️ Installation

```bash
# Clone the repository
cd backend

# Install dependencies
npm install

# Run server (development)
npm run dev
```

---

## 📬 API Endpoints

| Endpoint            | Method                         | Description                        |
| ------------------- | ------------------------------ | ---------------------------------- |
| `/api/users`        | `POST`, `GET`                  | Register/Login/User Info           |
| `/api/restaurants`  | `GET`, `POST`, `PUT`, `DELETE` | Manage restaurants                 |
| `/api/reservations` | `GET`, `POST`, `PUT`, `DELETE` | Manage reservations                |
| `/api/reviews`      | `POST`, `PUT`, `DELETE`        | User reviews                       |
| `/api/admin`        | `GET`                          | Admin-specific data and operations |

---

## 📦 Deployment

Deploy using:

* [Render](https://backend-rest-res.onrender.com) (preferred for backend)
  

---

## 👨‍💻 Author

**Your Name**

* [GitHub](https://github.com/your-github-username)

---

## 📌 Project Requirements Recap

* [x] Reservation Management with real-time availability
* [x] User reviews and images
* [x] Search + filters by cuisine, price, and location
* [x] Restaurant profile management
* [x] Admin dashboard
* [x] Payment integration

Feel free to open an issue or contribute if you'd like to collaborate!
