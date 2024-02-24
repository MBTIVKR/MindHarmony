import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import { Provider as ReduxProvaider } from 'react-redux'
import { setupStore } from '@/Stores'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvaider store={setupStore()}>
      <App />
    </ReduxProvaider>
  </React.StrictMode>,
)
