import { useRef, useState, useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js"
import UI from "./UI"
import Rune from "./generator/main"
import './App.css'

function App() {
  const [canvas, setCanvas] = useState();
  const [rune, setRune] = useState();

  useEffect( () => {
    if( canvas ) return;

    setCanvas(SVG().addTo("#drawing").size("100%", "100%"));
  }, [] );

  useEffect( () => {
    if( !canvas ) return;
    setRune(new Rune(canvas));
  }, [canvas])

  function handleChange(data) {
    if( !data || !rune ) return;
    rune.draw(data).dmove(400,400);
  }

  return (
    <div className="App">
      <div id="drawing" />
      <UI onChange={handleChange}/>
    </div>
  )
}

export default App;