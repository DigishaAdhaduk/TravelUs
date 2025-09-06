# TravelUs Frontend - Complete Setup Guide

## 📁 Project Structure

```
travelus-frontend/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (shadcn/ui)
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── forms/           # Form components
│   │   ├── cards/           # Card components
│   │   └── common/          # Common components
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useAsync.ts
│   ├── lib/                 # Utility libraries
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── groups/          # Group-related pages
│   │   │   ├── GroupList.tsx
│   │   │   ├── GroupDetails.tsx
│   │   │   ├── CreateGroup.tsx
│   │   │   └── JoinGroup.tsx
│   │   └── expenses/        # Expense-related pages
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── .env                     # Environment variables (create this)
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md
```

## 🚀 Quick Setup

### 1. Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Your Spring Boot backend running

### 2. Installation

```bash
# Clone or download the project
cd travelus-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env file with your settings
VITE_API_URL=http://localhost:8080/api
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

## 🔧 Backend Integration

### Required Spring Boot Endpoints

Your backend should implement these RESTful endpoints:

#### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
```

#### Users

```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/avatar
GET    /api/users/search?q={query}
```

#### Groups

```
GET    /api/groups
POST   /api/groups
GET    /api/groups/{id}
PUT    /api/groups/{id}
DELETE /api/groups/{id}
POST   /api/groups/join/{inviteCode}
POST   /api/groups/{id}/leave
GET    /api/groups/{id}/members
POST   /api/groups/{id}/members
DELETE /api/groups/{id}/members/{userId}
POST   /api/groups/{id}/invite-code/regenerate
```

#### Expenses

```
GET    /api/groups/{id}/expenses
POST   /api/groups/{id}/expenses
PUT    /api/groups/{id}/expenses/{expenseId}
DELETE /api/groups/{id}/expenses/{expenseId}
GET    /api/groups/{id}/balances
POST   /api/groups/{id}/settlements
```

#### Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/activity
```

### Sample API Responses

#### Login Response

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "avatar": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token_here"
}
```

#### Group Response

```json
{
  "id": "uuid",
  "name": "Bali Adventure",
  "description": "Amazing trip to Bali",
  "destination": "Bali, Indonesia",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10",
  "budget": 2000.00,
  "currency": "USD",
  "inviteCode": "ABC123",
  "coverImage": "https://...",
  "createdBy": "uuid",
  "createdAt": "2024-01-01T00:00:00Z",
  "members": [...],
  "totalExpenses": 1250.50,
  "memberCount": 4
}
```

## 🎨 Design System

### Colors

- **Primary**: Travel Blue (#192166)
- **Secondary**: Travel Purple (#2D1B69)
- **Accent**: Travel Indigo (#4338ca)
- **Success**: Green variants
- **Error**: Red variants
- **Warning**: Yellow variants

### Typography

- **Display Font**: Lexend (headings)
- **Body Font**: Inter (body text)

### Components

- Modern glass-morphism effects
- Smooth animations with Framer Motion
- Responsive design patterns
- Accessible UI components

## 🔒 Security Features

### Frontend Security

- JWT token management
- Automatic token refresh
- Protected routes
- XSS protection
- Input validation

### Backend Requirements

- CORS configuration
- JWT authentication
- Input sanitization
- Rate limiting
- HTTPS in production

## 📱 Features Overview

### ✅ Implemented Features

- **Authentication**: Login/Register with JWT
- **Dashboard**: Stats and recent activity
- **Groups**: Create, join, manage groups
- **Expenses**: Add, edit, delete expenses
- **Balances**: Real-time balance calculations
- **Members**: Invite and manage members
- **Responsive**: Mobile-first design

### 🚧 Extensible Features

- **Chat**: Real-time group messaging
- **Itineraries**: Trip planning
- **Documents**: File sharing
- **Notifications**: Push notifications
- **Maps**: Location integration
- **Bookings**: Travel bookings

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-api-domain.com/api
```

### Deploy to Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: VITE_API_URL
```

### Deploy to AWS S3 + CloudFront

```bash
# Build the project
npm run build

# Upload dist/ folder to S3 bucket
# Configure CloudFront distribution
# Set up Route 53 for custom domain
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

## 📊 Performance Optimization

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Use `npm run build` to analyze

## 🔧 Troubleshooting

### Common Issues

#### CORS Errors

```java
// Add to your Spring Boot application
@CrossOrigin(origins = "http://localhost:5173")
```

#### 401 Unauthorized

- Check JWT token format
- Verify token expiration
- Ensure proper Authorization header

#### Network Errors

- Verify backend is running on correct port
- Check API URL in .env file
- Ensure no firewall blocking

### Debug Mode

```bash
# Enable debug logging
VITE_DEBUG=true npm run dev
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.
