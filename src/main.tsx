import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { createConsentApi } from './services/consentApi';
import { ConsentApiContext } from './shared/lib/consentApiContext';
import { fetchApiMock } from './services/mocks/fetchApiMock';
import { router } from './services/router';

const consentApi = createConsentApi(fetchApiMock);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ConsentApiContext.Provider value={consentApi}>
      <RouterProvider router={router} />
    </ConsentApiContext.Provider>
  </StrictMode>,
);
