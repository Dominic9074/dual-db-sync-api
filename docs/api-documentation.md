# API Documentation

## Base URL

```text
http://localhost:5000
```

---

# Authentication

## Login

### POST `/auth/login`

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

### Failure Response

**401 Unauthorized**

```json
{
  "message": "Invalid email or password"
}
```

---

# Users

## Create User

### POST `/users`

Creates a new user.

Authentication is not required.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

**201 Created**

```json
{
  "message": "User created successfully",
  "user": {}
}
```

### Validation Failure

**400 Bad Request**

```json
{
  "message": "Validation failed",
  "errors": []
}
```

---

## Get User

### GET `/users/:id`

Returns a user by ID.

Authentication is required.

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

**200 OK**

```json
{
  "user": {}
}
```

### Authentication Failure

**401 Unauthorized**

```json
{
  "message": "Authentication token required"
}
```

### Authorization Failure

**403 Forbidden**

A normal user cannot access another user's resource.

```json
{
  "message": "You are not allowed to access this resource"
}
```

### User Not Found

**404 Not Found**

```json
{
  "message": "User not found"
}
```

---

## Update User

### PUT `/users/:id`

Updates a user's information.

Authentication and owner/admin authorization are required.

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

Both fields are optional.

### Success Response

**200 OK**

```json
{
  "message": "User updated successfully",
  "user": {}
}
```

### Validation Failure

**400 Bad Request**

```json
{
  "message": "Validation failed",
  "errors": []
}
```

### Authorization Failure

**403 Forbidden**

```json
{
  "message": "You are not allowed to access this resource"
}
```

### User Not Found

**404 Not Found**

```json
{
  "message": "User not found"
}
```

---

## Delete User

### DELETE `/users/:id`

Deletes a user.

Authentication and owner/admin authorization are required.

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

**200 OK**

```json
{
  "message": "User deleted successfully"
}
```

### Authorization Failure

**403 Forbidden**

```json
{
  "message": "You are not allowed to access this resource"
}
```

### User Not Found

**404 Not Found**

```json
{
  "message": "User not found"
}
```

---

# Authorization Rules

| Endpoint | Authentication | Authorization |
|---|---|---|
| `POST /users` | Not required | Public |
| `POST /auth/login` | Not required | Public |
| `GET /users/:id` | Required | Owner or Admin |
| `PUT /users/:id` | Required | Owner or Admin |
| `DELETE /users/:id` | Required | Owner or Admin |

---

# Authentication Header

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

The JWT contains:

```text
userId
role
```

Supported roles:

```text
user
admin
```

---

# Validation Rules

## Create User

- `email` must be a valid email address.
- `password` must contain at least 6 characters.

## Update User

- `email` must be a valid email address if provided.
- `password` must contain at least 6 characters if provided.

---

# Database Synchronization

User changes are synchronized asynchronously from MongoDB to MySQL using RabbitMQ.

```text
MongoDB
   ↓
RabbitMQ
   ↓
User Sync Consumer
   ↓
MySQL
```

Events:

```text
user.created
user.updated
user.deleted
```