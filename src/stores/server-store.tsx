import type { ServerDB } from '@/context/indexed-db-context'
import { Store } from '@tanstack/store'

export const serverStore = new Store<ServerDB[]>([])
