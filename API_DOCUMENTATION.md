# 📡 API Documentation - Ek-Prayas Backend

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📚 Initiatives API

### Get All Initiatives
```http
GET /api/initiatives
```

**Query Parameters:**
- `category` (optional): Filter by category (education, elderly-care, health, environment)
- `status` (optional): Filter by status (active, completed, upcoming)
- `featured` (optional): Filter featured initiatives (true/false)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "title": "Kitabi Uddan",
      "description": "Book distribution program",
      "category": "education",
      "image": "/uploads/...",
      "status": "active",
      "featured": true,
      "impact": {
        "studentsHelped": 500,
        "booksDistributed": 1000
      }
    }
  ]
}
```

### Get Single Initiative
```http
GET /api/initiatives/:id
```

### Get Featured Initiatives
```http
GET /api/initiatives/featured
```

### Create Initiative (Protected)
```http
POST /api/initiatives
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
```json
{
  "title": "New Initiative",
  "description": "Description here",
  "category": "education",
  "shortDescription": "Short desc",
  "featured": true,
  "status": "active",
  "image": <file>
}
```

### Update Initiative (Protected)
```http
PUT /api/initiatives/:id
Authorization: Bearer <token>
```

### Delete Initiative (Protected)
```http
DELETE /api/initiatives/:id
Authorization: Bearer <token>
```

---

## 📅 Events API

### Get All Events
```http
GET /api/events
```

**Query Parameters:**
- `category` (optional)
- `status` (optional)

### Get Upcoming Events
```http
GET /api/events/upcoming
```

### Get Past Events
```http
GET /api/events/past
```

### Get Single Event
```http
GET /api/events/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Blood Donation Camp",
    "description": "Annual blood donation drive",
    "date": "2024-12-15T00:00:00.000Z",
    "time": "10:00 AM",
    "location": {
      "venue": "College Auditorium",
      "address": "Main Campus",
      "city": "City Name"
    },
    "category": "health",
    "status": "upcoming",
    "attendees": {
      "expected": 100,
      "registered": 45,
      "attended": 0
    }
  }
}
```

### Create Event (Protected)
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Update Event (Protected)
```http
PUT /api/events/:id
Authorization: Bearer <token>
```

### Delete Event (Protected)
```http
DELETE /api/events/:id
Authorization: Bearer <token>
```

---

## 👥 Team API

### Get All Team Members
```http
GET /api/team
```

**Query Parameters:**
- `role` (optional): Filter by role
- `active` (optional): Filter active members (true/false)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "role": "president",
      "department": "Computer Science",
      "year": "3rd",
      "bio": "Passionate about social service",
      "image": "/uploads/...",
      "email": "john@example.com",
      "socialLinks": {
        "linkedin": "...",
        "instagram": "..."
      },
      "active": true
    }
  ]
}
```

### Get Single Team Member
```http
GET /api/team/:id
```

### Create Team Member (Protected)
```http
POST /api/team
Authorization: Bearer <token>
```

### Update Team Member (Protected)
```http
PUT /api/team/:id
Authorization: Bearer <token>
```

### Delete Team Member (Protected)
```http
DELETE /api/team/:id
Authorization: Bearer <token>
```

---

## 🙋 Volunteers API

### Register as Volunteer (Public)
```http
POST /api/volunteers/register
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "college": "XYZ College",
  "department": "Engineering",
  "year": "2nd",
  "interests": ["education", "health"],
  "availability": "weekends",
  "whyJoin": "I want to make a difference..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for registering! We will contact you soon.",
  "data": {
    "_id": "...",
    "name": "Jane Smith",
    "status": "pending"
  }
}
```

### Get All Volunteers (Protected)
```http
GET /api/volunteers
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): pending, approved, rejected

### Update Volunteer Status (Protected)
```http
PUT /api/volunteers/:id/status
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "status": "approved"
}
```

---

## 📧 Contact API

### Submit Contact Form (Public)
```http
POST /api/contact
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Alice Brown",
  "email": "alice@example.com",
  "phone": "9876543210",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss...",
  "category": "partnership"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "_id": "...",
    "status": "new"
  }
}
```

### Get All Contacts (Protected)
```http
GET /api/contact
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): new, read, replied, archived
- `category` (optional): general, volunteer, partnership, donation, feedback

### Update Contact Status (Protected)
```http
PUT /api/contact/:id/status
Authorization: Bearer <token>
```

---

## 🔐 Authentication API

### Admin Login
```http
POST /api/auth/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "admin@ekprayas.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "...",
    "name": "Admin",
    "email": "admin@ekprayas.com",
    "role": "super-admin"
  }
}
```

### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Password (Protected)
```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## 🖼️ Gallery API

### Get All Images
```http
GET /api/gallery
```

### Upload Images (Protected)
```http
POST /api/gallery
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
```
images: <file[]>  // Max 10 files
captions: <string[]>  // Optional captions array
```

### Delete Image (Protected)
```http
DELETE /api/gallery/:id
Authorization: Bearer <token>
```

---

## ❗ Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Data Validation Rules

### Volunteer Registration
- `name`: Required, string
- `email`: Required, valid email format
- `phone`: Required, 10 digits
- `interests`: Array of valid categories
- `availability`: One of: weekdays, weekends, both, flexible

### Contact Form
- `name`: Required, string
- `email`: Required, valid email
- `subject`: Required, max 100 chars
- `message`: Required, max 1000 chars
- `category`: One of: general, volunteer, partnership, donation, feedback, other

### Initiative
- `title`: Required, max 100 chars
- `description`: Required, max 2000 chars
- `category`: Required, one of: education, elderly-care, health, environment, other
- `status`: One of: active, completed, upcoming

---

## 🔒 Authorization Levels

### Public Routes
- GET all initiatives, events, team
- POST volunteer registration
- POST contact form

### Admin Routes (require authentication)
- All POST, PUT, DELETE operations
- GET sensitive data (volunteers, contacts)
- Update statuses

### Super Admin Routes
- All admin capabilities
- Delete sensitive records
- Manage other admins (future feature)

---

## 🧪 Testing with cURL

### Example: Get all initiatives
```bash
curl http://localhost:5000/api/initiatives
```

### Example: Register volunteer
```bash
curl -X POST http://localhost:5000/api/volunteers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "interests": ["education"]
  }'
```

### Example: Login as admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ekprayas.com",
    "password": "admin123"
  }'
```

### Example: Create initiative (with auth)
```bash
curl -X POST http://localhost:5000/api/initiatives \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "title=New Initiative" \
  -F "description=Description here" \
  -F "category=education" \
  -F "image=@/path/to/image.jpg"
```

---

## 📊 Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- Express rate limit middleware
- Redis for distributed rate limiting
- Different limits for authenticated vs anonymous users

---

## 🔄 API Versioning

Current version: v1 (implicit in base URL)
Future versions will use: `/api/v2/...`

---

**Need more details?** Check the controller files in `backend/controllers/`
