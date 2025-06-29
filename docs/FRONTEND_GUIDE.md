# Frontend Development Guide

## Overview

The TrackPulse frontend is built with React 18, Vite, and Tailwind CSS, providing a modern and responsive user interface for music analytics.

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Auth/         # Authentication components
│   │   ├── Charts/       # Chart components
│   │   ├── Dashboard/    # Dashboard-specific components
│   │   ├── Layout/       # Layout components
│   │   └── UI/           # Generic UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── .eslintrc.cjs         # ESLint configuration
```

## Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
```

## Technology Stack

### Core Technologies
- **React 18**: UI framework with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router 6**: Client-side routing
- **Axios**: HTTP client for API requests

### Styling
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: Icon library

### Charts and Visualization
- **Chart.js**: Canvas-based charts
- **react-chartjs-2**: React wrapper for Chart.js

### State Management
- **React Context**: Global state management
- **React Hooks**: Local state management

## Component Architecture

### Folder Organization
Components are organized by feature and type:
- **Layout**: Header, Sidebar, Layout wrapper
- **Auth**: Login, Register, ProtectedRoute
- **Dashboard**: Dashboard-specific components
- **Charts**: Reusable chart components
- **UI**: Generic reusable components

### Component Example
```jsx
// components/UI/Button.jsx
import { clsx } from 'clsx';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

## Styling Guidelines

### Tailwind CSS Classes
Use semantic class names from our custom component classes:

```css
/* Use these instead of raw Tailwind classes */
.btn-primary         /* Primary button */
.btn-secondary       /* Secondary button */
.card               /* Card container */
.input              /* Form input */
.badge              /* Status badge */
```

### Custom Components
```jsx
// Good: Using semantic classes
<button className="btn-primary">Save</button>
<div className="card">Content</div>

// Avoid: Raw Tailwind in components
<button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
```

### Responsive Design
```jsx
// Use responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

## State Management

### Context Pattern
```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useReducer } from 'react';

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  return (
    <ThemeContext.Provider value={{ ...state, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Custom Hooks
```jsx
// hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
```

## API Integration

### Service Layer
```jsx
// services/analyticsService.js
import api from './api';

export const analyticsService = {
  async getDashboardSummary() {
    const response = await api.get('/analytics/analytics/dashboard_summary/');
    return response.data;
  },

  async getSalesOverview() {
    const response = await api.get('/analytics/analytics/sales_overview/');
    return response.data;
  }
};
```

### Using Services in Components
```jsx
// pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await analyticsService.getDashboardSummary();
        setData(summary);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render data */}
    </div>
  );
};
```

## Chart Integration

### Chart.js Setup
```jsx
// components/Charts/SalesChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.period),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.total_sales),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
```

## Authentication Flow

### Protected Routes
```jsx
// components/Auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
```

### Login Form
```jsx
// pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          email: e.target.value
        }))}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          password: e.target.value
        }))}
      />
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
```

## Error Handling

### Error Boundaries
```jsx
// components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Toast Notifications
```jsx
// Using react-hot-toast
import toast from 'react-hot-toast';

// Success notification
toast.success('Data saved successfully!');

// Error notification
toast.error('Failed to save data');

// Loading notification
const loadingToast = toast.loading('Saving...');
// Later: toast.success('Saved!', { id: loadingToast });
```

## Performance Optimization

### Code Splitting
```jsx
// Lazy loading pages
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

// In routing
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/analytics" element={<Analytics />} />
  </Routes>
</Suspense>
```

### Memoization
```jsx
import { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data, filter }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => item.category === filter);
  }, [data, filter]);

  return (
    <div>
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```

## Testing

### Component Testing
```jsx
// __tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```bash
# .env.local
VITE_API_URL=https://your-api.onrender.com
VITE_ENVIRONMENT=production
```

### Render Deployment
1. Connect GitHub repository
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variables

## Best Practices

### Code Organization
- Use meaningful component and file names
- Group related components in folders
- Separate business logic from UI components
- Use custom hooks for reusable logic

### Performance
- Lazy load pages and heavy components
- Memoize expensive calculations
- Optimize image loading
- Use React.memo for pure components

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### Security
- Validate user inputs
- Sanitize data before rendering
- Use HTTPS in production
- Keep dependencies updated
