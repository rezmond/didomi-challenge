import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { Agreement } from './components/Agreement';

import './index.css';
import { createConsentApi } from './services/consentApi';
import { ConsentApiContext } from './shared/lib/consentApiContext';
import { fetchApiMock } from './services/mocks/fetchApiMock';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/give-consent" replace />,
  },
  {
    path: '/give-consent',
    element: <Agreement />,
  },
]);

const consentApi = createConsentApi(fetchApiMock);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ConsentApiContext.Provider value={consentApi}>
      <RouterProvider router={router} />
    </ConsentApiContext.Provider>
  </StrictMode>,
);
