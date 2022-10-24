import { useRef, useState, useEffect } from 'react'
import './UInumber.css'

function UInumber({title}) {

  return (
  	<div>
		{title}
		<input type="number" />
	</div>
  )
}

export default UInumber;
