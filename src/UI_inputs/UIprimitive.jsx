import { useRef, useState, useEffect } from 'react'
import './UIprimitive.css'

function UIprimitive({type, title, path, onChange}) {

	const [data, setData] = useState(0);

	function handleChange(e) {
		setData(e.target.value);
		const convert = {
			number: +e.target.value,
			text: e.target.value,
			checkbox: e.target.checked
		}
		onChange(path, convert[type]);
	}

  return (
  	<div>
		{JSON.stringify(title)}
		<input value={data} onChange={handleChange} type={type} />
	</div>
  )
}

export default UIprimitive;
