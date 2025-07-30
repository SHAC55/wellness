import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WellnessProvider } from './context/wellnessContext.jsx'

createRoot(document.getElementById('root')).render(
  <WellnessProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </WellnessProvider>
)
