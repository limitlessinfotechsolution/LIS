# 📚 API Documentation - Limitless Infotech Platform

## Overview
Complete API reference for the Limitless Infotech platform.

**Base URL**: `https://limitlessinfotech.com/api`  
**Version**: 7.0.0  
**Authentication**: JWT Bearer Token

---

## 🔐 Authentication

### Login
```http
POST /api/admin/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@limitlessinfotech.com"
  }
}
```

### Using Authentication
Include the JWT token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📧 Contact API

### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I need a website for my business"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for contacting us!",
  "inquiryId": 123
}
```

**Rate Limit**: 5 requests per 15 minutes per IP

---

## 📰 Newsletter API

### Subscribe
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

### Unsubscribe
```http
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

---

## 📝 Blog API

### Get All Posts
```http
GET /api/blog/posts?page=1&limit=10&category=technology
```

**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "id": "1",
      "slug": "ai-revolution-2024",
      "title": "The AI Revolution in 2024",
      "excerpt": "How AI is transforming businesses...",
      "content": "Full article content...",
      "author": "Limitless Team",
      "date": "2024-01-15",
      "category": "Technology",
      "tags": ["AI", "Technology", "Innovation"],
      "image": "/blog/ai-revolution.jpg",
      "readTime": "5 min read"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Get Single Post
```http
GET /api/blog/posts/ai-revolution-2024
```

---

## 🔒 Admin API (Requires Authentication)

### Get Dashboard Stats
```http
GET /api/admin/dashboard/stats
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "stats": {
    "totalInquiries": 150,
    "newInquiries": 12,
    "totalSubscribers": 500,
    "newSubscribers": 25,
    "totalPosts": 50,
    "publishedPosts": 45
  }
}
```

### Manage Inquiries

#### Get All Inquiries
```http
GET /api/admin/inquiries?status=pending&page=1&limit=20
Authorization: Bearer {token}
```

#### Update Inquiry Status
```http
PATCH /api/admin/inquiries/123
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "resolved",
  "notes": "Issue resolved via email"
}
```

#### Delete Inquiry
```http
DELETE /api/admin/inquiries/123
Authorization: Bearer {token}
```

### Manage Blog Posts

#### Create Post
```http
POST /api/admin/blog/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "content": "Post content...",
  "excerpt": "Brief description...",
  "category": "Technology",
  "tags": ["Tech", "Innovation"],
  "status": "published",
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

#### Update Post
```http
PUT /api/admin/blog/posts/123
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /api/admin/blog/posts/123
Authorization: Bearer {token}
```

### Manage Newsletter

#### Get Subscribers
```http
GET /api/admin/newsletter/subscribers?page=1&limit=50
Authorization: Bearer {token}
```

#### Export Subscribers
```http
GET /api/admin/newsletter/export?format=csv
Authorization: Bearer {token}
```

**Response**: CSV file download

---

## 📊 Analytics API

### Get Analytics Data
```http
GET /api/admin/analytics?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pageViews": 10000,
    "uniqueVisitors": 5000,
    "bounceRate": 45.5,
    "avgSessionDuration": 180,
    "topPages": [
      { "path": "/", "views": 2000 },
      { "path": "/services", "views": 1500 }
    ],
    "topReferrers": [
      { "source": "google", "visits": 3000 },
      { "source": "direct", "visits": 2000 }
    ]
  }
}
```

---

## 🏥 Health Check

### System Health
```http
GET /api/health
```

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 86400,
  "database": "connected",
  "cache": "operational",
  "services": {
    "email": "operational",
    "storage": "operational"
  }
}
```

---

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🚦 Rate Limiting

### Limits
- **Public API**: 100 requests per 15 minutes
- **Admin API**: 30 requests per minute
- **Contact Form**: 5 submissions per 15 minutes

### Headers
```http
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 95
X-Rate-Limit-Reset: 1642248000
```

### Rate Limit Exceeded
```json
{
  "error": "Too many requests",
  "message": "Please try again later",
  "retryAfter": 60
}
```

---

## 🔒 Security

### HTTPS Only
All API requests must use HTTPS.

### CORS
Allowed origins:
- `https://limitlessinfotech.com`
- `https://www.limitlessinfotech.com`

### Input Validation
All inputs are validated and sanitized.

### SQL Injection Protection
Parameterized queries used throughout.

### XSS Protection
All outputs are escaped.

---

## 📝 Request Examples

### cURL
```bash
# Contact form submission
curl -X POST https://limitlessinfotech.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'

# Admin login
curl -X POST https://limitlessinfotech.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'

# Get inquiries (authenticated)
curl -X GET https://limitlessinfotech.com/api/admin/inquiries \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### JavaScript (Fetch)
```javascript
// Contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})

const data = await response.json()

// Admin API with auth
const response = await fetch('/api/admin/inquiries', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Python
```python
import requests

# Contact form
response = requests.post(
    'https://limitlessinfotech.com/api/contact',
    json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Hello!'
    }
)

# Admin API
headers = {'Authorization': f'Bearer {token}'}
response = requests.get(
    'https://limitlessinfotech.com/api/admin/inquiries',
    headers=headers
)
```

---

## 🔄 Webhooks (Coming Soon)

Subscribe to events:
- `inquiry.created`
- `inquiry.updated`
- `subscriber.added`
- `post.published`

---

## 📞 Support

- **Email**: Info@limitlessinfotech.com
- **Phone**: +91 7710909492
- **Documentation**: https://limitlessinfotech.com/docs

---

**Version**: 7.0.0  
**Last Updated**: November 28, 2025  
**Status**: Production ✅
