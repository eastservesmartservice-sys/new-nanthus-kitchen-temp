import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n'
import { router } from './router'
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-600.css';

const wsUrl = import.meta.env.VITE_WS_URL as string | undefined;

if (wsUrl) {
  const connectRealtime = () => {
    void import("./lib/realtime").then(({ connectPublicRealtime }) => {
      connectPublicRealtime(wsUrl);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(connectRealtime, { timeout: 2500 });
  } else {
    globalThis.setTimeout(connectRealtime, 0);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
