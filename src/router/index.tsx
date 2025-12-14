import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';

// Route mapping for SEO-friendly URLs to section IDs
export const routeToSection: Record<string, string> = {
  '/': 'hero',
  '/home': 'hero',
  '/our-menu': 'menu',
  '/menu': 'menu',
  '/specials': 'special',
  '/order': 'take-away',
  '/takeaway': 'take-away',
  '/take-away': 'take-away',
  '/catering': 'catering',
  '/contact': 'contact',
  '/contact-us': 'contact',
};

// Create the router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <App />,
  },
  {
    path: '/our-menu',
    element: <App />,
  },
  {
    path: '/menu',
    element: <App />,
  },
  {
    path: '/specials',
    element: <App />,
  },
  {
    path: '/order',
    element: <App />,
  },
  {
    path: '/takeaway',
    element: <App />,
  },
  {
    path: '/take-away',
    element: <App />,
  },
  {
    path: '/catering',
    element: <App />,
  },
  {
    path: '/contact',
    element: <App />,
  },
  {
    path: '/contact-us',
    element: <App />,
  },
  // Catch all - redirect to home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
