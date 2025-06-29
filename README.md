# 🎵 TrackPulse Analytics

<div align="center">
  <img src="https://via.placeholder.com/200x200?text=TrackPulse+Logo" alt="TrackPulse Analytics Logo" width="200" height="200">
  
  **A comprehensive music analytics dashboard providing insights into music sales, customer behavior, and track performance.**

  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/trackpulse-analytics)
  [![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/trackpulse-analytics/releases)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![Django](https://img.shields.io/badge/Django-4.2-darkgreen)](https://docs.djangoproject.com/)
  [![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC)](https://tailwindcss.com/)
</div>

## ✨ Key Features

### 📊 Visual Music Analytics Dashboard
- **Interactive Charts**: Real-time data visualizations with Chart.js
- **Sales Performance**: Track revenue trends and performance metrics
- **Artist Analytics**: Top-performing artists and album insights
- **Customer Insights**: Customer behavior analysis and demographics

### 📈 Genre & Artist Popularity Trends
- **Genre Distribution**: Visual breakdown of music genre popularity
- **Artist Rankings**: Top artists by sales and track count
- **Album Performance**: Best-selling albums and trending releases
- **Track Analytics**: Most popular tracks and listening patterns

### 💰 Revenue & Customer Insights
- **Sales Overview**: Comprehensive revenue analytics and trends
- **Customer Segmentation**: Top customers and purchasing behavior
- **Geographic Analysis**: Sales distribution by location
- **Time-based Analytics**: Revenue trends over time periods

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Interactive Elements**: Smooth animations and user feedback
- **Accessibility**: WCAG compliant design patterns

## 🛠 Tech Stack

### Backend
- **Django 4.2** - Web framework with admin interface
- **Django REST Framework** - RESTful API development
- **Token Authentication** - Secure API endpoints
- **SQLite** - Development database (Chinook dataset)
- **PostgreSQL** - Production database
- **WhiteNoise** - Static file serving
- **CORS Headers** - Cross-origin resource sharing

### Frontend
- **React 18** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **React Router 6** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Chart.js** - Interactive data visualization
- **Headless UI** - Unstyled, accessible UI components

### Database & Hosting
- **Database**: Chinook SQLite (development), PostgreSQL (production)
- **Backend Hosting**: Render (API deployment)
- **Frontend Hosting**: Vercel (static site deployment)
- **File Storage**: Local development, cloud storage for production

## 📋 Functional Requirements

### ✅ Data Visualizations (4+ Charts)
- [ ] **Sales Chart**: Revenue trends over time
- [ ] **Genre Distribution**: Pie/donut chart of genre popularity
- [ ] **Top Tracks Table**: Interactive table with sorting/filtering
- [ ] **Customer Analytics**: Bar chart of top customers
- [ ] **Artist Performance**: Horizontal bar chart of top artists

### 🔍 Basic Filtering
- [ ] **Date Range Filtering**: Filter data by time periods
- [ ] **Genre Filtering**: Filter by music genres
- [ ] **Search Functionality**: Search tracks, artists, albums
- [ ] **Sort Options**: Sort by various metrics (sales, name, date)

### 📱 Responsive Design
- [ ] **Mobile Responsive**: Works on 320px+ screens
- [ ] **Tablet Optimized**: Optimized for tablet devices
- [ ] **Desktop Enhanced**: Full functionality on desktop
- [ ] **Touch Friendly**: Mobile-first interaction design

### 🔐 Secure API Endpoints
- [ ] **Token Authentication**: JWT/Token-based auth
- [ ] **User Registration**: Secure user account creation
- [ ] **Login/Logout**: Session management
- [ ] **Protected Routes**: Authenticated endpoint access
- [ ] **CORS Configuration**: Secure cross-origin requests

## 🚀 Quick Start

### Backend Setup (3 Steps)

1. **Install Dependencies & Setup Environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure Database & Migrate**
   ```bash
   cp .env.example .env  # Edit with your settings
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **Start Development Server**
   ```bash
   python manage.py runserver
   # API available at http://127.0.0.1:8000/api/v1/
   ```

### Frontend Setup (3 Steps)

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local  # Edit with API URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # App available at http://localhost:3000/
   ```

### 🔐 Environment Variables

#### Backend (.env)
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=sqlite:///db.sqlite3  # or PostgreSQL URL for production
```

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_APP_NAME=TrackPulse Analytics
```
- **Headless UI** - Unstyled, accessible UI components

## 📁 Project Structure

```
TrackPulse/
├── backend/                    # Django backend
│   ├── trackpulse_analytics/   # Main Django project
│   ├── analytics/              # Analytics app
│   ├── users/                  # User management app
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Docker configuration
│   └── manage.py              # Django management script
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── contexts/         # React contexts
│   │   └── utils/            # Utility functions
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite configuration
├── docs/                      # Documentation
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrackPulse
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Database setup**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Load Chinook data** (if needed)
   ```bash
   # Import your Chinook database here
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

## 🐳 Docker Deployment

### Build and run with Docker

```bash
# Backend
cd backend
docker build -t trackpulse-backend .
docker run -p 8000:8000 trackpulse-backend

# Frontend (build for production)
cd frontend
npm run build
```

### Deploy to Render

1. **Backend (Render Web Service)**
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn trackpulse_analytics.wsgi:application`
   - Add environment variables from `.env.example`

2. **Frontend (Render Static Site)**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

## 📊 API Endpoints

### Authentication
- `POST /api/v1/users/auth/login/` - User login
- `POST /api/v1/users/auth/register/` - User registration
- `POST /api/v1/users/auth/logout/` - User logout

### Analytics
- `GET /api/v1/analytics/analytics/dashboard_summary/` - Dashboard overview
- `GET /api/v1/analytics/analytics/sales_overview/` - Sales analytics
- `GET /api/v1/analytics/analytics/genre_analysis/` - Genre analytics
- `GET /api/v1/analytics/analytics/country_analysis/` - Country analytics

### Data Endpoints
- `GET /api/v1/analytics/artists/` - List artists
- `GET /api/v1/analytics/albums/` - List albums
- `GET /api/v1/analytics/tracks/` - List tracks
- `GET /api/v1/analytics/customers/` - List customers

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS with:
- **Primary Colors**: Blue palette for main actions
- **Secondary Colors**: Gray palette for text and backgrounds
- **Success/Warning/Error**: Semantic color system
- **Typography**: Inter font family
- **Components**: Pre-built component classes

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Functional Requirements](docs/FUNCTIONAL_REQUIREMENTS.md)** - Detailed functional requirements with user stories and technical specs
- **[API Documentation](docs/API_DOCS.md)** - Complete API reference with endpoints, request/response examples
- **[Backend Guide](docs/BACKEND_GUIDE.md)** - Django backend setup, models, and development guide
- **[Frontend Guide](docs/FRONTEND_GUIDE.md)** - React frontend components, routing, and development guide
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions for various platforms

### Quick Links

- **Backend API**: `http://127.0.0.1:8000/api/v1/`
- **Frontend App**: `http://localhost:3000/`
- **Django Admin**: `http://127.0.0.1:8000/admin/`
- **API Browsable Interface**: `http://127.0.0.1:8000/api/v1/`

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📈 Performance

- **Backend**: Optimized Django queries with select_related and prefetch_related
- **Frontend**: Code splitting with React.lazy and Suspense
- **Database**: Proper indexing on frequently queried fields
- **Caching**: Redis caching for API responses (production)

## 🔐 Security

- **Authentication**: Session-based authentication
- **CORS**: Properly configured for cross-origin requests
- **CSRF**: CSRF protection enabled
- **Environment Variables**: Sensitive data in environment variables
- **HTTPS**: SSL/TLS encryption in production

## 🚀 Deployment

### 🌐 Render Backend Setup

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)
   - Connect your GitHub repository

2. **Configure Web Service**
   ```yaml
   # render.yaml
   services:
     - type: web
       name: trackpulse-backend
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: python manage.py migrate && gunicorn trackpulse_analytics.wsgi:application
       envVars:
         - key: DEBUG
           value: False
         - key: DATABASE_URL
           fromDatabase:
             name: trackpulse-db
             property: connectionString
   ```

3. **Database Migration Notes**
   ```bash
   # Render will automatically run migrations on deploy
   python manage.py migrate
   python manage.py collectstatic --noinput
   ```

### ⚡ Vercel Frontend Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Environment Configuration**
   ```bash
   # Set in Vercel dashboard
   VITE_API_BASE_URL=https://your-render-app.onrender.com/api/v1
   ```

### 📊 Database Migration Notes

- **Development**: SQLite database included with sample data
- **Production**: PostgreSQL on Render with automatic backups
- **Migration Command**: `python manage.py migrate`
- **Sample Data**: Load with `python manage.py loaddata fixtures/sample_data.json`

## 🤝 Contributing

### 📋 Git Workflow Guidelines

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/trackpulse-analytics.git
   cd trackpulse-analytics
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   git checkout -b bugfix/your-bug-fix
   ```

3. **Commit Standards**
   ```bash
   # Use conventional commits
   git commit -m "feat: add sales analytics chart"
   git commit -m "fix: resolve login authentication issue"
   git commit -m "docs: update API documentation"
   ```

4. **Pull Request Process**
   - Ensure all tests pass
   - Update documentation if needed
   - Request review from maintainers
   - Merge after approval

### 🧪 Testing Requirements

#### Backend Testing
```bash
cd backend
python manage.py test
coverage run --source='.' manage.py test
coverage report --show-missing
```

#### Frontend Testing
```bash
cd frontend
npm run test
npm run test:coverage
npm run test:e2e
```

#### Testing Standards
- **Minimum Coverage**: 80% code coverage required
- **Unit Tests**: All new functions must have unit tests
- **Integration Tests**: API endpoints must have integration tests
- **E2E Tests**: Critical user flows must have end-to-end tests

### 🎨 Code Style Standards

#### Backend (Python)
```bash
# Install development dependencies
pip install black flake8 isort

# Format code
black .
isort .
flake8 .
```

#### Frontend (JavaScript/React)
```bash
# Install development dependencies
npm install --save-dev eslint prettier

# Format code
npm run lint
npm run format
```

#### Style Guidelines
- **Python**: Follow PEP 8, use Black formatter
- **JavaScript**: Use ESLint + Prettier, follow Airbnb style guide
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS utility classes, avoid custom CSS

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend Development**: Django REST API with analytics endpoints
- **Frontend Development**: React dashboard with Chart.js visualizations
- **Database Design**: Chinook database optimization
- **DevOps**: Docker containerization and Render deployment

## 📞 Support

For support, email support@trackpulse.com or join our Slack channel.

## 🗺 Roadmap

- [ ] Real-time analytics with WebSockets
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app development
- [ ] Machine learning recommendations
- [ ] Multi-tenant support
