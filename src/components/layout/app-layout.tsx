import Cookies from 'js-cookie'

import { Outlet } from '@tanstack/react-router'

import SkipToMain from '../skip-to-main'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface Props {
  children?: React.ReactNode
}

export function AppLayout({ children }: Props) {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
      <div
        id='content'
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        {children ? children : <Outlet />}
      </div>
    </SidebarProvider>
  )
}
