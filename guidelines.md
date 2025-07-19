# Frontend Guidelines - Para Sports Gujarat Website

## Table of Contents
1. [Design System](#design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Component Guidelines](#component-guidelines)
5. [Layout Structure](#layout-structure)
6. [Navigation](#navigation)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Performance](#performance)
10. [React Best Practices](#react-best-practices)
11. [Tailwind CSS Guidelines](#tailwind-css-guidelines)
12. [Animation & Interactions](#animation--interactions)

---

## Design System

### Brand Values
- **Inclusivity**: Accessible design for all users
- **Achievement**: Celebrating athletic excellence
- **Community**: Building connections across Gujarat
- **Innovation**: Modern, tech-forward approach

### Design Principles
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile-First**: Responsive design starting from mobile
- **Performance**: Fast loading and smooth interactions
- **Consistency**: Unified visual language across all pages

---

## Color Palette

### Primary Colors
```css
/* Primary Brand Colors */
--primary-600: #1e40af;    /* Deep Blue - Main brand */
--primary-500: #3b82f6;    /* Blue - Interactive elements */
--primary-400: #60a5fa;    /* Light Blue - Hover states */
--primary-100: #dbeafe;    /* Very Light Blue - Backgrounds */

/* Secondary Colors */
--secondary-600: #dc2626;  /* Red - Achievement/medals */
--secondary-500: #ef4444;  /* Light Red - Highlights */
--secondary-100: #fecaca;  /* Light Red - Backgrounds */

/* Accent Colors */
--accent-600: #059669;     /* Green - Success states */
--accent-500: #10b981;     /* Light Green - Positive actions */
--accent-400: #34d399;     /* Lighter Green - Hover */
```

### Neutral Colors
```css
/* Grays */
--gray-900: #111827;       /* Dark text */
--gray-800: #1f2937;       /* Secondary dark text */
--gray-700: #374151;       /* Tertiary text */
--gray-600: #4b5563;       /* Muted text */
--gray-500: #6b7280;       /* Disabled text */
--gray-400: #9ca3af;       /* Placeholder text */
--gray-300: #d1d5db;       /* Borders */
--gray-200: #e5e7eb;       /* Light borders */
--gray-100: #f3f4f6;       /* Light backgrounds */
--gray-50: #f9fafb;        /* Lightest backgrounds */

/* Semantic Colors */
--success: #10b981;        /* Success states */
--warning: #f59e0b;        /* Warning states */
--error: #ef4444;          /* Error states */
--info: #3b82f6;           /* Info states */
```

### Tailwind Implementation
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a'
        },
        secondary: {
          50: '#fef2f2',
          100: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        }
      }
    }
  }
}
```

---

## Typography

### Font Stack
```css
/* Primary Font - Inter (Clean, Modern) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Secondary Font - Poppins (Friendly, Accessible) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Gujarati Font Support */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;600;700&display=swap');
```

### Typography Scale
```css
/* Headings */
.text-h1 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; } /* 40px */
.text-h2 { font-size: 2rem; line-height: 1.3; font-weight: 600; }   /* 32px */
.text-h3 { font-size: 1.5rem; line-height: 1.4; font-weight: 600; } /* 24px */
.text-h4 { font-size: 1.25rem; line-height: 1.5; font-weight: 600; } /* 20px */
.text-h5 { font-size: 1.125rem; line-height: 1.5; font-weight: 500; } /* 18px */

/* Body Text */
.text-body-lg { font-size: 1.125rem; line-height: 1.6; } /* 18px */
.text-body { font-size: 1rem; line-height: 1.6; }        /* 16px */
.text-body-sm { font-size: 0.875rem; line-height: 1.5; } /* 14px */
.text-caption { font-size: 0.75rem; line-height: 1.4; }  /* 12px */
```

### Tailwind Classes
```html
<!-- Headings -->
<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
<h2 class="text-3xl lg:text-4xl font-semibold text-gray-800 leading-snug">
<h3 class="text-2xl lg:text-3xl font-semibold text-gray-800">
<h4 class="text-xl lg:text-2xl font-semibold text-gray-700">

<!-- Body Text -->
<p class="text-base lg:text-lg text-gray-600 leading-relaxed">
<span class="text-sm text-gray-500">
```

---

## Component Guidelines

### Button Components

#### Primary Button
```jsx
// Primary CTA Button
<button className="
  bg-primary-600 hover:bg-primary-700 
  text-white font-medium py-3 px-6 
  rounded-lg transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Primary Action
</button>
```

#### Secondary Button
```jsx
// Secondary Button
<button className="
  border-2 border-primary-600 text-primary-600 
  hover:bg-primary-50 font-medium py-3 px-6 
  rounded-lg transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
">
  Secondary Action
</button>
```

#### Donate Button (Special)
```jsx
// Prominent Donate Button
<button className="
  bg-gradient-to-r from-secondary-500 to-secondary-600 
  hover:from-secondary-600 hover:to-secondary-700
  text-white font-semibold py-3 px-8 
  rounded-full shadow-lg hover:shadow-xl
  transform hover:scale-105 transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2
">
  🎯 Donate Now
</button>
```

### Card Components

#### Athlete Card
```jsx
<div className="
  bg-white rounded-xl shadow-md hover:shadow-lg
  overflow-hidden transition-shadow duration-300
  border border-gray-200
">
  <div className="aspect-square bg-gray-100">
    <img className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
    <p className="text-gray-600 mb-3">
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
      <span className="text-secondary-600 font-bold">
    </div>
  </div>
</div>
```

#### Event Card
```jsx
<div className="
  bg-gradient-to-br from-white to-gray-50 
  rounded-2xl shadow-lg p-6 border border-gray-200
  hover:shadow-xl transition-shadow duration-300
">
  <div className="flex items-start justify-between mb-4">
    <div className="flex-1">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
      <p className="text-gray-600 mb-3">
    </div>
    <div className="text-right">
      <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
      <div className="text-2xl font-bold text-secondary-600 mt-2">
    </div>
  </div>
</div>
```

### Medal Display Component
```jsx
<div className="flex items-center space-x-4">
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">🥇</span>
    </div>
    <span className="font-semibold text-gray-900">5 Gold</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">🥈</span>
    </div>
    <span className="font-semibold text-gray-900">3 Silver</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">🥉</span>
    </div>
    <span className="font-semibold text-gray-900">4 Bronze</span>
  </div>
</div>
```

---

## Layout Structure

### Container Classes
```css
/* Max width containers */
.container-sm { max-width: 640px; }   /* Small content */
.container-md { max-width: 768px; }   /* Medium content */
.container-lg { max-width: 1024px; }  /* Large content */
.container-xl { max-width: 1280px; }  /* Extra large content */
.container-full { max-width: 100%; }  /* Full width */
```

### Grid Systems
```jsx
// Main Layout Grid
<div className="min-h-screen bg-gray-50">
  <header className="bg-white shadow-sm sticky top-0 z-50">
  <main className="flex-1 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page content */}
    </div>
  </main>
  <footer className="bg-gray-900 text-white">
</div>

// Content Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Hero Section
<section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
  <div className="container mx-auto px-4 py-20 lg:py-32">
    <div className="max-w-3xl mx-auto text-center">
      {/* Hero content */}
    </div>
  </div>
</section>
```

---

## Navigation

### Main Navigation
```jsx
<nav className="bg-white shadow-sm border-b border-gray-200">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center">
        <img className="h-10 w-auto" src="/logo.svg" alt="Para Sports Gujarat" />
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium transition-colors">
          Home
        </a>
        <a href="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium transition-colors">
          About Us
        </a>
        {/* More nav items */}
      </div>
      
      {/* Donate Button */}
      <div className="hidden md:block">
        <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Donate
        </button>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
```

### Breadcrumbs
```jsx
<nav className="bg-gray-50 py-4" aria-label="Breadcrumb">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <ol className="flex items-center space-x-2 text-sm">
      <li>
        <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
      </li>
      <li>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </li>
      <li>
        <span className="text-gray-900 font-medium">Current Page</span>
      </li>
    </ol>
  </div>
</nav>
```

---

## Responsive Design

### Breakpoints
```css
/* Tailwind Default Breakpoints */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Responsive Patterns
```jsx
// Mobile-first approach
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">

// Text responsiveness
<h1 className="
  text-2xl font-bold
  sm:text-3xl
  lg:text-4xl
  xl:text-5xl
">

// Spacing responsiveness
<div className="
  px-4 py-8
  sm:px-6 sm:py-12
  lg:px-8 lg:py-16
  xl:px-12 xl:py-20
">
```

---

## Accessibility

### ARIA Labels and Roles
```jsx
// Navigation
<nav role="navigation" aria-label="Main navigation">
  <button 
    aria-expanded="false" 
    aria-controls="mobile-menu"
    aria-label="Toggle navigation menu"
  >

// Content sections
<main role="main" aria-labelledby="main-heading">
  <h1 id="main-heading">Page Title</h1>
  
<section aria-labelledby="athletes-heading">
  <h2 id="athletes-heading">Our Athletes</h2>
  
// Interactive elements
<button 
  aria-describedby="donate-description"
  aria-label="Donate to support para-athletes"
>
  Donate
</button>
<div id="donate-description" className="sr-only">
  Your donation helps support para-athletes in Gujarat
</div>
```

### Focus Management
```css
/* Focus rings */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

/* Skip links */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50;
  @apply bg-primary-600 text-white px-4 py-2 font-medium;
}
```

### Color Contrast
```css
/* Ensure WCAG AA compliance */
.text-primary { color: #1e40af; }     /* 4.5:1 contrast ratio */
.text-secondary { color: #dc2626; }   /* 4.5:1 contrast ratio */
.text-muted { color: #4b5563; }       /* 4.5:1 contrast ratio */
```

---

## Performance

### Image Optimization
```jsx
// Next.js Image component
import Image from 'next/image'

<Image
  src="/athlete-photo.jpg"
  alt="Athlete name performing"
  width={400}
  height={300}
  className="rounded-lg"
  priority={isAboveTheFold}
  loading={isAboveTheFold ? 'eager' : 'lazy'}
/>

// Responsive images
<picture>
  <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
  <source media="(min-width: 768px)" srcSet="/hero-tablet.jpg" />
  <img src="/hero-mobile.jpg" alt="Hero image" className="w-full h-auto" />
</picture>
```

### Bundle Optimization
```javascript
// Lazy loading components
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

---

## React Best Practices

### Component Structure
```jsx
// Functional component with hooks
import { useState, useEffect, useCallback } from 'react'

function AthleteCard({ athlete, onSelect }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = useCallback(() => {
    if (onSelect) {
      onSelect(athlete.id)
    }
  }, [athlete.id, onSelect])
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {athlete.name}
      </h3>
      <p className="text-gray-600">{athlete.sport}</p>
    </div>
  )
}

export default AthleteCard
```

### State Management
```jsx
// Context for global state
import { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ATHLETES':
      return { ...state, athletes: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    athletes: [],
    loading: false
  })
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

---

## Tailwind CSS Guidelines

### Custom Utilities
```css
/* Custom utilities in globals.css */
@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .shadow-glow {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
}
```

### Component Classes
```css
/* Component-specific classes */
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200;
  }
  
  .section-padding {
    @apply py-12 px-4 sm:px-6 lg:px-8 lg:py-16;
  }
}
```

---

## Animation & Interactions

### Smooth Transitions
```css
/* Transition utilities */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

### Loading States
```jsx
// Skeleton loading
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
</div>

// Spinner
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
</div>
```

### Page Transitions
```jsx
// Framer Motion example
import { motion } from 'framer-motion'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Testing Guidelines

### Component Testing
```jsx
// Testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import AthleteCard from './AthleteCard'

test('renders athlete information', () => {
  const athlete = {
    id: 1,
    name: 'Bhavna Chaudhary',
    sport: 'Javelin Throw'
  }
  
  render(<AthleteCard athlete={athlete} />)
  
  expect(screen.getByText('Bhavna Chaudhary')).toBeInTheDocument()
  expect(screen.getByText('Javelin Throw')).toBeInTheDocument()
})
```

### Accessibility Testing
```jsx
// Test accessibility
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(<AthleteCard athlete={mockAthlete} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

---

## Code Organization

### File Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── features/        # Feature-specific components
│   └── forms/           # Form components
├── pages/               # Page components
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── context/             # Context providers
├── styles/              # Global styles
└── constants/           # Constants and configuration
```

### Import Order
```jsx
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party imports
import { motion } from 'framer-motion'
import clsx from 'clsx'

// 3. Internal imports
import { useApp } from '@/context/AppContext'
import { formatDate } from '@/utils/date'
import Button from '@/components/ui/Button'

// 4. Type imports (if using TypeScript)
import type { Athlete } from '@/types'
```

---

## Deployment Checklist

### Pre-deployment
- [ ] Run accessibility audit
- [ ] Test responsive design on multiple devices
- [ ] Optimize images and assets
- [ ] Check performance metrics
- [ ] Validate HTML and CSS
- [ ] Test form submissions
- [ ] Verify all links work
- [ ] Check loading states
- [ ] Test offline functionality (if applicable)

### Post-deployment
- [ ] Monitor Core Web Vitals
- [ ] Check error rates
- [ ] Verify analytics tracking
- [ ] Test user flows
- [ ] Monitor accessibility metrics

---

*This guideline ensures consistent, accessible, and performant UI development for the Para Sports Gujarat website using React and Tailwind CSS.*