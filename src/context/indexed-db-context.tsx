// src/context/indexed-db-context.tsx
import { serverStore } from '@/stores/server-store'
import { useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useEffect } from 'react'
import { initDB, useIndexedDB } from 'react-indexed-db-hook'

// Export the ServerDB interface
export interface ServerDB {
  name: string
  version: string
  url: string
  active: boolean
  addedOn: Date
}

initDB({
  name: 'Babla',
  version: 1,
  objectStoresMeta: [
    {
      store: 'servers',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        {
          name: 'version',
          keypath: 'version',
          options: { unique: false },
        },
        { name: 'url', keypath: 'url', options: { unique: true } },
        { name: 'active', keypath: 'active', options: { unique: false } },
        { name: 'addedOn', keypath: 'addedOn', options: { unique: false } },
      ],
    },
  ],
})

export const IndexedDBProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const db = useIndexedDB('servers')
  useEffect(() => {
    const checkServers = async () => {
      const servers = await db.getAll<ServerDB>()
      serverStore.setState(servers)
    }
    checkServers()
  }, [db])

  return children
}
