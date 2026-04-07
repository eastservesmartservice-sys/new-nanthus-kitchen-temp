import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage     = lazy(() => import("../pages/HomePage"));
const MenuPage     = lazy(() => import("../pages/MenuPage"));
const SpecialsPage = lazy(() => import("../pages/SpecialsPage"));
const OrderPage    = lazy(() => import("../pages/OrderPage"));
const CateringPage = lazy(() => import("../pages/CateringPage"));
const ContactPage  = lazy(() => import("../pages/ContactPage"));
const GalleryPage  = lazy(() => import("../pages/GalleryPage"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/",         element: <Suspense fallback={null}><HomePage /></Suspense> },
      { path: "/menu",     element: <Suspense fallback={null}><MenuPage /></Suspense> },
      { path: "/specials", element: <Suspense fallback={null}><SpecialsPage /></Suspense> },
      { path: "/order",    element: <Suspense fallback={null}><OrderPage /></Suspense> },
      { path: "/catering", element: <Suspense fallback={null}><CateringPage /></Suspense> },
      { path: "/contact",  element: <Suspense fallback={null}><ContactPage /></Suspense> },
      { path: "/gallery",  element: <Suspense fallback={null}><GalleryPage /></Suspense> },
      // Legacy redirects
      { path: "/our-menu",   element: <Navigate to="/menu" replace /> },
      { path: "/home",       element: <Navigate to="/" replace /> },
      { path: "/takeaway",   element: <Navigate to="/order" replace /> },
      { path: "/take-away",  element: <Navigate to="/order" replace /> },
      { path: "/contact-us", element: <Navigate to="/contact" replace /> },
      { path: "*",           element: <Navigate to="/" replace /> },
    ],
  },
]);

export const routeToSection: Record<string, string> = {};
