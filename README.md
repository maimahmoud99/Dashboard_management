# 🚀 Project Dashboard - React/Next.js Assessment

A feature-rich **Project Management Dashboard** built with Next.js, TypeScript, and modern web technologies. This application demonstrates advanced React patterns, real-time updates, role-based access control, and professional UI/UX design.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication** with secure login system
- **Role-Based Access Control** (Admin, Project Manager, Developer)
- **Protected Routes** with middleware
- Persistent sessions using cookies

### 📊 Dashboard
- **Interactive Project Table** with real-time data
- **Advanced Filtering**: Search by name, filter by status and progress level
- **Multi-Column Sorting**: Sort by any column (name, status, dates, progress, budget)
- **Pagination**: Navigate through projects efficiently
- **Inline Editing**: Edit project progress with role-based permissions
- **Visual Charts**: Bar chart for progress, Pie chart for status distribution

### 📁 Project Details
- Detailed project information view
- **Task Management**: Add, edit, and update task statuses
- **Real-time Notifications**: See updates from other users instantly
- Progress tracking and budget overview

### 🔄 Real-Time Updates
- **Cross-Tab Communication** using BroadcastChannel API
- **Live Notifications** when other users make changes
- Fallback to localStorage for older browsers

### 🎨 UI/UX
- **Fully Responsive Design** (Mobile, Tablet, Desktop)
- **Accessibility Compliant** (WCAG guidelines with ARIA labels)
- **Smooth Animations** and transitions
- **Skeleton Loaders** for better perceived performance
- **Toast Notifications** for user feedback

### ✅ Form Validation
- **React Hook Form** for efficient form handling
- **Zod Schema Validation** for type-safe validation
- Real-time error messages

---

## 🛠️ Tech Stack

### Core
- **Next.js 15** (App Router)
- **React 18** with TypeScript
- **Redux Toolkit** for state management

### Styling
- **TailwindCSS** for utility-first styling
- Custom responsive design

### Data Visualization
- **Recharts** for interactive charts

### Form Handling
- **React Hook Form** with Zod validation

### HTTP Client
- **Axios** for API calls

### Real-Time
- **BroadcastChannel API** for cross-tab communication

### Additional Tools
- **js-cookie** for cookie management
- TypeScript for type safety

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd dashboard
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Login Credentials

The application has three user roles:

### Admin
- Email: `admin@test.com`
- Password: `123456`
- **Permissions**: Full access, can edit project progress

### Project Manager
- Email: `pm@test.com`
- Password: `123456`
- **Permissions**: Can edit project progress

### Developer
- Email: `dev@test.com`
- Password: `123456`
- **Permissions**: Read-only access

> **Note**: Any email containing "admin" will be assigned Admin role, "pm" for Project Manager, others default to Developer.

---

## 🎯 Key Features Demo

### 1. Authentication Flow
1. Navigate to `/login`
2. Enter credentials based on desired role
3. Redirected to `/dashboard` upon successful login
4. Protected routes prevent unauthorized access

### 2. Project Management
- **Search**: Type in search bar to filter projects by name
- **Filter**: Use dropdowns to filter by status or progress level
- **Sort**: Click column headers to sort
- **Edit Progress**: Click progress percentage (Admin/PM only), modify value, click ✓

### 3. Real-Time Updates (Testing)
1. Open two browser tabs
2. Login as different users in each tab
3. Edit project progress in Tab 1
4. See instant notification in Tab 2: "🔔 user@email updated a project"

### 4. Task Management
1. Click "View Details" on any project
2. Add new tasks using the input field
3. Change task status using the dropdown
4. See real-time notifications when others update tasks

---

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoint
│   │   │   └── projects/     # Projects endpoints
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── components/   # Dashboard components
│   │   │   ├── project/[id]/ # Project details page
│   │   │   └── page.tsx      # Main dashboard
│   │   ├── login/            # Login page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── lib/
│   │   ├── axios.ts          # Axios configuration
│   │   └── RealtimeContext.tsx # Real-time communication
│   ├── store/
│   │   ├── store.ts          # Redux store
│   │   └── slices/           # Redux slices
│   └── middleware.ts         # Route protection
├── public/                   # Static assets
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```



### Environment Variables
No environment variables required for basic functionality. The app uses mock data and client-side authentication.

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Authentication
- [ ] Login with Admin role
- [ ] Login with PM role
- [ ] Login with Developer role
- [ ] Try accessing `/dashboard` without login (should redirect to `/login`)
- [ ] Logout functionality

#### Dashboard
- [ ] Search projects by name
- [ ] Filter by status (In Progress, Completed, On Hold)
- [ ] Filter by progress (Low, Medium, High)
- [ ] Sort by each column
- [ ] Navigate pagination (Previous/Next)
- [ ] Edit progress as Admin/PM (should show ✓ and ✕ buttons)
- [ ] Try editing as Developer (should show alert)
- [ ] Charts display correctly

#### Project Details
- [ ] View project details
- [ ] Add new task
- [ ] Update task status
- [ ] Real-time notification appears in another tab

#### Real-Time (Critical)
- [ ] Open 2 tabs with different users
- [ ] Edit progress in Tab 1
- [ ] See notification in Tab 2

---

## 🎨 Design Decisions

### Why BroadcastChannel instead of WebSockets?
- **No Backend Required**: Works entirely client-side
- **Cross-Tab Communication**: Perfect for multi-tab scenarios
- **Lightweight**: No external dependencies
- **Fallback Support**: Uses localStorage for older browsers

### Why Mock Data?
- **Focus on Frontend**: Demonstrates React/Next.js skills without backend complexity
- **Easy Testing**: No database setup required
- **Quick Deployment**: Deploy anywhere without server configuration

### Why Redux Toolkit?
- **Predictable State**: Centralized state management
- **TypeScript Support**: Excellent type inference
- **DevTools Integration**: Easy debugging

---

## 📈 Performance & Quality Metrics

### Lighthouse Scores (Desktop)
- Performance: 53/100 (Development Mode)
- Accessibility: 91/100
- Best Practices: 100/100
- SEO: 80/100

> **Note**: For accurate performance testing, run Lighthouse in Incognito mode without browser extensions.

---

## 🐛 Known Limitations

1. **Mock Authentication**: Uses client-side JWT simulation (not production-ready)
2. **In-Memory Data**: Changes reset on page refresh
3. **Real-Time Scope**: Works only within same browser (different tabs)
4. **No Persistence**: No database integration

### For Production, Consider:
- Real backend with database (PostgreSQL, MongoDB)
- Proper JWT authentication with secure token storage
- WebSocket server for true real-time updates
- API rate limiting and security measures

---


## 👨‍💻 Developer

**Developed by**: Mai Mahmoud
**Email**:  maimahmud47@gmail.com
**LinkedIn**: linkedin.com/in/mai-mahmud
**GitHub**: github.com/maimahmoud99 

---
