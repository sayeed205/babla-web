import * as React from 'react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-context'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme()

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = theme === 'dark' ? 'light' : 'dark'
      const root = document.documentElement

      if (!document.startViewTransition) {
        setTheme(newMode)
        return
      }

      // Set coordinates from the click event
      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`)
        root.style.setProperty('--y', `${e.clientY}px`)
      }

      document.startViewTransition(() => {
        setTheme(newMode)
      })
    },
    [theme, setTheme]
  )

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle size-8'
      onClick={handleThemeToggle}
    >
      <span className='sr-only'>Toggle theme</span>
      <span className='sr-only'>Toggle theme</span>

      {/* Sun Icon */}
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'} `}
      />

      {/* Moon Icon */}
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'} `}
      />
    </Button>
  )
}
