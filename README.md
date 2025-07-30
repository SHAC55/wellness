# 🧘‍♂️ Wellness Session Management API

A full-stack MERN-based application to manage and publish wellness sessions with support for drafts, publishing, and user-specific session views.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: JWT-based Auth  
- **Tools**: Axios, React Hook Form, Mongoose

---

## 📂 API Routes Overview

### Session Routes:

| Method | Endpoint                         | Auth Required | Description                                   |
|--------|----------------------------------|---------------|-----------------------------------------------|
| GET    | `/api/session/sessions`          | ❌ No         | Get all **published** sessions                |
| GET    | `/api/session/my-sessions`       | ✅ Yes        | Get all **sessions created by the user**      |
| GET    | `/api/session/my-sessions/:id`   | ✅ Yes        | Get a **single session by ID (owned only)**   |
| POST   | `/api/session/post`              | ✅ Yes        | **Create** a new session (draft or published) |
| POST   | `/api/session/my-sessions/draft` | ✅ Yes        | Save a **new draft** or **update an existing** draft |
| POST   | `/api/session/my-sessions/publish` | ✅ Yes      | Publish a draft session by `sessionId`        |

### Auth Routes:

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login with credentials |

**.env example

# MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/wellnessDB

# JWT Secret Key
JWT_SECRET=my_jwt_secret_key

# OPort for backend server
PORT=5000


## 📘 API Details

### 🔹 `POST /api/session/post`

- **Description**: Create a new session (`draft` or `published`)
- **Auth**: ✅ Yes (JWT)

**Headers**:
```http
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Deep Breathing Techniques",
  "description": "Learn and practice breathing patterns for stress relief.",
  "tags": ["breathing", "stress"],
  "status": "published"
}
{
  "success": true,
  "session": {
    "_id": "123abc",
    "title": "Deep Breathing Techniques",
    "status": "published"
  }
}
 POST /api/session/my-sessions/draft
Description: Save a draft or update one

Body:

json
Copy
Edit
{
  "sessionId": "optional_if_editing",
  "title": "Draft Title",
  "description": "This is a draft session",
  "tags": ["test", "draft"],
  "json_file_url": "https://example.com/data.json"
}
🔹 POST /api/session/my-sessions/publish
Description: Publish a draft session

Body:

json
Copy
Edit
{
  "sessionId": "6889fb4e0b67987b38c05227"
}
Success:

json
Copy
Edit
{
  "success": true,
  "session": {
    "_id": "6889fb4e0b67987b38c05227",
    "status": "published"
  }
}
🔹 GET /api/session/sessions
Description: Get all published sessions

Auth: ❌ No

🔹 GET /api/session/my-sessions
Description: Get all user-created sessions

Auth: ✅ Yes

🔹 GET /api/session/my-sessions/:id
Description: Get a session by ID (if you own it)

Auth: ✅ Yes

