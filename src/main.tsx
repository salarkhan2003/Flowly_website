import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ApkDownloadProvider } from './context/ApkDownloadProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApkDownloadProvider>
      <App />
    </ApkDownloadProvider>
  </StrictMode>,
);
