import { useRef, useState, useEffect } from 'react'
import UI from "./UI"
import './App.css'

function App() {
  return (
    <div className="App">
      <UI />
      <div id="drawing" />
    </div>
  )
}

export default App
