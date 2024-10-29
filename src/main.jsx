import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from "./App";
import './global.css';
import { WeatherProvider } from './context/WeatherContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>
)
