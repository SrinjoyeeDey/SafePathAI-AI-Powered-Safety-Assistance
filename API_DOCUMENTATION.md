# SafePathAI API Documentation

## Overview

The SafePathAI API provides a comprehensive set of endpoints for personal safety assistance, including user authentication, location services, AI-powered recommendations, and emergency SOS functionality.

**Base URL**: `http://localhost:4000/api` (development)  
**Production URL**: `https://your-domain.com/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require a valid access token in the Authorization header.

### Authentication Flow

1. **Signup/Login** - Get access token and refresh token
2. **API Requests** - Include access token in Authorization header
3. **Token Refresh** - Use refresh token to get new access token
4. **Logout** - Invalidate refresh token

### Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Endpoints

### Authentication Endpoints

#### POST `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "lat": 40.7128,  // Optional: initial location latitude
  "lng": -74.0060  // Optional: initial location longitude
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `409 Conflict` - User already exists
- `500 Internal Server Error` - Server error

---

#### POST `/api/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Invalid credentials
- `500 Internal Server Error` - Server error

---

#### POST `/api/auth/refresh`

Refresh access token using refresh token stored in HTTP-only cookie.

**Request:** No body required (uses cookie)

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or expired refresh token
- `500 Internal Server Error` - Server error

---

#### POST `/api/auth/logout`

Logout user and invalidate refresh token.

**Request:** No body required (uses cookie)

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Error Responses:**
- `500 Internal Server Error` - Server error

---

### User Management Endpoints

#### GET `/api/users/me`

Get current user profile information.

**Headers:** `Authorization: Bearer <access_token>`

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLocation": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

#### PATCH `/api/users/me/location`

Update user's current location.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "lng": -74.0060,  // Longitude (required)
  "lat": 40.7128    // Latitude (required)
}
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "lastLocation": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    }
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid coordinates
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Server error

---

### Places & Location Endpoints

#### GET `/api/places/nearby`

Find nearby safe locations (hospitals, police stations, pharmacies, etc.).

**Query Parameters:**
- `lat` (required): Latitude as number
- `lng` (required): Longitude as number
- `type` (optional): Location type (default: "hospital")
  - `hospital` - Medical facilities
  - `police_station` - Law enforcement
  - `pharmacy` - Medical supplies
  - `fire_station` - Emergency services
- `limit` (optional): Maximum number of results (default: 8)

**Example Request:**
```
GET /api/places/nearby?lat=40.7128&lng=-74.0060&type=hospital&limit=5
```

**Response (200 OK):**
```json
{
  "places": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "New York Hospital",
      "type": "hospital",
      "address": "123 Main St, New York, NY 10001",
      "location": {
        "type": "Point",
        "coordinates": [-74.0060, 40.7128]
      },
      "source": "mapbox",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Central Medical Center",
      "type": "hospital",
      "address": "456 Broadway, New York, NY 10013",
      "location": {
        "type": "Point",
        "coordinates": [-74.0050, 40.7130]
      },
      "source": "mapbox",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Missing or invalid coordinates
- `500 Internal Server Error` - Server error or API key issues

**Implementation Notes:**
- First checks local database for cached results
- If no cached results, queries Mapbox API
- Caches new results in database for future requests
- Uses 2dsphere geospatial indexing for efficient queries

---

### AI Assistant Endpoints

#### POST `/api/ai/query`

Get AI-powered safety recommendations with location context.

**Request Body:**
```json
{
  "message": "What's the safest route to Central Park?",
  "latitude": 40.7128,  // Optional: user's current latitude
  "longitude": -74.0060 // Optional: user's current longitude
}
```

**Response (200 OK):**
```json
{
  "response": "Based on your location, I recommend taking 5th Avenue as it's well-lit and has regular police patrols. Avoid the shortcut through the park after dark. There's a police station at 123 5th Ave if you need assistance."
}
```

**Error Responses:**
- `400 Bad Request` - Missing message
- `500 Internal Server Error` - AI service error

**Implementation Notes:**
- Uses Google Gemini AI for responses
- Enriches context with nearby places from database
- Provides location-aware safety advice
- Caches conversation history

---

### SOS Emergency Endpoints

#### POST `/api/sos/send`

Send emergency SOS alert with location.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "message": "Emergency! Please help me.",  // Optional: custom message
  "location": {
    "type": "Point",
    "coordinates": [-74.0060, 40.7128]  // [longitude, latitude]
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "sos": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "message": "Emergency! Please help me.",
    "location": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "contactsSentTo": [],
    "status": "pending",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing coordinates
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

**Implementation Notes:**
- Creates SOS record in database
- Currently logs emergency to console (SMS/email integration pending)
- Future: Will send notifications to favorite contacts
- Future: Will integrate with emergency services

---

### Health Check Endpoint

#### GET `/api/health`

Check server status and connectivity.

**Response (200 OK):**
```json
{
  "ok": true,
  "ts": 1704067200000
}
```

**Use Cases:**
- Load balancer health checks
- Monitoring system status
- Development testing

---

## Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description",
  "code": "ERROR_CODE",  // Optional
  "details": {}          // Optional additional details
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server error |

### Common Error Messages

#### Authentication Errors
- `"No token"` - Missing Authorization header
- `"Invalid or expired token"` - Invalid JWT token
- `"Invalid credentials"` - Wrong email/password
- `"User already exists"` - Email already registered

#### Validation Errors
- `"Missing fields (name, email and password are required)"` - Required fields missing
- `"Invalid email format"` - Email validation failed
- `"Invalid coordinates"` - Invalid latitude/longitude values

#### Server Errors
- `"Internal server error"` - Generic server error
- `"Server error fetching places"` - External API error
- `"Failed to get AI response"` - AI service error

---

## Rate Limiting

Currently not implemented. Planned features:
- **Authentication endpoints**: 5 requests per minute
- **AI endpoints**: 10 requests per minute
- **Location endpoints**: 20 requests per minute
- **User endpoints**: 30 requests per minute

---

## Data Models

### User Model
```typescript
interface User {
  _id: ObjectId;
  name: string;
  email: string;                    // Unique, indexed
  passwordHash: string;             // Bcrypt hashed
  role: "user" | "admin";          // Default: "user"
  refreshTokens: string[];          // For token revocation
  lastLocation?: {                  // GeoJSON Point
    type: "Point";
    coordinates: [number, number];  // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Place Model
```typescript
interface Place {
  _id: ObjectId;
  name: string;
  type: string;                     // "hospital", "police_station", "pharmacy"
  address?: string;
  location: {                       // GeoJSON Point, 2dsphere indexed
    type: "Point";
    coordinates: [number, number];  // [longitude, latitude]
  };
  source?: string;                  // "mapbox", "seed", etc.
  createdAt: Date;
  updatedAt: Date;
}
```

### SOS Model
```typescript
interface SOS {
  _id: ObjectId;
  user?: ObjectId;                  // Reference to User
  message?: string;
  location: {                       // GeoJSON Point, 2dsphere indexed
    type: "Point";
    coordinates: [number, number];  // [longitude, latitude]
  };
  contactsSentTo?: string[];        // Array of contact emails/phones
  status: "pending" | "notified" | "closed";
  createdAt: Date;
  updatedAt: Date;
}
```

### Chat Model
```typescript
interface Chat {
  _id: ObjectId;
  user: ObjectId;                   // Reference to User
  prompt: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class SafePathAI {
  constructor(baseURL = 'http://localhost:4000/api') {
    this.baseURL = baseURL;
    this.token = null;
  }

  async signup(userData) {
    const response = await axios.post(`${this.baseURL}/auth/signup`, userData);
    this.token = response.data.accessToken;
    return response.data;
  }

  async login(email, password) {
    const response = await axios.post(`${this.baseURL}/auth/login`, {
      email, password
    });
    this.token = response.data.accessToken;
    return response.data;
  }

  async getNearbyPlaces(lat, lng, type = 'hospital', limit = 8) {
    const response = await axios.get(`${this.baseURL}/places/nearby`, {
      params: { lat, lng, type, limit },
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async askAI(message, latitude, longitude) {
    const response = await axios.post(`${this.baseURL}/ai/query`, {
      message, latitude, longitude
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async sendSOS(location, message = 'Emergency! Please help me.') {
    const response = await axios.post(`${this.baseURL}/sos/send`, {
      message, location
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }
}

// Usage example
const client = new SafePathAI();
await client.login('user@example.com', 'password');
const places = await client.getNearbyPlaces(40.7128, -74.0060, 'hospital');
```

### Python

```python
import requests
from typing import Optional, Dict, Any

class SafePathAI:
    def __init__(self, base_url: str = 'http://localhost:4000/api'):
        self.base_url = base_url
        self.token: Optional[str] = None

    def signup(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        response = requests.post(f'{self.base_url}/auth/signup', json=user_data)
        response.raise_for_status()
        data = response.json()
        self.token = data['accessToken']
        return data

    def login(self, email: str, password: str) -> Dict[str, Any]:
        response = requests.post(f'{self.base_url}/auth/login', json={
            'email': email, 'password': password
        })
        response.raise_for_status()
        data = response.json()
        self.token = data['accessToken']
        return data

    def get_nearby_places(self, lat: float, lng: float, 
                         place_type: str = 'hospital', limit: int = 8) -> Dict[str, Any]:
        params = {'lat': lat, 'lng': lng, 'type': place_type, 'limit': limit}
        headers = self._get_auth_headers()
        response = requests.get(f'{self.base_url}/places/nearby', 
                              params=params, headers=headers)
        response.raise_for_status()
        return response.json()

    def ask_ai(self, message: str, latitude: float, longitude: float) -> Dict[str, Any]:
        data = {'message': message, 'latitude': latitude, 'longitude': longitude}
        headers = self._get_auth_headers()
        response = requests.post(f'{self.base_url}/ai/query', 
                               json=data, headers=headers)
        response.raise_for_status()
        return response.json()

    def send_sos(self, location: Dict[str, Any], 
                message: str = 'Emergency! Please help me.') -> Dict[str, Any]:
        data = {'message': message, 'location': location}
        headers = self._get_auth_headers()
        response = requests.post(f'{self.base_url}/sos/send', 
                               json=data, headers=headers)
        response.raise_for_status()
        return response.json()

    def _get_auth_headers(self) -> Dict[str, str]:
        return {'Authorization': f'Bearer {self.token}'} if self.token else {}

# Usage example
client = SafePathAI()
client.login('user@example.com', 'password')
places = client.get_nearby_places(40.7128, -74.0060, 'hospital')
```

---

## Webhooks (Planned)

Future webhook endpoints for real-time notifications:

### POST `/api/webhooks/sos-alert`
Receive SOS alerts from external systems.

### POST `/api/webhooks/location-update`
Receive location updates from mobile apps.

### POST `/api/webhooks/emergency-services`
Integration with emergency services systems.

---

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- JWT authentication system
- User management endpoints
- Location and places endpoints
- AI assistant integration
- SOS emergency functionality
- Health check endpoint

### Planned Features
- Rate limiting implementation
- Webhook support
- Advanced analytics endpoints
- Favorite contacts management
- Push notification system
- Offline mode support

---

## Support

For API support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance/issues)
- **Documentation**: Check this file and README.md
- **Community**: Join our GitHub Discussions

---

**Last Updated**: January 2025  
**API Version**: 1.0.0  
**Maintainer**: SafePathAI Team
