import React from 'react'
import {
  CSSReset,
  ChakraProvider,
  PortalManager,
  GlobalStyle,
} from '@chakra-ui/react'
import theme from '../src/ts/theme'
import '../src/index.css'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
}

/*
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
}
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retryOnMount: false,
    },
  },
})

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <GlobalStyle />
        <PortalManager zIndex={40}>
          <MemoryRouter initialEntries={['/games/undefined']}>
            <Story />
          </MemoryRouter>
        </PortalManager>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  ),
]
