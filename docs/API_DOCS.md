# TrackPulse API Documentation

## Overview

The TrackPulse API provides comprehensive access to music analytics data from the Chinook database. Built with Django REST Framework, it offers authentication, data retrieval, and analytics endpoints.

## Base URL

```
Development: http://localhost:8000/api/v1/
Production: https://your-app.onrender.com/api/v1/
```

## Authentication

The API uses session-based authentication. Include credentials in requests after login.

### Headers
```
Content-Type: application/json
X-CSRFToken: <csrf_token>  // For state-changing operations
```

## Authentication Endpoints

### Login
```http
POST /users/auth/login/
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe"
  },
  "message": "Login successful"
}
```

### Register
```http
POST /users/auth/register/
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "password123",
  "password_confirm": "password123"
}
```

### Logout
```http
POST /users/auth/logout/
```

## Analytics Endpoints

### Dashboard Summary
```http
GET /analytics/analytics/dashboard_summary/
```

**Response:**
```json
{
  "total_customers": 59,
  "total_tracks": 3503,
  "total_artists": 275,
  "total_revenue": 2328.60,
  "total_orders": 412,
  "average_order_value": 5.65
}
```

### Sales Overview
```http
GET /analytics/analytics/sales_overview/
```

**Response:**
```json
[
  {
    "period": "2023-01",
    "total_sales": 156.78,
    "total_orders": 28,
    "average_order_value": 5.60
  }
]
```

### Genre Analysis
```http
GET /analytics/analytics/genre_analysis/
```

**Response:**
```json
[
  {
    "genre_name": "Rock",
    "total_sales": 826.65,
    "track_count": 1297,
    "percentage": 35.52
  }
]
```

### Country Analysis
```http
GET /analytics/analytics/country_analysis/
```

**Response:**
```json
[
  {
    "country": "USA",
    "total_sales": 523.06,
    "customer_count": 13,
    "average_customer_value": 40.24
  }
]
```

## Data Endpoints

### Artists
```http
GET /analytics/artists/
GET /analytics/artists/{id}/
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 20)

**Response:**
```json
{
  "count": 275,
  "next": "http://localhost:8000/api/v1/analytics/artists/?page=2",
  "previous": null,
  "results": [
    {
      "artist_id": 1,
      "name": "AC/DC"
    }
  ]
}
```

### Albums
```http
GET /analytics/albums/
GET /analytics/albums/{id}/
```

**Response:**
```json
{
  "count": 347,
  "results": [
    {
      "album_id": 1,
      "title": "For Those About To Rock We Salute You",
      "artist": {
        "artist_id": 1,
        "name": "AC/DC"
      }
    }
  ]
}
```

### Tracks
```http
GET /analytics/tracks/
GET /analytics/tracks/{id}/
GET /analytics/tracks/top_tracks/
```

**Response:**
```json
{
  "results": [
    {
      "track_id": 1,
      "name": "For Those About To Rock (We Salute You)",
      "album": {
        "album_id": 1,
        "title": "For Those About To Rock We Salute You",
        "artist": {
          "artist_id": 1,
          "name": "AC/DC"
        }
      },
      "genre": {
        "genre_id": 1,
        "name": "Rock"
      },
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 343719,
      "duration_seconds": 343.719,
      "unit_price": "0.99"
    }
  ]
}
```

### Customers
```http
GET /analytics/customers/
GET /analytics/customers/{id}/
GET /analytics/customers/top_customers/
```

**Response:**
```json
{
  "results": [
    {
      "customer_id": 1,
      "first_name": "Luís",
      "last_name": "Gonçalves",
      "full_name": "Luís Gonçalves",
      "email": "luisg@embraer.com.br",
      "country": "Brazil"
    }
  ]
}
```

### Invoices
```http
GET /analytics/invoices/
GET /analytics/invoices/{id}/
```

**Response:**
```json
{
  "results": [
    {
      "invoice_id": 1,
      "customer": {
        "customer_id": 2,
        "first_name": "Leonie",
        "last_name": "Köhler",
        "full_name": "Leonie Köhler",
        "email": "leonekohler@surfeu.de"
      },
      "invoice_date": "2009-01-01T00:00:00Z",
      "total": "1.98",
      "invoice_lines": [
        {
          "invoice_line_id": 1,
          "track": {
            "track_id": 2,
            "name": "Balls to the Wall"
          },
          "unit_price": "0.99",
          "quantity": 1,
          "total_price": "0.99"
        }
      ]
    }
  ]
}
```

## User Management

### Get Current User
```http
GET /users/me/
```

### Update Profile
```http
PATCH /users/update_profile/
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Music enthusiast",
  "location": "New York",
  "theme_preference": "dark"
}
```

### Change Password
```http
POST /users/change_password/
```

**Request Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword",
  "new_password_confirm": "newpassword"
}
```

## Error Handling

### Error Response Format
```json
{
  "error": "Error message",
  "details": {
    "field_name": ["Field-specific error message"]
  }
}
```

### HTTP Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

- **Development**: No rate limiting
- **Production**: 1000 requests per hour per IP

## Pagination

All list endpoints support pagination:

```json
{
  "count": 275,
  "next": "http://localhost:8000/api/v1/analytics/artists/?page=3",
  "previous": "http://localhost:8000/api/v1/analytics/artists/?page=1",
  "results": [...]
}
```

## Filtering and Search

### Query Parameters
- `search`: Text search across relevant fields
- `ordering`: Sort by field (prefix with `-` for descending)

**Example:**
```
GET /analytics/tracks/?search=rock&ordering=-milliseconds
```

## Examples

### Get Sales Data for Charts
```javascript
// Fetch monthly sales data
const response = await fetch('/api/v1/analytics/analytics/sales_overview/');
const salesData = await response.json();

// Use with Chart.js
const chartData = {
  labels: salesData.map(item => item.period),
  datasets: [{
    label: 'Monthly Sales',
    data: salesData.map(item => item.total_sales),
    borderColor: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  }]
};
```

### Authentication Flow
```javascript
// Login
const loginResponse = await fetch('/api/v1/users/auth/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
  credentials: 'include'
});

// Use authenticated endpoints
const dashboardData = await fetch('/api/v1/analytics/analytics/dashboard_summary/', {
  credentials: 'include'
});
```
