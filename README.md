# Trip Management System 🚖

A full-stack web application for managing trips with real-time location tracking, built with **React (TypeScript)** and **Django REST Framework**.

![App Screenshot]<!-- Add screenshot path here -->

## 🌟 Key Features

- **Trip Creation**: Users can submit trips with pickup/dropoff locations
- **Location Validation**: Auto-validates addresses using geocoding
- **Interactive Map**: Visualizes trip routes with coordinates
- **Form Handling**: Animated form with error validation
- **RESTful API**: Django backend with secure data processing

## 🛠️ Tech Stack

### Frontend
- React 19 (TypeScript) with Vite
- Tailwind CSS + Framer Motion (animations)
- Axios for API calls
- React Leaflet (map integration)

### Backend
- Django REST Framework
- PostgreSQL (or SQLite)
- Geocoding API (e.g., Google Maps/OpenStreetMap)
- JWT Authentication (optional)

## 🚀 Installation

### Backend Setup
```bash
# Clone repository
git clone [your-repo-url]
cd backend/

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
