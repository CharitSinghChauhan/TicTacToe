import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { connectSocket } from './socket.jsx'

connectSocket("https://tictactoe-xryq.onrender.com")

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
