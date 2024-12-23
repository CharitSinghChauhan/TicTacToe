import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { connectSocket } from './socket.jsx'

connectSocket("http://localhost:3000/")

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
