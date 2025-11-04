# SafePathAI - AI-Powered Safety Assistance

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E293B,100:22C55E&height=210&section=header&text=%20SafePathAI%20-%20Hacktoberfest%202025&fontSize=40&fontColor=00ff9c&fontAlignY=40&animation=fadeIn&desc=AI-Powered%20Safety%20and%20Navigation%20System&descAlignY=70&descAlign=50" />
</p>

<!-- Typing SVG Animation -->
<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=30&duration=4000&color=22C55E&center=true&vCenter=true&width=600&lines=AI-Powered+Safety+Companion;Real-time+Location+Tracking;Smart+Emergency+Alerts;Safe+Route+Recommendations;Instant+SOS+Assistance;Privacy+First+Design" alt="Typing SVG" />

<br>

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-8a2be2?style=for-the-badge&logo=hacktoberfest)](https://hacktoberfest.com)
[![Open Issues](https://img.shields.io/github/issues/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge&color=blue)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues)
[![Contributors](https://img.shields.io/github/contributors/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge&color=green)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/graphs/contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Your AI-driven personal safety assistant combining geolocation, maps, AI (Gemini/OpenAI), and the MERN stack to make urban navigation safer and smarter.**

  [Report Bug](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues) • [Request Feature](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues)

</div>

<br>

## Table of Contents
<details>

| Section | Section |
|:---|:---|
| [Features](#features) | [Quick Start](#quick-start) |
| [Use Cases](#use-cases) | [Frontend Contribution](#frontend-contribution) |
| [Tech Stack](#tech-stack) | [Contributing](#contributing) |
| [System Architecture](#system-architecture) | [Roadmap](#roadmap) |
| [Repository Structure](#repository-structure) | [Contributors](#contributors) |
| [API Documentation](#api-documentation) | [Frontend Documentation](#frontend-documentation) |
| [Database Schema](#database-schema) | [Deployment Guide](#deployment-guide) |
| [Security Features](#security-features) | [Troubleshooting](#troubleshooting) |

</details>
<br>

## Features

<div align="left">

| Feature | Description |
|:---|:---|
| **JWT Authentication** | Secure login & signup with bcrypt password hashing and refresh token rotation |
| **Real-time Geolocation** | Live location tracking with high accuracy using browser geolocation API |
| **Nearby Safe Zones** | Find hospitals, police stations, pharmacies instantly using Mapbox API |
| **AI Safety Assistant** | Gemini/OpenAI powered safety recommendations with location context |
| **One-tap SOS** | Emergency alerts with live location sharing to favorite contacts |
| **Safe Route Planning** | AI-powered safest route recommendations based on real-time data |
| **Cross-platform** | Responsive design for all devices with mobile-first approach |
| **Dark/Light Theme** | Accessible interface with theme toggle and system preference detection |
| **Favorite Contacts** | Manage emergency contacts with CRUD operations |
| **Analytics Dashboard** | Visual insights into safety metrics and location patterns |
| **Chat Interface** | Real-time AI chat with location-aware responses |
| **User Profile Management** | Update location, manage preferences, and view activity |

</div>

<br>

## Use Cases

<div align="center">

```mermaid
graph TD
    A[User Scenario] --> B[Walking Home Late]
    A --> C[Traveling in New City]
    A --> D[Emergency Situation]
    A --> E[Daily Commute]
    
    B --> F[Open SafePathAI App]
    C --> F
    D --> F
    E --> F
    
    F --> G[View Safe Routes & Zones]
    F --> H[Ask AI Assistant]
    F --> I[Hit SOS Button]
    F --> J[Check Analytics]
    
    G --> K[Get Safety Recommendations]
    H --> K
    I --> L[Send Emergency Alerts]
    J --> M[View Safety Insights]
    
    K --> N[Reach Destination Safely]
    L --> N
    M --> N
```

</div>

<div align="left">

**Real-world Scenarios:**

1. **Late Night Commute**: Walking home from work late at night, you open SafePathAI to view nearby safe zones, get AI-powered route recommendations, and have instant SOS access.

2. **New City Travel**: Exploring an unfamiliar city, the app helps you find safe routes, nearby emergency services, and provides location-aware safety advice.

3. **Emergency Situations**: One-tap SOS functionality immediately shares your precise location with emergency contacts and services.

4. **Daily Safety Monitoring**: Regular use provides analytics on your safety patterns and helps identify safer routes over time.

</div>

<br>

## Tech Stack

<div align="left">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19+-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)
![Mongoose](https://img.shields.io/badge/Mongoose-8.19+-880000?style=flat-square&logo=mongodb)

### Frontend
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.9-CA4245?style=flat-square&logo=react-router)
![React Icons](https://img.shields.io/badge/React_Icons-5.5-61DAFB?style=flat-square&logo=react)

### AI & APIs
![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)
![Groq AI](https://img.shields.io/badge/Groq_AI-Llama_3.1-00A86B?style=flat-square)
![Mapbox](https://img.shields.io/badge/Mapbox-Maps-000000?style=flat-square&logo=mapbox)
![Twilio](https://img.shields.io/badge/Twilio-SMS-22C55E?style=flat-square&logo=twilio)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-9.36-4B32C3?style=flat-square&logo=eslint)
![PostCSS](https://img.shields.io/badge/PostCSS-8.5-DD3A0A?style=flat-square&logo=postcss)
![Morgan](https://img.shields.io/badge/Morgan-Logging-000000?style=flat-square)

</div>

<br>

## System Architecture

<div align="center">

```mermaid
flowchart TD
    subgraph "Frontend (React + Vite)"
        A[React App] --> B[Map Integration]
        A --> C[AI Chat Interface]
        A --> D[SOS Dashboard]
        A --> E[Analytics]
        A --> F[User Management]
    end
    
    subgraph "Backend (Express + TypeScript)"
        G[Express Server] --> H[JWT Auth Middleware]
        G --> I[MongoDB Database]
        G --> J[AI Service Layer]
        G --> K[Map API Integration]
        G --> L[SOS Service]
    end
    
    subgraph "External Services"
        M[Google Gemini AI] --> J
        N[Groq AI] --> J
        O[Mapbox API] --> K
        P[Twilio SMS] --> L
        Q[Emergency Services] --> L
    end
    
    subgraph "Database (MongoDB)"
        R[Users Collection]
        S[Places Collection]
        T[SOS Alerts Collection]
        U[Chat History Collection]
        V[Favorite Contacts Collection]
    end
    
    A <--> G
    H --> R
    I --> R
    I --> S
    I --> T
    I --> U
    I --> V
    J --> M
    J --> N
    K --> O
    L --> P
    L --> Q
```

</div>

<br>

## Repository Structure

<div align="left">
  
```typescript
SafePathAI-AI-Powered-Safety-Assistance/
├── 📂 backend/                          # Node.js + Express Backend
│   ├── 📂 src/
│   │   ├── 📂 controllers/              # Business Logic Controllers
│   │   │   ├── authController.ts        # Authentication (login, signup, refresh, logout)
│   │   │   ├── userController.ts        # User profile management
│   │   │   ├── placesController.ts      # Location and places management
│   │   │   ├── aiController.ts          # AI service integration
│   │   │   ├── chatbotController.ts     # Chat interface with Groq AI
│   │   │   └── sosController.ts         # Emergency SOS functionality
│   │   ├── 📂 models/                   # MongoDB Schemas
│   │   │   ├── User.ts                  # User authentication & profile
│   │   │   ├── Place.ts                 # Safe locations (hospitals, police, etc.)
│   │   │   ├── SOS.ts                   # Emergency alerts
│   │   │   ├── Chat.ts                  # AI conversation history
│   │   │   └── FavoriteContact.ts       # Emergency contacts (empty - needs implementation)
│   │   ├── 📂 routes/                   # API Endpoints
│   │   │   ├── authRoutes.ts            # /api/auth/* endpoints
│   │   │   ├── userRoutes.ts            # /api/users/* endpoints
│   │   │   ├── placesRoutes.ts          # /api/places/* endpoints
│   │   │   ├── aiRoutes.ts              # /api/ai/* endpoints
│   │   │   └── sosRoutes.ts             # /api/sos/* endpoints
│   │   ├── 📂 middleware/               # Express Middleware
│   │   │   └── auth.ts                  # JWT token verification
│   │   ├── 📂 services/                 # External Service Integrations
│   │   │   └── aiService.ts             # Gemini AI integration
│   │   ├── 📂 utils/                    # Utility Functions
│   │   │   └── jwt.ts                   # JWT token generation
│   │   ├── 📂 types/                    # TypeScript Type Definitions
│   │   │   └── types.ts                 # Request interface extensions
│   │   ├── samplePlaces.ts              # Database seeding script
│   │   └── index.ts                     # Server entry point
│   ├── .env.example                     # Environment variables template
│   ├── package.json                     # Backend dependencies
│   ├── package-lock.json
│   └── tsconfig.json                    # TypeScript configuration
│
├── 📂 frontend/                         # React + Vite Frontend
│   ├── 📂 public/
│   │   ├── 📂 data/                     # Static JSON data files
│   │   │   ├── team.json                # Team member information
│   │   │   ├── stories.json             # User testimonials
│   │   │   ├── impact.json              # Impact statistics
│   │   │   ├── timeline.json            # Company timeline
│   │   │   ├── whychooseus.json         # Feature highlights
│   │   │   └── workflow.json            # Process steps
│   │   ├── vite.svg
│   │   └── index.html
│   ├── 📂 src/
│   │   ├── 📂 components/               # Reusable UI Components
│   │   │   ├── 📂 Analytics/            # Analytics dashboard components
│   │   │   │   ├── ChartCard.tsx        # Chart wrapper component
│   │   │   │   └── Filters.tsx          # Analytics filters
│   │   │   ├── 📂 Dashboard/            # Dashboard-specific components
│   │   │   │   └── UserLocation.tsx     # User location display
│   │   │   ├── Chat.tsx                 # AI chat interface
│   │   │   ├── DarkModeToggle.tsx       # Theme switcher
│   │   │   ├── FeatureCard.tsx          # Feature showcase cards
│   │   │   ├── Footer.tsx               # Site footer
│   │   │   ├── ImpactCounter.tsx        # Animated statistics
│   │   │   ├── Map.tsx                  # Interactive map component
│   │   │   ├── Navbar.tsx               # Navigation header
│   │   │   ├── OwnerCard.tsx            # Team member cards
│   │   │   ├── Section.tsx              # Content section wrapper
│   │   │   ├── SOSButton.tsx            # Emergency SOS button
│   │   │   ├── StoryCard.tsx            # User story cards
│   │   │   ├── SummaryCards.tsx         # Dashboard summary cards
│   │   │   ├── TeamMemberCard.tsx       # Team member display
│   │   │   └── WorkflowStepCard.tsx     # Process step cards
│   │   ├── 📂 context/                  # React Context Providers
│   │   │   ├── AuthContext.tsx          # Authentication state management
│   │   │   └── ThemeContext.tsx         # Theme state management
│   │   ├── 📂 hooks/                    # Custom React Hooks
│   │   │   ├── useAboutUsData.ts        # Data fetching for About page
│   │   │   └── useDocumentTitle.ts      # Document title management
│   │   ├── 📂 pages/                    # Page Components
│   │   │   ├── AboutUs.tsx              # About page with team info
│   │   │   ├── Analytics.tsx            # Analytics dashboard
│   │   │   ├── ContactOwner.tsx         # Contact form page
│   │   │   ├── Dashboard.tsx            # Main dashboard
│   │   │   ├── Emergency.tsx            # Emergency SOS page
│   │   │   ├── Favorites.tsx            # Favorite contacts management
│   │   │   ├── Login.tsx                # User login page
│   │   │   └── signup.tsx               # User registration page
│   │   ├── 📂 services/                 # API Service Layer
│   │   │   └── api.ts                   # Axios configuration and interceptors
│   │   ├── 📂 types/                    # TypeScript Type Definitions
│   │   │   ├── Impact.ts                # Impact data types
│   │   │   ├── Story.ts                 # Story data types
│   │   │   ├── Team.ts                  # Team member types
│   │   │   ├── Timeline.ts              # Timeline data types
│   │   │   ├── TimelineData.ts          # Timeline item types
│   │   │   ├── WhyChooseUs.ts           # Feature types
│   │   │   └── Workflow.ts              # Workflow step types
│   │   ├── App.css                      # Global styles
│   │   ├── App.tsx                      # Main app component with routing
│   │   ├── index.css                    # Base styles and Tailwind imports
│   │   └── main.tsx                     # React app entry point
│   ├── .gitignore
│   ├── DESIGN_GUIDE.md                  # UI/UX design guidelines
│   ├── README.md                        # Frontend-specific documentation
│   ├── eslint.config.js                 # ESLint configuration
│   ├── package.json                     # Frontend dependencies
│   ├── package-lock.json
│   ├── postcss.config.cjs               # PostCSS configuration
│   ├── postcss.config.js                # PostCSS configuration (alternative)
│   ├── tailwind.config.js               # Tailwind CSS configuration
│   ├── tsconfig.app.json                # TypeScript app configuration
│   ├── tsconfig.json                    # TypeScript root configuration
│   ├── tsconfig.node.json               # TypeScript node configuration
│   └── vite.config.ts                   # Vite build configuration
│
├── .gitignore                           # Git ignore rules
├── License.md                           # MIT License
├── README.md                            # This comprehensive documentation
├── package.json                         # Root package.json (minimal)
└── package-lock.json                    # Root package-lock.json
```

</div>

<br>

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "lat": 40.7128,  // Optional: initial location
  "lng": -74.0060  // Optional: initial location
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token"
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token"
}
```

#### POST `/api/auth/refresh`
Refresh access token using refresh token.

**Response:**
```json
{
  "accessToken": "new_jwt_access_token"
}
```

#### POST `/api/auth/logout`
Logout user and invalidate refresh token.

**Response:**
```json
{
  "ok": true
}
```

### User Management Endpoints

#### GET `/api/users/me`
Get current user profile.

**Headers:** `Authorization: Bearer <access_token>`

**Response:**
```json
{
  "user": {
    "_id": "user_id",
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

#### PATCH `/api/users/me/location`
Update user's current location.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "lng": -74.0060,
  "lat": 40.7128
}
```

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "lastLocation": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    }
  }
}
```

### Places & Location Endpoints

#### GET `/api/places/nearby`
Find nearby safe locations.

**Query Parameters:**
- `lat` (required): Latitude
- `lng` (required): Longitude
- `type` (optional): Location type (default: "hospital")
- `limit` (optional): Maximum results (default: 8)

**Example:** `/api/places/nearby?lat=40.7128&lng=-74.0060&type=hospital&limit=5`

**Response:**
```json
{
  "places": [
    {
      "_id": "place_id",
      "name": "New York Hospital",
      "type": "hospital",
      "address": "123 Main St, New York, NY",
      "location": {
        "type": "Point",
        "coordinates": [-74.0060, 40.7128]
      },
      "source": "mapbox",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### AI Assistant Endpoints

#### POST `/api/ai/query`
Get AI-powered safety recommendations.

**Request Body:**
```json
{
  "message": "What's the safest route to Central Park?",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**
```json
{
  "reply": "Based on your location, I recommend taking 5th Avenue as it's well-lit and has regular police patrols. Avoid the shortcut through the park after dark."
}
```

### SOS Emergency Endpoints

#### POST `/api/sos/send`
Send emergency SOS alert.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "message": "Emergency! Please help me.",
  "location": {
    "type": "Point",
    "coordinates": [-74.0060, 40.7128]
  }
}
```

**Response:**
```json
{
  "success": true,
  "sos": {
    "_id": "sos_id",
    "user": "user_id",
    "message": "Emergency! Please help me.",
    "location": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "contactsSentTo": [],
    "status": "pending",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### Health Check

#### GET `/api/health`
Check server status.

**Response:**
```json
{
  "ok": true,
  "ts": 1704067200000
}
```

<br>

## Database Schema

### User Model
```typescript
interface IUser {
  _id: Types.ObjectId;
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
interface IPlace {
  _id: Types.ObjectId;
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
interface ISOS {
  _id: Types.ObjectId;
  user?: Schema.Types.ObjectId;     // Reference to User
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
interface IChat {
  _id: Types.ObjectId;
  user: Schema.Types.ObjectId;      // Reference to User
  prompt: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### FavoriteContact Model (To be implemented)
```typescript
interface IFavoriteContact {
  _id: Types.ObjectId;
  user: Schema.Types.ObjectId;      // Reference to User
  name: string;
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

<br>

## Frontend Documentation

### Component Architecture

#### Core Components

**App.tsx** - Main application component with routing
- Manages global providers (Auth, Theme)
- Defines all application routes
- Handles navigation structure

**Navbar.tsx** - Navigation header
- Responsive navigation with mobile sidebar
- Theme toggle functionality
- Active route highlighting
- User profile access

**Chat.tsx** - AI assistant interface
- Floating chat widget
- Real-time messaging with AI
- Location-aware responses
- Message history management

#### Page Components

**Dashboard.tsx** - Main dashboard
- Safety metrics overview
- Interactive map placeholder
- AI suggestions display
- Emergency SOS access
- Analytics preview

**Login.tsx & signup.tsx** - Authentication pages
- Form validation
- Error handling
- Responsive design
- Smooth transitions

**Emergency.tsx** - SOS functionality
- One-tap emergency button
- Location sharing
- Contact notification

**Favorites.tsx** - Contact management
- CRUD operations for emergency contacts
- Form validation
- Responsive grid layout

**Analytics.tsx** - Data visualization
- Chart components (Line, Bar, Pie)
- Filtering capabilities
- Mock data integration

**AboutUs.tsx** - Company information
- Team member showcase
- Company timeline
- Impact statistics
- Contact form

#### Context Providers

**AuthContext.tsx** - Authentication state
- User session management
- Token storage
- Login/logout functions
- Persistent authentication

**ThemeContext.tsx** - Theme management
- Dark/light mode toggle
- System preference detection
- Persistent theme storage

#### Custom Hooks

**useAboutUsData.ts** - Data fetching
- Parallel API calls for static data
- Loading state management
- Error handling

**useDocumentTitle.ts** - Page titles
- Dynamic document title updates
- SEO optimization

### Styling & Design System

#### Tailwind CSS Configuration
- Custom color palette (green/emerald theme)
- Responsive breakpoints
- Dark mode support
- Custom animations and transitions

#### Design Patterns
- Glassmorphism effects
- Gradient backgrounds
- Hover animations
- Mobile-first responsive design
- Accessibility considerations

#### Component Styling
- Consistent spacing and typography
- Icon integration with React Icons
- Loading states and animations
- Error state handling

<br>

## Quick Start

### Prerequisites

<div align="left">

![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0%2B-47A248?style=for-the-badge&logo=mongodb)
![Git](https://img.shields.io/badge/Git-2.0%2B-F05032?style=for-the-badge&logo=git)

</div>

### Installation

<div align="left">

```bash
# 1. Clone the repository
git clone https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance.git
cd SafePathAI-AI-Powered-Safety-Assistance

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Configure environment variables
cd ../backend
cp .env.example .env
# Edit .env with your API keys (see Environment Variables section)

# 5. Start MongoDB (if running locally)
# Make sure MongoDB is running on your system

# 6. Start backend development server
npm run dev

# 7. Start frontend development server (in new terminal)
cd ../frontend
npm run dev

# 8. Access the application
# Backend API: http://localhost:4000/api
# Frontend App: http://localhost:5173
```

</div>

<div align="center">

```mermaid
graph LR
    A[Clone Repository] --> B[Install Dependencies]
    B --> C[Configure Environment]
    C --> D[Start MongoDB]
    D --> E[Start Backend]
    E --> F[Start Frontend]
    F --> G[Access Application]
```

</div>

### Environment Variables

<div align="left">

Create `.env` file in `/backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/safepathai

# JWT Authentication
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
REFRESH_TOKEN_EXPIRES_IN=7d

# AI Services
GEMINI_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Map Services
MAPBOX_API_KEY=your_mapbox_api_key

# Communication Services (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

**Required API Keys:**
1. **MongoDB**: Set up a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Google Gemini**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Groq AI**: Get API key from [Groq Console](https://console.groq.com/)
4. **Mapbox**: Get API key from [Mapbox Account](https://account.mapbox.com/access-tokens/)

</div>

<br>

## Security Features

### Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Bcrypt password hashing** with salt rounds
- **Token rotation** for enhanced security
- **HTTP-only cookies** for refresh token storage
- **CORS configuration** for cross-origin requests

### Data Protection
- **Input validation** on all endpoints
- **SQL injection prevention** through Mongoose ODM
- **XSS protection** through proper data sanitization
- **Rate limiting** (to be implemented)
- **Environment variable protection** for sensitive data

### Privacy & Compliance
- **Location data encryption** in transit and at rest
- **User consent** for location sharing
- **Data minimization** principles
- **Secure API endpoints** with proper authentication
- **GDPR compliance** considerations

<br>

## Deployment Guide

### Backend Deployment (Heroku)

```bash
# 1. Install Heroku CLI
# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create your-app-name

# 4. Set environment variables
heroku config:set MONGO_URI=your_mongodb_connection_string
heroku config:set JWT_ACCESS_SECRET=your_jwt_secret
heroku config:set JWT_REFRESH_SECRET=your_refresh_secret
heroku config:set GEMINI_API_KEY=your_gemini_key
heroku config:set MAPBOX_API_KEY=your_mapbox_key

# 5. Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd frontend
vercel

# 3. Configure environment variables in Vercel dashboard
# Update API base URL to point to your deployed backend
```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

<br>

## Troubleshooting

### Common Issues

#### Backend Issues

**MongoDB Connection Error**
```bash
# Check MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"

# Verify connection string format
mongodb://username:password@host:port/database
```

**JWT Token Errors**
```bash
# Ensure JWT secrets are set
echo $JWT_ACCESS_SECRET
echo $JWT_REFRESH_SECRET

# Check token expiration
# Access tokens expire in 1 hour
# Refresh tokens expire in 7 days
```

**API Key Issues**
```bash
# Test Gemini API key
curl -H "Authorization: Bearer YOUR_GEMINI_KEY" \
     https://generativelanguage.googleapis.com/v1beta/models

# Test Mapbox API key
curl "https://api.mapbox.com/geocoding/v5/mapbox.places/test.json?access_token=YOUR_MAPBOX_KEY"
```

#### Frontend Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

**API Connection Issues**
```bash
# Verify backend is running
curl http://localhost:4000/api/health

# Check CORS configuration
# Ensure frontend URL is in CORS origins
```

**Location Permission Issues**
```javascript
// Check browser location permissions
navigator.permissions.query({name: 'geolocation'})
  .then(result => console.log(result.state));
```

### Performance Optimization

#### Backend
- **Database indexing** on frequently queried fields
- **Connection pooling** for MongoDB
- **Response caching** for static data
- **API rate limiting** to prevent abuse

#### Frontend
- **Code splitting** for better loading performance
- **Image optimization** for faster loading
- **Lazy loading** for non-critical components
- **Service worker** for offline functionality

### Monitoring & Logging

#### Backend Logging
```javascript
// Morgan logging middleware
app.use(morgan('combined'));

// Custom error logging
console.error('Error details:', error);
```

#### Frontend Error Tracking
```javascript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Frontend error:', error, errorInfo);
  }
}
```

<br>

## Contributing

<div align="center">

We love your input! We want to make contributing as easy and transparent as possible.

<img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=20&duration=3000&color=10B981&center=true&vCenter=true&width=500&lines=Contributions+Welcome!;Fork+and+Create+PR;Follow+Guidelines;Test+Your+Changes" alt="Contributing" />

</div>

### Development Workflow

<div align="center">

```mermaid
graph LR
    A[Fork Repository] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Run Tests]
    D --> E[Submit PR]
    E --> F[Review & Merge]
```

</div>

### Steps to Contribute

<div align="left">

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Test your changes** thoroughly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with detailed description

### Development Guidelines

#### Backend Guidelines
- Use **TypeScript** for all new code
- Follow **Express.js** best practices
- Implement proper **error handling**
- Write **meaningful commit messages**
- Add **JSDoc comments** for complex functions
- Use **Mongoose** for database operations
- Implement **input validation** for all endpoints

#### Frontend Guidelines
- Use **React functional components** with hooks
- Follow **React best practices** and patterns
- Use **TypeScript** for type safety
- Implement **responsive design** with Tailwind CSS
- Add **loading states** and **error handling**
- Use **React Router** for navigation
- Follow **accessibility guidelines**

#### Code Quality Standards
- **ESLint** configuration must pass
- **TypeScript** compilation without errors
- **Consistent code formatting** with Prettier
- **Meaningful variable names** and comments
- **Proper error handling** and logging
- **Security best practices** implementation

### Good First Issues

Look for issues tagged with:
- `good-first-issue` - Perfect for newcomers
- `frontend` - React/UI related tasks
- `backend` - Node.js/API related tasks
- `documentation` - Documentation improvements
- `bug` - Bug fixes
- `enhancement` - Feature improvements

### Priority Areas for Contribution

#### High Priority
- **Favorite Contacts Management** - Complete the CRUD functionality
- **Real-time Map Integration** - Implement interactive maps
- **Push Notifications** - Add browser notification support
- **Offline Functionality** - Service worker implementation
- **Mobile App** - React Native version

#### Medium Priority
- **Advanced Analytics** - More detailed safety metrics
- **Social Features** - User reviews and safety tips
- **Multi-language Support** - Internationalization
- **Advanced AI Features** - Predictive safety analytics
- **Integration Testing** - Comprehensive test suite

#### Low Priority
- **UI/UX Improvements** - Design enhancements
- **Performance Optimization** - Speed improvements
- **Documentation** - Additional guides and tutorials
- **Accessibility** - WCAG compliance improvements
- **SEO Optimization** - Search engine optimization

</div>

<br>

## Roadmap

<div align="left">

| Phase | Feature | Description | Status |
|-------|---------|-------------|--------|
| **Phase 1** | Core Backend | JWT Auth, MongoDB, Basic AI | ✅ Complete |
| **Phase 2** | Frontend Development | React UI, Map Integration | ✅ Complete |
| **Phase 3** | Real-time Features | Live location sharing, notifications | 🚧 In Progress |
| **Phase 4** | Advanced AI | Predictive safety analytics | 📋 Planned |
| **Phase 5** | Mobile App | React Native application | 📋 Planned |
| **Phase 6** | Multi-language | Internationalization support | 📋 Planned |
| **Phase 7** | Offline Mode | Basic functionality without internet | 📋 Planned |
| **Phase 8** | Community Features | User reviews, safety tips | 📋 Planned |

### Upcoming Features

#### Q1 2025
- **Favorite Contacts CRUD** - Complete contact management
- **Real-time Map Integration** - Interactive maps with Leaflet
- **Push Notifications** - Browser notification system
- **Enhanced AI Chat** - Improved conversation flow

#### Q2 2025
- **Mobile App** - React Native version
- **Offline Support** - Service worker implementation
- **Advanced Analytics** - Detailed safety insights
- **Social Features** - Community safety tips

#### Q3 2025
- **Multi-language Support** - Internationalization
- **Advanced AI Features** - Predictive analytics
- **Integration Testing** - Comprehensive test suite
- **Performance Optimization** - Speed improvements

#### Q4 2025
- **Enterprise Features** - Organization management
- **API Rate Limiting** - Enhanced security
- **Advanced Reporting** - Detailed safety reports
- **Third-party Integrations** - External service connections

</div>

<br>

## Contributors

<div align="center">

🏆 Our Amazing Contributors

<a href="https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App" />
</a>

</div>

<br>

<div align="left">

### Why Contribute?

- **Learn Real-world Skills**: MERN stack + AI integration
- **Showcase Talent**: Build portfolio with modern technologies  
- **Make Impact**: Create something that enhances personal safety
- **Join Community**: Collaborate with developers worldwide
- **Recognition**: Featured in contributors section & certificates

### Get Involved

- **Discussions**: Share ideas in GitHub Discussions
- **Issues**: Report bugs or request features
- **Documentation**: Help improve docs and guides
- **Code Reviews**: Participate in peer reviews

### Contribution Types

#### Code Contributions
- **Bug Fixes** - Fix existing issues
- **Feature Development** - Add new functionality
- **Performance Improvements** - Optimize existing code
- **Refactoring** - Improve code structure

#### Non-Code Contributions
- **Documentation** - Improve guides and README
- **Design** - UI/UX improvements
- **Testing** - Write and improve tests
- **Community** - Help other contributors

#### Recognition Levels
- **Contributor** - First successful contribution
- **Active Contributor** - 5+ contributions
- **Core Contributor** - 10+ contributions with significant impact
- **Maintainer** - Consistent contributions and community leadership

</div>

<br>

---

<div align="center">

## Join Our Community

**Star ⭐ this repo if you find it interesting!**

**Share with friends** who might want to contribute to an impactful open-source project.

<br>

<img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=22&duration=3000&color=22C55E&center=true&vCenter=true&width=500&lines=Let's+build+safety+together;One+commit+at+a+time;+Welcome+Aboard!" alt="Final Message" />

<br>

[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/pulls)
[![Open Source Love](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Friendly-orange?style=for-the-badge)](https://hacktoberfest.com)

![Visitor Count](https://komarev.com/ghpvc/?username=SrinjoyeeDey&label=Profile%20Views&color=green&style=flat)

**Built with ❤️ for the open-source community**  
**Author**: Srinjoyee Dey  
**Contributions welcome from everyone** 🙌

</div>