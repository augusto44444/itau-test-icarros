import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/themes.css';
import { Home } from './templates/Home';
import { CarsContextProvider } from './contexts/Cars/CarsContextProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarsContextProvider>
      <Home />
    </CarsContextProvider>
  </StrictMode>,
);
