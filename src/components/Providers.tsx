'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'
// since react query has built-in support for caching , we can use the QueryClient() for 
// taking full advantage of it !
const client = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Providers
