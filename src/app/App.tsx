import { RouterProvider, createRouter } from '@tanstack/react-router'

import { StrictMode } from 'react'

import { routeTree } from '../routeTree.gen'

const router = createRouter({
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
  routeTree,
})

export const App = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
