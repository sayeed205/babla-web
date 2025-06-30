import { useEffect } from 'react'

import type { QueryClient } from '@tanstack/react-query'

import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router'

import TanStackQueryLayout from '../integrations/tanstack-query/layout'
import { Spinner } from '@/components/ui/spinner'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import { serverStateStore, serverStore } from '@/stores/server-store'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useStore } from '@tanstack/react-store'

interface MyRouterContext {
  queryClient: QueryClient
}

const NoServerRediract = () => {
  const servers = useStore(serverStore)
  const { initialized } = useStore(serverStateStore)
  const navigate = useNavigate({ from: '/' })
  useEffect(() => {
    if (initialized) {
      if (!servers.length) {
        navigate({ to: '/servers/add' })
      }
    }
  }, [servers, navigate, initialized])
  return initialized ? null : (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NoServerRediract />
      <Outlet />
      {import.meta.env.MODE === 'development' && (
        <>
          <TanStackRouterDevtools />
          <TanStackQueryLayout />
        </>
      )}
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
