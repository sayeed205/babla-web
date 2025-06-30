import { useState } from 'react'

import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from '@tanstack/react-router'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ServerDB } from '@/context/indexed-db-context'
import { serverStore } from '@/stores/server-store'
import { useStore } from '@tanstack/react-store'
import { ArrowLeft, Loader2, Server } from 'lucide-react'
import { useIndexedDB } from 'react-indexed-db-hook'

export const Route = createFileRoute('/servers/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const [name, setName] = useState('')
  const [baseUrl, setBaseUrlState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const servers = useStore(serverStore)
  const db = useIndexedDB('servers')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate URL format
      const url = new URL(baseUrl)

      // Test connection
      // const isConnected = await testConnection(baseUrl)
      // if (!isConnected) {
      //   throw new Error(
      //     'Failed to connect to the server. Please check the URL and try again.',
      //   )
      // }

      const server: ServerDB = {
        name: name || 'Media Server',
        url: baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl,
        active: true, // First server is automatically active
        addedOn: new Date(),
        version: 'unknown',
      }

      // make other servers inactive
      const oldServers = await db.getAll<ServerDB>()
      await Promise.all(
        oldServers.map(async (s) => await db.update({ ...s, active: false }))
      )

      await db.add(server)
      const servers = await db.getAll<ServerDB>()
      serverStore.setState(servers)

      // todo)) add authentication
      // router.navigate({ to: '/login', from: '/servers/add' })
      router.navigate({ to: '/', from: '/servers/add' })

      // if (isFirstServer) {
      //   setBaseUrl(server.baseUrl)
      //   router.push('/home')
      // } else {
      //   router.push('/servers')
      // }
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Invalid URL')) {
        setError('Please enter a valid URL')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to add server')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-background flex min-h-screen items-center p-4'>
      <div className='mx-auto max-w-md'>
        {canGoBack && servers.length ? (
          <Button
            variant='ghost'
            onClick={() => router.history.back()}
            className='mb-6'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
        ) : null}

        <Card className='w-md'>
          <CardHeader className='text-center'>
            <div className='bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
              <Server className='text-primary h-6 w-6' />
            </div>
            <CardTitle>Add Media Server</CardTitle>
            <CardDescription>
              Connect to your media server to access your library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Server Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='My Media Server'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='baseUrl'>Server URL *</Label>
                <Input
                  id='baseUrl'
                  type='url'
                  placeholder='https://api.example.com'
                  value={baseUrl}
                  onChange={(e) => setBaseUrlState(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isLoading ? 'Testing Connection...' : 'Add Server'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
