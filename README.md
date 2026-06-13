# Premium E-Commerce Platform — LuxeShop

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohilla2011%2FLuxeShop)

A state-of-the-art, single-vendor e-commerce platform built with Next.js, featuring a cinematic video hero, glassmorphism UI, and smooth animations.

## ✨ Features
- **Cinematic Video Hero** — Full-screen background video with glassmorphism overlays
- **Premium UI** — Smooth transitions, hover animations, staggered card entries
- **Authentication** — Email/Password + Google OAuth via NextAuth.js
- **Shopping Cart** — Client-side cart with localStorage persistence
- **Responsive** — Works beautifully on desktop, tablet, and mobile

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Initialize Database
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # Backend API routes
│   ├── cart/         # Shopping cart page
│   ├── login/        # Login page
│   ├── signup/       # Signup page
│   └── page.tsx      # Home page
├── components/       # Reusable UI components
├── context/          # React Context (Cart)
└── lib/              # Utilities (Auth, Prisma)
prisma/               # Database schema
```

## 🛠 Tech Stack
- **Next.js 16** — React framework
- **NextAuth.js** — Authentication
- **Prisma + SQLite** — Database
- **Vanilla CSS** — Premium custom styling

## 📦 Deployment
Push to GitHub and connect to [Vercel](https://vercel.com) for instant deployment.
