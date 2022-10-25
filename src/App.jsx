import { useRef, useState, useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js"
import UI from "./UI"
import Rune from "./generator/main"
import './App.css'

function App() {
  const [canvas, setCanvas] = useState();
  const [mainRune, setMainRune] = useState();

  useEffect( () => {
    if( canvas ) return;

    setCanvas(SVG().addTo("#drawing").size("100%", "100%"));
  }, [] );

  function handleChange(data) {
    if( !data ) return;

    canvas.clear();

    const svg_x = document.getElementById("drawing").offsetWidth;
    console.log(svg_x)

    const main = new Rune(canvas)
    main.draw(data.main).dmove(svg_x/2,window.innerHeight/2);
    const slots = main.getSlots();

    data.other.forEach( (planet) => {
      const {x,y} = slots[planet.include.position];
      new Rune(canvas).draw(planet).dmove(svg_x/2,window.innerHeight/2).dmove(x,y);
    })


  }

  return (
    <div className="App">
      <div id="drawing" />
      <UI onChange={handleChange}/>
    </div>
  )
}

export default App;