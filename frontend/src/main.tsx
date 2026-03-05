import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import { ApiProvider } from './contexts/ApiContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ApiProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ApiProvider>
    </ThemeProvider>
  </StrictMode>,
)
