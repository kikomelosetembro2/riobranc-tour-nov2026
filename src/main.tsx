import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker with immediate auto-update for Workbox offline caching
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
