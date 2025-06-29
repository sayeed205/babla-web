import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { serverStore } from '@/stores/server-store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { Badge, Check, Plus, Server, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/servers/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/servers' })
  const servers = useStore(serverStore)

  const handleSetActive = async (serverId: string) => {
    // try {
    //   await indexedDBService.setActiveServer(serverId)
    //   const activeServer = servers.find(s => s.id === serverId)
    //   if (activeServer) {
    //     setBaseUrl(activeServer.baseUrl)
    //     router.push('/home')
    //   }
    // } catch (error) {
    //   console.error('Failed to set active server:', error)
    // }
  }

  const handleDelete = async (serverId: string) => {
    // try {
    //   await indexedDBService.deleteServer(serverId)
    //   await loadServers()
    // } catch (error) {
    //   console.error('Failed to delete server:', error)
    // }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Servers</h1>
            <p className="text-muted-foreground">Manage your media servers</p>
          </div>
          <Button onClick={() => navigate({ to: '/servers/add' })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
        </div>

        {servers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Server className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No servers configured
              </h3>
              <p className="text-muted-foreground mb-4">
                Add your first media server to get started
              </p>
              <Button onClick={() => navigate({ to: '/servers/add' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Server
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servers.map((server) => (
              <Card key={server.url} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      {server.name}
                    </CardTitle>
                    {server.active && (
                      <Badge>
                        <Check className="h-3 w-3 mr-1" />
                        Current
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{server.url}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {!server.active && (
                      <Button
                        size="sm"
                        onClick={() => handleSetActive(server.url)}
                        className="flex-1"
                      >
                        Connect
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(server.url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
