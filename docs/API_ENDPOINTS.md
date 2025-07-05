# TrackPulse Analytics API Documentation

## Base URL

```
Development: http://localhost:8000/api/
Production: https://your-domain.com/api/
```

## Authentication

The API uses Token-based authentication. Include the token in the Authorization header:

```
Authorization: Token your-token-here
```

## API Endpoints Reference

### 🎵 Artists API

#### Get All Artists

```http
GET /api/artists/
```

**Query Parameters:**

- `search`: Search by artist name
- `ordering`: Sort by `name`, `artist_id`, `-name`, `-artist_id`
- `page`: Page number for pagination

**Response:**

```json
{
  "count": 275,
  "next": "http://localhost:8000/api/artists/?page=2",
  "previous": null,
  "results": [
    {
      "artist_id": 1,
      "name": "AC/DC"
    }
  ]
}
```

#### Get Top Artists

```http
GET /api/artists/top_artists/
```

**Response:**

```json
[
  {
    "artist_id": 90,
    "name": "Iron Maiden",
    "total_sales": 138.6,
    "total_tracks": 21,
    "total_albums": 2
  }
]
```

#### Get Single Artist

```http
GET /api/artists/{artist_id}/
```

### 📀 Albums API

#### Get All Albums

```http
GET /api/albums/
```

**Query Parameters:**

- `search`: Search by album title or artist name
- `artist`: Filter by artist ID
- `ordering`: Sort by `title`, `album_id`, `-title`, `-album_id`

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

#### Get Top Albums

```http
GET /api/albums/top_albums/
```

### 🎶 Tracks API

#### Get All Tracks

```http
GET /api/tracks/
```

**Query Parameters:**

- `search`: Search by track name, album title, artist name, or composer
- `genre`: Filter by genre ID
- `album`: Filter by album ID
- `album__artist`: Filter by artist ID
- `ordering`: Sort by `name`, `unit_price`, `milliseconds`

**Response:**

```json
{
  "count": 3503,
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
      "bytes": 11170334,
      "unit_price": "0.99"
    }
  ]
}
```

#### Get Top Tracks

```http
GET /api/tracks/top_tracks/
```

#### Get Tracks by Genre

```http
GET /api/tracks/by_genre/?genre_id=1
```

### 👥 Customers API

#### Get All Customers

```http
GET /api/customers/
```

**Query Parameters:**

- `search`: Search by name, email, or company
- `country`: Filter by country
- `city`: Filter by city
- `state`: Filter by state

**Response:**

```json
{
  "count": 59,
  "results": [
    {
      "customer_id": 1,
      "first_name": "Luís",
      "last_name": "Gonçalves",
      "full_name": "Luís Gonçalves",
      "company": "Embraer - Empresa Brasileira de Aeronáutica S.A.",
      "address": "Av. Brigadeiro Faria Lima, 2170",
      "city": "São José dos Campos",
      "state": "SP",
      "country": "Brazil",
      "postal_code": "12227-000",
      "phone": "+55 (12) 3923-5555",
      "email": "luisg@embraer.com.br"
    }
  ]
}
```

#### Get Top Customers

```http
GET /api/customers/top_customers/
```

#### Get Customers by Country

```http
GET /api/customers/by_country/?country=Brazil
```

### 🧾 Invoices API

#### Get All Invoices

```http
GET /api/invoices/
```

**Query Parameters:**

- `search`: Search by customer name or email
- `customer`: Filter by customer ID
- `billing_country`: Filter by billing country
- `ordering`: Sort by `invoice_date`, `total`, `invoice_id`

**Response:**

```json
{
  "count": 412,
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
      "billing_address": "Theodor-Heuss-Straße 34",
      "billing_city": "Stuttgart",
      "billing_state": null,
      "billing_country": "Germany",
      "billing_postal_code": "70174",
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

#### Get Recent Orders

```http
GET /api/invoices/recent_orders/?limit=10
```

### 🎵 Genres API

#### Get All Genres

```http
GET /api/genres/
```

**Response:**

```json
{
  "count": 25,
  "results": [
    {
      "genre_id": 1,
      "name": "Rock"
    }
  ]
}
```

### 📊 Analytics API

#### Dashboard Summary

```http
GET /api/analytics/dashboard_summary/
```

**Response:**

```json
{
  "total_customers": 59,
  "total_tracks": 3503,
  "total_artists": 275,
  "total_albums": 347,
  "total_revenue": 2328.6,
  "total_orders": 412,
  "average_order_value": 5.65,
  "recent_orders": [
    {
      "invoice_id": 412,
      "customer_name": "João Fernandes",
      "total": "1.98",
      "date": "2013-12-22"
    }
  ]
}
```

#### Sales Overview

```http
GET /api/analytics/sales_overview/
```

**Query Parameters:**

- `start_date`: Filter from date (YYYY-MM-DD)
- `end_date`: Filter to date (YYYY-MM-DD)

**Response:**

```json
[
  {
    "period": "2009-01",
    "total_sales": 40.32,
    "total_orders": 21,
    "average_order_value": 1.92
  }
]
```

#### Genre Analysis

```http
GET /api/analytics/genre_analysis/
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

#### Country Analysis

```http
GET /api/analytics/country_analysis/
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

#### Yearly Comparison

```http
GET /api/analytics/yearly_comparison/
```

**Response:**

```json
[
  {
    "year": "2009",
    "total_sales": 449.46,
    "total_orders": 83,
    "average_order_value": 5.42
  }
]
```

#### Global Search

```http
GET /api/analytics/search_analytics/?q=rock
```

**Response:**

```json
{
  "artists": [
    {
      "artist_id": 1,
      "name": "AC/DC"
    }
  ],
  "albums": [
    {
      "album_id": 1,
      "title": "For Those About To Rock We Salute You",
      "artist": {
        "artist_id": 1,
        "name": "AC/DC"
      }
    }
  ],
  "tracks": [
    {
      "track_id": 1,
      "name": "For Those About To Rock (We Salute You)"
    }
  ],
  "customers": [],
  "total_results": 45
}
```

## Common Query Parameters

### Pagination

- `page`: Page number (default: 1)
- `page_size`: Number of results per page (default: 20, max: 100)

### Filtering

- Most endpoints support filtering by related fields
- Use `field__icontains` for case-insensitive partial matches
- Use `field__exact` for exact matches

### Searching

- `search`: General search across relevant fields
- Searches are case-insensitive and support partial matches

### Ordering

- `ordering`: Sort by field name
- Use `-` prefix for descending order (e.g., `-name`)
- Multiple fields: `ordering=field1,-field2`

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid parameter value"
}
```

### 401 Unauthorized

```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 Not Found

```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

- Development: No rate limiting
- Production: 1000 requests per hour per IP

## CORS Policy

- Development: All origins allowed
- Production: Only specified domains allowed

## Examples

### Getting Top Artists with Sales Data

```bash
curl -H "Authorization: Token your-token-here" \
  http://localhost:8000/api/artists/top_artists/
```

### Searching for Jazz Tracks

```bash
curl -H "Authorization: Token your-token-here" \
  "http://localhost:8000/api/tracks/?search=jazz"
```

### Getting Sales Data for 2010

```bash
curl -H "Authorization: Token your-token-here" \
  "http://localhost:8000/api/analytics/sales_overview/?start_date=2010-01-01&end_date=2010-12-31"
```

## SDK and Libraries

### JavaScript/React

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  },
});

// Get dashboard summary
const dashboardData = await api.get("analytics/dashboard_summary/");

// Search for tracks
const tracks = await api.get("tracks/", {
  params: { search: "rock", page: 1 },
});
```

### Python

```python
import requests

headers = {
    'Authorization': f'Token {token}',
    'Content-Type': 'application/json'
}

# Get top artists
response = requests.get(
    'http://localhost:8000/api/artists/top_artists/',
    headers=headers
)
data = response.json()
```

## Testing the API

### Using curl

```bash
# Get all artists
curl -H "Authorization: Token your-token-here" \
  http://localhost:8000/api/artists/

# Get dashboard summary
curl -H "Authorization: Token your-token-here" \
  http://localhost:8000/api/analytics/dashboard_summary/
```

### Using Python requests

```python
import requests

token = "your-token-here"
base_url = "http://localhost:8000/api/"

headers = {"Authorization": f"Token {token}"}

# Test endpoints
endpoints = [
    "artists/",
    "albums/",
    "tracks/",
    "customers/",
    "analytics/dashboard_summary/"
]

for endpoint in endpoints:
    response = requests.get(f"{base_url}{endpoint}", headers=headers)
    print(f"{endpoint}: {response.status_code}")
```

This comprehensive API provides all the endpoints needed for your TrackPulse Analytics dashboard with advanced filtering, searching, and analytics capabilities.
