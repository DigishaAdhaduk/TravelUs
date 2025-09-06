# TravelUs Frontend - API Integration Guide

## 🔌 Connecting to Your Spring Boot Backend

### 1. Environment Setup

1. **Create `.env` file** in your project root:

```bash
cp .env.example .env
```

2. **Update API URL** in `.env`:

```bash
# For local development
REACT_APP_API_URL=http://localhost:8080/api

# For production
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### 2. Backend API Endpoints Expected

Your Spring Boot backend should have these endpoints:

#### Authentication Endpoints

```
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/google (optional)
```

#### User Endpoints

```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/stats
```

#### Group Endpoints

```
GET /api/groups
POST /api/groups
GET /api/groups/{id}
PUT /api/groups/{id}
DELETE /api/groups/{id}
POST /api/groups/join/{inviteCode}
POST /api/groups/{id}/leave
GET /api/groups/{id}/members
POST /api/groups/{id}/members
DELETE /api/groups/{id}/members/{userId}
POST /api/groups/{id}/invite/generate
```

#### Expense Endpoints

```
GET /api/groups/{id}/expenses
POST /api/groups/{id}/expenses
PUT /api/groups/{id}/expenses/{expenseId}
DELETE /api/groups/{id}/expenses/{expenseId}
GET /api/groups/{id}/expenses/balances
POST /api/groups/{id}/expenses/settle
```

#### Chat Endpoints

```
GET /api/groups/{id}/chat/messages
POST /api/groups/{id}/chat/messages
DELETE /api/groups/{id}/chat/messages/{messageId}
```

#### Document Endpoints

```
GET /api/groups/{id}/documents
POST /api/groups/{id}/documents
GET /api/groups/{id}/documents/{docId}/download
DELETE /api/groups/{id}/documents/{docId}
```

#### Dashboard Endpoint

```
GET /api/dashboard
```

### 3. Required Response Formats

#### Login/Signup Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "name": "Full Name",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Group Response

```json
{
  "id": "group_id",
  "name": "Group Name",
  "description": "Description",
  "destination": "Location",
  "startDate": "2024-01-01",
  "endDate": "2024-01-07",
  "budget": 1000.0,
  "inviteCode": "ABC123",
  "createdBy": "user_id",
  "createdAt": "2024-01-01T00:00:00Z",
  "members": [
    {
      "id": "member_id",
      "userId": "user_id",
      "groupId": "group_id",
      "user": {
        /* user object */
      },
      "role": "ADMIN",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalExpenses": 500.0
}
```

#### Dashboard Response

```json
{
  "stats": {
    "totalGroups": 3,
    "activeTrips": 2,
    "totalExpenses": 1250.5,
    "balance": -45.25
  },
  "recentGroups": [
    {
      "id": "group_id",
      "name": "Group Name",
      "members": 4,
      "totalExpenses": 850.0,
      "status": "active"
    }
  ],
  "recentActivity": [
    {
      "id": "activity_id",
      "type": "EXPENSE_ADDED",
      "message": "John added $45 for dinner",
      "groupId": "group_id",
      "groupName": "Group Name",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 4. CORS Configuration

Make sure your Spring Boot backend has CORS configured:

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 5. JWT Token Handling

The frontend automatically:

- Stores JWT token in localStorage
- Adds `Authorization: Bearer {token}` header to all requests
- Redirects to login on 401 responses
- Clears token on logout

### 6. Error Handling

All API errors are handled with:

- Loading states during requests
- Error messages displayed to users
- Automatic retry mechanisms where appropriate
- Token refresh on 401 errors

### 7. Development vs Production

#### Development:

```bash
npm run dev
# Backend should run on http://localhost:8080
```

#### Production Deployment:

1. **Build the frontend:**

```bash
npm run build
```

2. **Deploy to hosting platform** (Vercel, Netlify, AWS S3, etc.)

3. **Update environment variables** in your hosting platform:

```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### 8. Testing the Integration

1. **Start your Spring Boot backend** on port 8080
2. **Start the React frontend:**

```bash
npm run dev
```

3. **Test the flow:**
   - Register a new account
   - Login with credentials
   - Create a group
   - Add expenses
   - Invite members

### 9. Common Issues & Solutions

#### Issue: CORS errors

**Solution:** Configure CORS in Spring Boot backend

#### Issue: 401 Unauthorized

**Solution:** Check JWT token generation and validation

#### Issue: API not found (404)

**Solution:** Verify backend URL and endpoint paths

#### Issue: Network errors

**Solution:** Check if backend is running and accessible

### 10. Next Steps

After connecting to your backend:

1. Test all features thoroughly
2. Add error monitoring (Sentry, LogRocket)
3. Add analytics (Google Analytics, Mixpanel)
4. Implement push notifications
5. Add offline support with service workers

## 🚀 Ready to Connect!

Your frontend is now fully prepared to work with your Spring Boot backend. Just update the `.env` file with your backend URL and start testing!
