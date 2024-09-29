import { useId } from "react";

export default function Circle({ thickness, x, y, r, bg }) {
	const id = useId();

	return (
		<circle
			key={`${id}-circle-${x}-${y}-${r}-${thickness}-${bg}`}
			cx={x}
			cy={y}
			r={r}
			strokeWidth={thickness}
			fill={bg ? bg : "transparent"}
		/>
	);
}
