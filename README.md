# Waste Management System - Smart City

## 📝 Description

A smart city waste management platform designed to optimize operations and streamline collection workflows. This system provides both an **Admin Panel** and **User Interface** for managing waste bins, tracking collection, and improving the efficiency of waste collection processes.

## 🔮 Features

- 🏙️ **Admin Panel**: Manage bin locations, dispatch crews, handle overflow issues, monitor driver performance, fleet operations, and track user registrations.
- 🗑️ **User Interface**: Residents can report and track waste bin statuses (e.g., resolved, pending, rejected) and update their profiles for better community interaction.
- 🚚 **Driver Tracking**: Real-time tracking and updates for waste collection ensure efficient fleet management.
- 🌍 **Geolocation**: Uses Nominatim API for precise tracking of waste bin locations, optimizing route planning and collection efficiency.
- 🔐 **Authentication**: JWT-based user access management and password recovery via Mailtrap.

## 🚀 Live Preview

You can view the live preview of the project [here](https://fullstack-mern-stack-waste-management.onrender.com).

## 💻 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-11C8D1?style=for-the-badge&logo=render&logoColor=white)

### Method 1: Manual Installation

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page.
2. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/fullstack-MERN-stack--Waste-Management-System-for-Smart-City-s.git
   ```
3. **Create .env file:**
   Inside the Backend directories create `.env` and set:

   Backend:

   ```bash
   PORT = 4001
   FRONTEND_URL = http://localhost:5173
   MongoDBURI = YourMongoDBURI
   JWT_SECRET = YourSecretKey 
   MAILTRAP_TOKEN = YourMailTrapToken

   NODE_ENV = development

   ```

4. **Install dependencies:**
   ```bash
   npm install     # Run in both Frontend and Backend directories
   ```
5. **Start the servers:**
   Frontend:
   ```bash
   cd Frontend
   npm run dev
   ```
   Backend:
   ```bash
   cd Backend
   npm run dev
   ```
6. **Access the application:**
   ```bash
   http://localhost:5173/
   ```
   
## 🌟 Support Us

If you find this helpful or valuable, please consider 🌟 starring the repository. It helps us gain visibility and encourages further development. We appreciate your support!

## 📧 Contact Information

For questions or inquiries, please contact [Neeraj Gupta](mailto:guptaneeraj2811@gmail.com).
