# API Integration Documentation

This document describes the complete API integration between the frontend React application and the backend Node.js/Express server for the Para Sports Association of Gujarat (PSAG) system.

## Overview

The frontend communicates with the backend through a RESTful API built with Express.js and MongoDB. The integration includes:

- **Player Management**: Registration, search, update, and deletion
- **ID Card Operations**: Generation, search, and download
- **User Authentication**: Login, registration, and profile management
- **Health Monitoring**: System status and API health checks

## API Service Architecture

### 1. Core API Service (`src/services/api.js`)

The main API service provides:

- **Axios Configuration**: Base URL, timeouts, and interceptors
- **Request/Response Interceptors**: Authentication, logging, and error handling
- **Endpoint Organization**: Grouped by functionality (players, idcards, users, health)
- **Utility Functions**: File downloads, error formatting, and token management

#### Key Features:

```javascript
// Request interceptor adds auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor handles errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different HTTP status codes
    switch (error.response?.status) {
      case 401: // Unauthorized
      case 403: // Forbidden
      case 404: // Not Found
      case 500: // Server Error
    }
  }
);
```

### 2. Custom Hooks (`src/hooks/useApi.js`)

React hooks for managing API state:

- **`useApi`**: Basic API calls with loading/error states
- **`usePaginatedApi`**: Paginated data with infinite scroll support
- **`useFormSubmit`**: Form submission with success/error handling
- **`useRealtimeData`**: Real-time data updates with polling

#### Example Usage:

```javascript
const { data, loading, error, execute } = useApi(playerAPI.getAll);
const { submit, loading, success, error } = useFormSubmit(playerAPI.register);
```

## API Endpoints

### Player Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/api/players` | Register new player | FormData with player info + photo |
| `GET` | `/api/players` | Get all players | `page`, `limit`, `search`, `sport`, `disabilityType` |
| `GET` | `/api/players/:id` | Get single player | Player ID |
| `PUT` | `/api/players/:id` | Update player | Player ID + updated data |
| `DELETE` | `/api/players/:id` | Delete player | Player ID |

### ID Card Operations

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/api/idcards/generate` | Generate ID card | Player ID |
| `GET` | `/api/idcards/download/:playerId` | Download ID card | Player ID |
| `POST` | `/api/idcards/send-otp` | Send OTP for verification | Email |
| `POST` | `/api/idcards/search` | Search player for ID card | Player ID + Email |
| `POST` | `/api/idcards/verify-otp` | Verify OTP | Email + OTP |

### User Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/api/users/login` | User login | Email + Password |
| `POST` | `/api/users/register` | User registration | User data |
| `GET` | `/api/users/me` | Get current user | Auth token |
| `PUT` | `/api/users/profile` | Update profile | Updated user data |
| `POST` | `/api/users/logout` | User logout | Auth token |

### Health & System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | API health check |
| `GET` | `/api/test` | Test endpoint |

## Frontend Components

### 1. Player Registration (`src/pages/PlayerRegistration.jsx`)

- **Form Handling**: React Hook Form with validation
- **File Upload**: Profile photo upload with preview
- **API Integration**: Uses `useFormSubmit` hook
- **Error Handling**: Toast notifications for success/error
- **Navigation**: Redirects to success page after registration

### 2. Player Management (`src/pages/PlayerManagement.jsx`)

- **Data Display**: Paginated table with search and filters
- **CRUD Operations**: View, edit, delete players
- **Search & Filter**: By name, sport, disability type
- **ID Card Download**: Direct download functionality
- **Real-time Updates**: Automatic refresh after operations

### 3. ID Card Search (`src/pages/IdCardSearch.jsx`)

- **Security**: OTP-based verification system
- **Search**: Player ID + email combination
- **Download**: Secure PDF download
- **User Experience**: Step-by-step verification process

### 4. Dashboard (`src/pages/Dashboard.jsx`)

- **System Monitoring**: API health and status
- **Statistics**: Player counts and system metrics
- **Quick Actions**: Direct links to key features
- **Real-time Data**: Live system status updates

## Data Flow

### 1. Player Registration Flow

```
User Input → Form Validation → API Call → Backend Processing → 
ID Card Generation → Email Notification → Success Response → UI Update
```

### 2. ID Card Search Flow

```
User Search → Player Verification → OTP Generation → Email Send → 
OTP Verification → ID Card Download → File Delivery
```

### 3. Player Management Flow

```
Data Fetch → Pagination → Search/Filter → CRUD Operations → 
Real-time Updates → UI Refresh
```

## Error Handling

### Global Error Handling

- **HTTP Status Codes**: 401, 403, 404, 422, 500
- **Network Errors**: Connection issues and timeouts
- **Validation Errors**: Form validation and API validation
- **User Feedback**: Toast notifications and error messages

### Error Recovery

- **Retry Logic**: Automatic retry for failed requests
- **Fallback UI**: Graceful degradation for errors
- **User Guidance**: Clear error messages and next steps

## Security Features

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Token Storage**: Local storage with automatic cleanup
- **Token Refresh**: Automatic token renewal
- **Session Management**: Proper logout and session cleanup

### Data Protection

- **HTTPS**: Secure communication (in production)
- **Input Validation**: Client and server-side validation
- **File Upload Security**: File type and size restrictions
- **OTP Verification**: Two-factor authentication for sensitive operations

## Performance Optimization

### Frontend Optimizations

- **Lazy Loading**: Code splitting for better performance
- **Caching**: API response caching where appropriate
- **Debouncing**: Search input debouncing
- **Pagination**: Efficient data loading

### Backend Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Compression**: Gzip compression for responses
- **Rate Limiting**: API rate limiting for security
- **Caching**: Response caching for static data

## Development Setup

### Environment Variables

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api

# Backend (.env)
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
```

### Proxy Configuration

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
```

### Running the Application

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Testing

### API Testing

- **Health Check**: `/api/health` endpoint
- **Player Registration**: Complete registration flow
- **ID Card Operations**: Search and download functionality
- **Error Scenarios**: Invalid data and network errors

### Frontend Testing

- **Component Testing**: Individual component functionality
- **Integration Testing**: API integration flows
- **User Experience**: Form submissions and navigation
- **Error Handling**: Error scenarios and recovery

## Deployment

### Production Configuration

- **Environment Variables**: Production API URLs
- **HTTPS**: Secure communication
- **CORS**: Proper cross-origin configuration
- **Monitoring**: Health checks and logging

### Build Process

```bash
# Frontend build
npm run build

# Backend deployment
npm run start:prod
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Issues**: Verify token storage and refresh
3. **File Upload Problems**: Check file size and type restrictions
4. **Database Connection**: Verify MongoDB connection string

### Debug Tools

- **Browser DevTools**: Network tab for API calls
- **Console Logging**: API request/response logging
- **Health Endpoints**: System status monitoring
- **Error Tracking**: Comprehensive error logging

## Future Enhancements

### Planned Features

- **Real-time Notifications**: WebSocket integration
- **Advanced Search**: Elasticsearch integration
- **Bulk Operations**: Batch player management
- **Analytics Dashboard**: Advanced reporting
- **Mobile App**: React Native application

### Performance Improvements

- **Service Workers**: Offline functionality
- **CDN Integration**: Static asset optimization
- **Database Optimization**: Advanced indexing strategies
- **Caching Strategy**: Redis integration

## Support

For technical support or questions about the API integration:

- **Email**: psaofgujarat@gmail.com
- **Documentation**: This file and inline code comments
- **Code Repository**: Full source code with examples
- **Issue Tracking**: GitHub issues for bug reports

---

*This documentation is maintained by the PSAG development team and should be updated as the system evolves.* 