import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: 60 * 60 * 1000,
      staleTime: 1 * 60 * 1000,
    },
  },
})
export default queryClient
