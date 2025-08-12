# API Service Documentation

## Overview

This project now uses a centralized API service system that manages all API calls through a single service class. The base URL is configured through environment variables.

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://backend.dubai-golden-recedency.com/api
```

## API Service Usage

### Import the Service

```javascript
import api, { API_ENDPOINTS } from "../services/api.js";
```

### Available Methods

#### GET Request

```javascript
const data = await api.get(API_ENDPOINTS.VISA_REQUESTS);
```

#### POST Request

```javascript
const data = await api.post(API_ENDPOINTS.LOGIN, {
  email: "user@example.com",
  password: "password",
});
```

#### File Upload

```javascript
const formData = new FormData();
formData.append("file", fileObject);
const result = await api.upload(API_ENDPOINTS.VISA_REQUESTS, formData);
```

#### PUT Request

```javascript
const data = await api.put(API_ENDPOINTS.VISA_REQUEST(id), {
  name: "Updated Name",
});
```

#### DELETE Request

```javascript
await api.delete(API_ENDPOINTS.VISA_REQUEST(id));
```

## Available Endpoints

### Authentication

- `API_ENDPOINTS.LOGIN` - User login
- `API_ENDPOINTS.LOGOUT` - User logout
- `API_ENDPOINTS.USER` - Get user data

### Visa Applications

- `API_ENDPOINTS.VISA_REQUESTS` - Get all visa requests
- `API_ENDPOINTS.VISA_REQUEST(id)` - Get specific visa request

### File Storage

- `API_ENDPOINTS.STORAGE_BASE` - Base URL for file storage

## Features

### Automatic Authentication

- Automatically includes Bearer token in requests
- Handles 401 responses by redirecting to login
- Manages token storage in localStorage

### Error Handling

- Centralized error handling
- Automatic logout on authentication failure
- Console logging for debugging

### File Upload Support

- Specialized method for FormData uploads
- Maintains authentication headers
- Proper error handling for uploads

## Example Usage in Components

### Login Component

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await api.post(API_ENDPOINTS.LOGIN, {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("adminToken", data.token);
    navigate("/dashboard");
  } catch (error) {
    toast.error("Login failed");
  }
};
```

### Dashboard Component

```javascript
const fetchApplications = async () => {
  try {
    const data = await api.get(API_ENDPOINTS.VISA_REQUESTS);
    setApplications(data.data || data);
  } catch (error) {
    toast.error("Failed to load applications");
  }
};
```

## Benefits

1. **Centralized Configuration** - All API URLs in one place
2. **Environment-based** - Easy to switch between development/production
3. **Automatic Auth** - No need to manually add tokens
4. **Error Handling** - Consistent error handling across the app
5. **Type Safety** - Predefined endpoints prevent typos
6. **Maintainability** - Easy to update API logic in one place
