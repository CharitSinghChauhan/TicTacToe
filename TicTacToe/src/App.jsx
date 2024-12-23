import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectMode from './pages/SelectMode'
import Game from './pages/Game'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectMode />} />
        <Route path='/game' element={<Game />}/>
      </Routes>
    </BrowserRouter>
  )
}
