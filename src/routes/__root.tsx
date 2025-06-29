import type { QueryClient } from '@tanstack/react-query'

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import Header from '../components/Header'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />

      <Outlet />
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  ),
})
