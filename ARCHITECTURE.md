# Ek-Prayas Website Architecture

```mermaid
graph TB
    subgraph "Frontend - React"
        A[User Browser] --> B[React App]
        B --> C[Home Page]
        B --> D[About Page]
        B --> E[Initiatives Page]
        B --> F[Events Page]
        B --> G[Team Page]
        B --> H[Gallery Page]
        B --> I[Contact Page]
        
        B --> J[Navbar Component]
        B --> K[Footer Component]
        
        B --> L[API Service Layer]
    end
    
    subgraph "Backend - Express.js"
        L -->|HTTP Requests| M[Express Server]
        
        M --> N[Routes]
        N --> O[Initiative Routes]
        N --> P[Event Routes]
        N --> Q[Team Routes]
        N --> R[Gallery Routes]
        N --> S[Contact Routes]
        N --> T[Auth Routes]
        
        O --> U[Initiative Controller]
        P --> V[Event Controller]
        
        M --> W[Middleware]
        W --> X[Auth Middleware]
        W --> Y[Validation]
    end
    
    subgraph "Database - MongoDB"
        U -->|CRUD| Z[Initiative Model]
        V -->|CRUD| AA[Event Model]
        Q -->|CRUD| AB[Team Model]
        R -->|CRUD| AC[Gallery Model]
        S -->|CRUD| AD[Contact Model]
        T -->|CRUD| AE[Admin Model]
        
        Z --> AF[(MongoDB Database)]
        AA --> AF
        AB --> AF
        AC --> AF
        AD --> AF
        AE --> AF
    end
    
    subgraph "External Services"
        S -->|Email| AG[Nodemailer/SMTP]
    end
    
    style A fill:#E3F2FD
    style B fill:#00BFA5
    style M fill:#FFD600
    style AF fill:#FF5252
    style AG fill:#9C27B0
```

## Data Flow

### 1. User Request Flow
```
User Browser → React Component → API Service → Express Route → Controller → MongoDB
                     ↑                                                            ↓
                     ←────────────────────── Response ──────────────────────────┘
```

### 2. Authentication Flow
```
Login Form → POST /api/auth/login → Verify Credentials → Generate JWT → Store Token
                                                              ↓
Admin Actions → Include JWT in Headers → Verify Token → Allow/Deny
```

### 3. Contact Form Flow
```
Contact Form → POST /api/contact → Save to DB → Send Email → Response
```

## Technology Stack

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Forms**: Formik + Yup
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

### Database Schema

```
Initiatives
├── title
├── slug
├── description
├── shortDescription
├── category
├── image
├── impact { beneficiaries, volunteers, duration }
└── isActive

Events
├── title
├── slug
├── description
├── date
├── location
├── category
├── status
├── attendees
└── organizers (ref: Team)

Team
├── name
├── role
├── designation
├── department
├── bio
├── image
└── social links

Admin
├── username
├── email
├── password (hashed)
├── role
└── isActive
```

## API Endpoints Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/initiatives | Public | Get all initiatives |
| GET | /api/initiatives/:slug | Public | Get single initiative |
| POST | /api/initiatives | Admin | Create initiative |
| PUT | /api/initiatives/:id | Admin | Update initiative |
| DELETE | /api/initiatives/:id | Super Admin | Delete initiative |
| GET | /api/events | Public | Get all events |
| GET | /api/events/:slug | Public | Get single event |
| POST | /api/events | Admin | Create event |
| GET | /api/team | Public | Get team members |
| GET | /api/gallery | Public | Get gallery images |
| POST | /api/contact | Public | Submit contact form |
| POST | /api/newsletter | Public | Subscribe newsletter |
| POST | /api/auth/login | Public | Admin login |

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ekprayas
JWT_SECRET=your_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Ek-Prayas
```

## Deployment Architecture

```mermaid
graph LR
    A[Users] --> B[Netlify/Vercel<br/>Frontend]
    B --> C[Render/Railway<br/>Backend API]
    C --> D[MongoDB Atlas<br/>Database]
    C --> E[SMTP Server<br/>Email Service]
    
    style B fill:#00BFA5
    style C fill:#FFD600
    style D fill:#FF5252
    style E fill:#9C27B0
```

---

This architecture ensures:
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
- ✅ Easy deployment
