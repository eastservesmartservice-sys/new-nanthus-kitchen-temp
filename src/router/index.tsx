import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageLoader from "../components/PageLoader";

const HomePage     = lazy(() => import("../pages/HomePage"));
const MenuPage     = lazy(() => import("../pages/MenuPage"));
const SpecialsPage = lazy(() => import("../pages/SpecialsPage"));
const OrderPage    = lazy(() => import("../pages/OrderPage"));
const CateringPage = lazy(() => import("../pages/CateringPage"));
const ContactPage  = lazy(() => import("../pages/ContactPage"));
const GalleryPage  = lazy(() => import("../pages/GalleryPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/",         element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: "/menu",     element: <Suspense fallback={<PageLoader />}><MenuPage /></Suspense> },
      { path: "/specials", element: <Suspense fallback={<PageLoader />}><SpecialsPage /></Suspense> },
      { path: "/order",    element: <Suspense fallback={<PageLoader />}><OrderPage /></Suspense> },
      { path: "/catering", element: <Suspense fallback={<PageLoader />}><CateringPage /></Suspense> },
      { path: "/contact",  element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      { path: "/gallery",  element: <Suspense fallback={<PageLoader />}><GalleryPage /></Suspense> },
      // Legacy redirects
      { path: "/our-menu",   element: <Navigate to="/menu" replace /> },
      { path: "/home",       element: <Navigate to="/" replace /> },
      { path: "/takeaway",   element: <Navigate to="/order" replace /> },
      { path: "/take-away",  element: <Navigate to="/order" replace /> },
      { path: "/contact-us", element: <Navigate to="/contact" replace /> },
      { path: "*",           element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);

export const routeToSection: Record<string, string> = {};
