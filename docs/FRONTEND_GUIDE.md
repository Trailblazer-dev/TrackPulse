# Frontend Development Guide

## Overview

The TrackPulse frontend is built with React 18, TypeScript, Vite, and Tailwind CSS, providing a modern, type-safe, and responsive user interface for music analytics.

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Common components (Spinner, etc.)
│   │   └── reuse/        # Reusable layout components (Header, Footer, Sidebar, Setting)
│   ├── contexts/         # React contexts (UserContext, ThemeContext)
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin-specific pages
│   │   ├── guest/        # Guest/public pages
│   │   └── user/         # Authenticated user pages
│   ├── routes/           # Route definitions
│   │   ├── adminRoutes.tsx    # Admin route definitions
│   │   ├── guestRoutes.tsx    # Guest route definitions
│   │   ├── userRoutes.tsx     # User route definitions
│   │   ├── ProtectedRoute.tsx # Route protection component
│   │   └── index.tsx          # Main routing component
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # Vite type definitions
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── eslint.config.js      # ESLint configuration
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App TypeScript configuration
└── tsconfig.node.json    # Node TypeScript configuration
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
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **React Router 7**: Client-side routing with type safety

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

Components are organized by feature and user role:

- **common**: Shared components like Spinner
- **reuse**: Reusable layout components (Header, Footer, Sidebar, Setting)
- **pages**: Page components organized by user role:
  - **admin**: Admin-specific pages (AdminDashboard, Users, SystemMetrics, AuditLogs, DataManagement, ReportBuilder)
  - **guest**: Public pages (Landing, About, Contact, Explore)
  - **user**: Authenticated user pages (Dashboard, Analytics, Reports, Bookmarks)
- **routes**: Route definitions separated by user role
- **contexts**: React contexts for global state management

### Component Example

```tsx
// components/UI/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  className = '',
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

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
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

```tsx
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ThemeState {
  theme: 'light' | 'dark';
}

interface ThemeContextType extends ThemeState {
  setTheme: (theme: 'light' | 'dark') => void;
}

interface ThemeAction {
  type: 'SET_THEME';
  payload: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  return (
    <ThemeContext.Provider value={{ ...state, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Custom Hooks

```tsx
// hooks/useApi.ts
import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useApi = <T>(
  apiCall: () => Promise<T>, 
  dependencies: React.DependencyList = []
): UseApiState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
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

```typescript
// services/analyticsService.ts
import api from './api';

interface DashboardSummary {
  totalSales: number;
  totalUsers: number;
  totalTracks: number;
  // Add other properties as needed
}

interface SalesOverview {
  period: string;
  sales: number;
  // Add other properties as needed
}

export const analyticsService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>('/analytics/analytics/dashboard_summary/');
    return response.data;
  },

  async getSalesOverview(): Promise<SalesOverview[]> {
    const response = await api.get<SalesOverview[]>('/analytics/analytics/sales_overview/');
    return response.data;
  }
};
```

### Using Services in Components

```tsx
// pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

interface DashboardSummary {
  totalSales: number;
  totalUsers: number;
  totalTracks: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const summary = await analyticsService.getDashboardSummary();
        setData(summary);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {data && (
        <div>
          <p>Total Sales: {data.totalSales}</p>
          <p>Total Users: {data.totalUsers}</p>
          <p>Total Tracks: {data.totalTracks}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
```

## Chart Integration

### Chart.js Setup

```tsx
// components/Charts/SalesChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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

interface SalesData {
  period: string;
  total_sales: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
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

  const options: ChartOptions<'line'> = {
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

```tsx
// routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
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

```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';

describe('Button Component', () => {
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

  test('applies correct variant classes', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });
});
```

## Deployment

### Build Process

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

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
5. Configure TypeScript build settings if needed

## Best Practices

### TypeScript Guidelines

- Use proper TypeScript interfaces and types for all props and state
- Leverage type inference where possible, but be explicit when needed
- Use generic types for reusable components and hooks
- Enable strict mode in TypeScript configuration
- Use type guards for runtime type checking

### Code Organization

- Use meaningful component and file names
- Group related components in folders
- Separate business logic from UI components
- Use custom hooks for reusable logic
- Define interfaces in separate files when shared across components

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
