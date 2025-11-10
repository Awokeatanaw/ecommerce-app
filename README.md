# 🛒 Ecommerce App

A full-stack ecommerce web application built with **React (frontend)** and **Node.js + Express (backend)**.  
It allows users to browse products, add them to cart, and securely checkout using **Stripe** and **Chapa**.  
Admins can manage products, view orders, and update order statuses.

---

## 🚀 Features

### 👤 User
- View all uploaded products
- Add products to the cart
- Proceed to checkout using **Stripe** or **Chapa**
- Place and view orders
- Receive real-time order updates

### 🛠️ Admin
- Add new products with images and descriptions
- View all listed products
- Manage orders (view, update, and change status)
- Update or delete existing products

---

## 🧩 Technologies Used

**Frontend:**
- React  
- Tailwind CSS  
- Axios  
- React Router  

**Backend:**
- Node.js  
- Express.js  
- MongoDB (or PostgreSQL if configured)  
- Stripe API  
- Chapa Payment API  
- dotenv for environment variables  

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Awokeatanaw/ecommerce-app.git
   cd ecommerce-app
2. **Install dependencies**
    ```bash
    # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install

3. **Configure environment variables**
    ```bash
    PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CHAPA_SECRET_KEY=your_chapa_secret_key

4. **Run the app**
    ```bash
    # In backend folder
   npm start

   # In frontend folder
   npm start
## 💻 Usage
1.Open your browser and go to http://localhost:3000
2.Browse products, add items to your cart
3.Checkout securely with Stripe or Chapa
4.Admins can log in to manage products and orders
## 🤝 Contributing
   Contributions are welcome!
To contribute:
1.Fork the repository
2.Create a feature branch
    ```bash
   git checkout -b feature/your-feature-name
3.Commit your changes
    ```bash
   git commit -m "Add your feature description"
4.Push to your branch and open a Pull Request
## 📄 License
   This project is licensed under the MIT License.
## 📸 Screenshots
**🏠 Home Page**
 <img width="1276" height="578" alt="Screenshot 2025-11-09 224533" src="https://github.com/user-attachments/assets/e191c255-d1e4-49c8-930c-6efb22815e62" />

**🛍️ Cart Page**
  <img width="1268" height="580" alt="Screenshot 2025-11-09 224859" src="https://github.com/user-attachments/assets/21b4b1c2-a0a4-4ad1-a44f-6ff7bbd980a3" />

**🧑‍💼 Admin Dashboard**
  <img width="1266" height="562" alt="Screenshot 2025-11-09 224144" src="https://github.com/user-attachments/assets/37309a98-4654-4aec-b906-e7843f607d5e" />
