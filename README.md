# Supermarket Product Dashboard

A full-stack web application for managing supermarket products.  
Features include: Add, Update, Delete, Prevent duplicate products. Built with **React.js**, **Laravel/PHP**, and **MySQL**.
---
![image alt](https://github.com/Deepatharshan/Supermarket/blob/bff6fa9789116013f3b9c1d85335521cfb412f16/super%20market.png)
---
![image alt](https://github.com/Deepatharshan/Supermarket/blob/058040a1ab6cdc2f096ef8475bb44f1f62bd2897/super%20market2.png)
---
![image alt](https://github.com/Deepatharshan/Supermarket/blob/9e4ee604c2bf457524700a68b653ed162050e366/desktopsupermarket.png)
---

## Features

- Add new products (name, SKU, description, price, quantity)
- Edit and update product details
- Delete products
- Prevent duplicate product names
- Responsive dashboard (desktop, tablet, mobile)
- Notifications on Add, Update, Delete actions

---

## Tech Stack

- **Frontend:** React.js, Axios, React-Toastify  
- **Backend:** Laravel 10 (PHP), REST API  
- **Database:** MySQL  

---

## Prerequisites

- Node.js (v18+) and npm  
- PHP 8.1+  
- Composer  
- MySQL  
- XAMPP/WAMP/Laragon or any PHP server

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/supermarket-dashboard.git
cd supermarket-dashboard

##Backend Setup (Laravel API)
cd backend
composer install
cp .env.example .env

###Configure your .env database settings:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=supermarket
DB_USERNAME=root
DB_PASSWORD=

###Run migrations:
php artisan migrate

###Start backend server:
php artisan serve

##Frontend Setup (React)
cd frontend
npm install
npm start
