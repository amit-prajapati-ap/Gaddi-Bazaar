# Gaddi Bazaar 🚗

A full-stack **car rental marketplace** built with the **MERN stack**, enabling owners to list their vehicles and users to book based on location and date.

---

## 🚀 Live Demo

Explore the deployed app: [gaddi‑bazaar.vercel.app](https://gaddi-bazaar.vercel.app)

---

## 📌 Features

* **Owner portal**: List cars with images, per-day pricing, availability calendar, and description.
* **User flow**: Search by location & date, view car details, and place bookings.
* **Booking logic**: Validates date range, checks availability, calculates total rental cost.
* **Auth & profiles**: User and owner authentication using JWT; individual dashboards for managing listings & rentals.
* **Responsive UI**: Elegant, mobile-first interface with animated transitions using **Framer Motion**.

---

## 🛠️ Tech Stack

| Layer    | Technologies                                        |
| -------- | --------------------------------------------------- |
| Frontend | React.js, Tailwind CSS, Framer Motion, React Router |
| Backend  | Node.js, Express.js                                 |
| Database | MongoDB                                             |
| Auth     | JWT-based authentication                            |
| Hosting  | Vercel (frontend), Vercel (backend)                 |

---

## 📂 Project Structure
```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
│   
└── README.md (This README file)
└──.gitignore
```

---

## ✅ Getting Started

1. Clone the repository

```bash
git clone https://github.com/amit-prajapati-ap/Gaddi-Bazaar.git
```

2. Install dependencies

```bash
cd frontend && npm install  
cd ../backend && npm install
```

3. Set environment variables (`.env` files in both `/frontend` and `/backend`):

```
Backend:
REACT_APP_API_URL=YOUR_API_URL
JWT_SECRET=YOUR_SECRET_KEY
RAZORPAY_KEY_ID=YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
MONGODB_URI=YOUR_MONGO_URI
PORT='4000'

Frontend:
VITE_CURRENCY='₹'
VITE_BASE_URL='http://localhost:4000'
VITE_APP_TOKEN_NAME=YOUR_APP_NAME
```

4. Run both apps

```bash
# In /server
npm run dev

# In /client
npm start
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔭 Future Scope

* **AI-powered chatbot** for support and assistance.
* **Map-based search** for real-time location availability.
* **Dynamic pricing engine** based on seasonal demand.
* Expand payment options (e.g., Stripe, UPI).
* Build mobile-first or hybrid mobile app.

---

## 👤 Contributing

* Contributions are welcome!
* Open an issue or send a pull request with your proposed improvements.

---

## 📝 License

This project is licensed under [MIT License](LICENSE).

---

## 🙏 Author

**Amit Prajapati** – Full‑Stack / MERN Developer
📍 Chandigarh, India
Powered by passion — Building clean, intuitive, and scalable web apps.
