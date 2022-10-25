import { useRef, useState, useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js"
import UI from "./UI"
import Rune from "./generator/main"
import './App.css'

function App() {
  const [canvas, setCanvas] = useState();
  const [rune, setRune] = useState();

  useEffect( () => {
    setCanvas(SVG().addTo("#drawing"));
  }, [] );

  useEffect( () => {
    if( !canvas ) return;
    setRune(new Rune(canvas));
  }, [canvas])

  function handleChange(data) {
    rune.draw(data);
  }

  return (
    <div className="App">
      <div id="drawing" />
      <UI onChange={handleChange}/>
    </div>
  )
}

export default App;