import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app/')({
  component: App,
})

function App() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          <ThemeSwitch />
          {/* <ProfileDropdown /> */}
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
      </Main>
    </>
  )
}
