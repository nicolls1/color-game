import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
//import reportWebVitals from './reportWebVitals';

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from 'ts/theme'
import queryClient from 'ts/queryClient'
import { QueryClientProvider } from 'react-query'

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ChakraProvider theme={extendTheme(theme as any)}>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
