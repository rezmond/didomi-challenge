import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { Agreement } from './routes/Agreement';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/give-consent" replace />,
  },
  {
    path: "/give-consent",
    element: <Agreement />
  },
]);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
