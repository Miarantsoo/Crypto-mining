import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { browserRouter } from './route/route.tsx'
import { RouterProvider } from 'react-router-dom'

const router = browserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
