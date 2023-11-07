import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { fetchApiMock } from './app/fetchApiMock';
import { router } from './app/router';
import { createConsentApi } from './features/consent';
import { ConsentApiContext } from './shared/lib/consentApiContext';

const consentApi = createConsentApi(fetchApiMock);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ConsentApiContext.Provider value={consentApi}>
      <RouterProvider router={router} />
    </ConsentApiContext.Provider>
  </StrictMode>,
);
