# Supermarket Dashboard

A modern Bootstrap-based dashboard for supermarket product management with analytics and inventory tracking.

## Features

### 🏠 Dashboard Overview
- **Responsive Bootstrap Layout**: Mobile-first design with sidebar navigation
- **Analytics Cards**: Real-time statistics including:
  - Total Products count
  - Total Inventory Value
  - Average Product Price
  - Low Stock Alerts
  - Out of Stock Items
  - Stock Status Ratio

### 📦 Product Management
- **Add Products**: Modal form with validation
- **Edit Products**: In-place editing with form validation
- **Delete Products**: Confirmation dialog for safe deletion
- **Product List**: Enhanced table with:
  - Stock status badges (In Stock, Low Stock, Out of Stock)
  - Total value calculation per product
  - Responsive design for mobile devices

### 🎨 UI/UX Features
- **Bootstrap 5**: Modern, responsive design
- **Bootstrap Icons**: Professional iconography
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Spinner indicators during data operations
- **Empty States**: Helpful messages when no data is present
- **Hover Effects**: Interactive card and button animations

### 📱 Responsive Design
- **Desktop**: Full sidebar navigation with analytics cards
- **Tablet**: Collapsible sidebar with optimized layout
- **Mobile**: Hamburger menu with offcanvas sidebar

## Components

### Dashboard.jsx
Main dashboard component with:
- State management for products and UI
- API integration for CRUD operations
- Modal management for add/edit forms
- Responsive layout with Bootstrap grid

### AnalyticsCards.jsx
Analytics component featuring:
- Real-time calculations from product data
- Color-coded cards for different metrics
- Bootstrap card layout with icons
- Responsive grid system

### ProductForm.jsx
Form component with:
- Bootstrap form controls
- Client-side validation
- Error handling and display
- Support for both add and edit modes

### ProductList.jsx
Table component with:
- Bootstrap table styling
- Stock status indicators
- Action buttons for edit/delete
- Empty state handling
- Responsive design

## Styling

### dashboard.css
Custom CSS for:
- Dashboard layout and spacing
- Card hover effects
- Sidebar navigation styling
- Form and button enhancements
- Responsive breakpoints
- Custom scrollbars

## API Integration

The dashboard integrates with the existing Laravel backend API:
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Ensure backend API is running on `http://127.0.0.1:8000`

## Dependencies

- React 19.1.1
- Bootstrap 5.3.8
- React Bootstrap 2.10.10
- Bootstrap Icons
- Axios for API calls
- React Toastify for notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
