# TravelUs Frontend

A modern, beautiful group travel management application built with React, TypeScript, and Tailwind CSS.

![TravelUs](https://img.shields.io/badge/TravelUs-Frontend-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.11-blue)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens
- 🏠 **Modern Dashboard** - Beautiful overview with stats and activity
- 👥 **Group Management** - Create, join, and manage travel groups
- 💰 **Expense Tracking** - Split expenses fairly among group members
- 📱 **Responsive Design** - Perfect on all devices
- 🎨 **Beautiful UI** - Modern glass-morphism design with smooth animations
- 🚀 **Performance** - Optimized with code splitting and lazy loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Your Spring Boot backend running

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd travelus-frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your backend URL
# VITE_API_URL=http://localhost:8080/api

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   └── ui/             # Base UI components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── groups/         # Group-related pages
│   └── expenses/       # Expense-related pages
├── services/           # API services
└── types/              # TypeScript type definitions
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run test         # Run tests
```

## 🌐 Backend Integration

### Required API Endpoints

Your Spring Boot backend should implement:

#### Authentication

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

#### Groups

- `GET /api/groups` - Get user's groups
- `POST /api/groups` - Create group
- `GET /api/groups/{id}` - Get group details
- `POST /api/groups/join/{code}` - Join group

#### Expenses

- `GET /api/groups/{id}/expenses` - Get group expenses
- `POST /api/groups/{id}/expenses` - Create expense
- `GET /api/groups/{id}/balances` - Get member balances

#### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

### Sample API Response

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  },
  "token": "jwt_token_here"
}
```

## 🎨 Design System

### Colors

- **Primary**: #192166 (Travel Blue)
- **Secondary**: #2D1B69 (Travel Purple)
- **Accent**: #4338ca (Travel Indigo)

### Typography

- **Display**: Lexend (Headings)
- **Body**: Inter (Body text)

### Components

- Glass-morphism effects
- Smooth animations with Framer Motion
- Responsive design patterns
- Accessible UI components

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in dashboard
VITE_API_URL=https://your-api-domain.com/api
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Environment: VITE_API_URL=your-api-url
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🔒 Security Features

- JWT token management with automatic refresh
- Protected routes with authentication guards
- Input validation and sanitization
- XSS protection
- Secure API communication

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run type checking
npm run typecheck
```

## 📊 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Bundle**: Tree-shaking and minification
- **Image Optimization**: WebP format with fallbacks

## 🛠️ Development Tips

### API Integration

1. Update `VITE_API_URL` in `.env`
2. Ensure CORS is configured on your backend
3. Check network tab for API call debugging

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Sidebar.tsx`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the design system colors
- Use the `cn()` utility for conditional classes
- Implement hover and focus states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for errors
2. Verify your backend is running
3. Check API endpoints match the expected format
4. Review the network tab for failed requests

For additional help, please check the documentation or open an issue.
