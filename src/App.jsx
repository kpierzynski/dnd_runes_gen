import { useRef, useState, useEffect, useMemo, useLayoutEffect } from "react";
import { SVG } from "@svgdotjs/svg.js";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import UI from "./UI/UI";
import Rune from "./generator/main";
import "./App.css";

import { points_circle } from "./generator/points";

const darkTheme = createTheme({
	palette: {
		mode: "dark"
	}
});

const colors = {
	text: darkTheme.palette.text.primary,
	bg: darkTheme.palette.background.default
};

function App() {
	const [canvas, setCanvas] = useState();
	const [center, setCenter] = useState({ x: 0, y: 0 });

	const [data, setData] = useState();

	useEffect(() => {
		if (canvas) return;

		setCanvas(SVG().addTo("#drawing").size("100%", "100%"));
	}, []);

	const getCenter = () => {
		const element = document.getElementById("drawing");
		const box = element.getBoundingClientRect();
		const center = { x: box.width / 2, y: box.height / 2 };
		setCenter(center);
	};

	useLayoutEffect(() => {
		window.addEventListener("resize", getCenter);

		return () => window.removeEventListener("resize", getCenter);
	}, []);

	useEffect(() => {
		if (!canvas) return;

		getCenter();
	}, [canvas]);

	function handleChange(data) {
		setData(data);
	}

	useEffect(() => {
		draw();
	}, [center, data]);

	function draw() {
		if (!canvas) return;
		if (!data) return;
		canvas.clear();

		function draw(arr, offset = { x: 0, y: 0 }, slots = []) {
			arr.forEach((element) => {
				const { position } = element.data.settings;
				const points = points_circle(element.data.ring.radius, element.data.settings.planets);

				const x = offset.x + (slots[position] ? slots[position].x : 0);
				const y = offset.y + (slots[position] ? slots[position].y : 0);

				new Rune(canvas, colors).draw(element.data).dmove(x, y);
				if (element.children && element.children.length > 0) draw(element.children, { x, y }, points);
			});
		}

		draw(data, center);
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="App">
				<div id="drawing" />
				<UI onChange={handleChange} />
			</div>
		</ThemeProvider>
	);
}

export default App;
