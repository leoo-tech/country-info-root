# Country Info App

A full-stack application that provides detailed information about countries, including population data, border countries, and flag images. The project consists of a Node.js backend and a React frontend.

## 🚀 Features

- List of available countries
- Detailed country information
- Population data visualization
- Border countries navigation
- Country flags display
- Responsive design

## 🛠️ Tech Stack

### Backend
- Node.js
- Nest.js
- Axios for API requests
- Cors

### Frontend
- React.js
- React Router DOM
- Recharts for data visualization
- Bootstrap CSS
- Shadcn/ui components
- Axios for API requests

## 📋 Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🔧 Installation

Clone the repository and install dependencies for both backend and frontend.

```bash
# Clone the repository
git clone <repository-url>
cd country-info-root

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend (.env)
Create a `.env` file in the backend directory with the following variables:

```env
PORT=3000
NAGER_API_URL=https://date.nager.at/api/v3
COUNTRIES_NOW_API_URL=https://countriesnow.space/api/v0.1
```

### Frontend (.env)
Create a `.env` file in the frontend directory with:

```env
VITE_API_URL=http://localhost:3000

```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm run start
```
The backend server will start on http://localhost:3000

### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The frontend development server will start on http://localhost:5173

## 📁 Project Structure

```
country-info-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    ├── .env
    └── package.json
```

## 🔌 API Endpoints

### Backend API Routes

#### Get Available Countries
```
GET /countries/available
```
Returns a list of all available countries.

#### Get Country Information
```
GET /countries/:countryCode
```
Returns detailed information about a specific country, including:
- Official and common names
- Region
- Border countries
- Population data
- Flag URL

## 💻 Frontend Routes

- `/` - Home page with list of countries
- `/country/:countryCode` - Detailed country information page

## 🎨 Styling

The application uses:
- Bootstrap CSS for utility-first styling
- Shadcn/ui components for UI elements
- Responsive design for all screen sizes

## 🔍 Code Quality

The project maintains code quality through:
- ESLint for code linting
- Prettier for code formatting
- Consistent code style across the project

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Date Nager API](https://date.nager.at/swagger/index.html) for country data
- [Countries Now API](https://countriesnow.space/) for population and flag data