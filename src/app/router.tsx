import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import { Agreement } from '@/pages/Agreement';
import { Consents } from '@/pages/Consents';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/give-consent" replace />,
  },
  {
    path: '/give-consent',
    element: <Agreement />,
  },
  {
    path: '/consents',
    element: <Consents />,
  },
]);
