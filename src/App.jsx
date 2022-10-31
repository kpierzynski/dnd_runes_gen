import { useRef, useState, useEffect, useMemo } from 'react'
import { SVG } from "@svgdotjs/svg.js"
import UI from "./UI"
import Rune from "./generator/main"
import './App.css'

import { points_circle } from "./generator/points"
import { CalendarViewDaySharp } from '@mui/icons-material'

function App() {
  const [canvas, setCanvas] = useState();

  useEffect( () => {
    if( canvas ) return;

    setCanvas(SVG().addTo("#drawing").size("100%", "100%"));
  }, [] );

  function handleChange(data) {
    if( !data ) return;
    if( !canvas ) return;

    canvas.clear();

    const svg_x = document.getElementById("drawing").offsetWidth;

    function draw(arr, offset = {x: 0, y: 0}, slots = [] ) {
      arr.forEach( element => {
        const { position } = element.data.settings.position;
        const points = points_circle(element.data.ring.radius, element.data.settings.planets)

        const x = offset.x + (slots[position] ? slots[position].x : 0);
        const y = offset.y + (slots[position] ? slots[position].y : 0);

        new Rune(canvas).draw(element.data).dmove(x, y);
        if( element.children && element.children.length > 0 ) draw(element.children, {x, y}, points );
      })
    }

    draw(data, {x: 400, y: 400 });
  }

  return (
    <div className="App">
      <div id="drawing" />
      <UI onChange={handleChange}/>
    </div>
  )
}

export default App;