import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import "./assets/fonts/fonts.css";

import { SVG } from "@svgdotjs/svg.js";

import PaletteProvider, { colors } from "./PaletteProvider";
import UI from "./UI/UI";

import Rune from "./generator/rune";

import { points_circle } from "./generator/points";

function App() {
	const [canvas, setCanvas] = useState();
	const [center, setCenter] = useState({ x: 0, y: 0 });
	const [selected, setSelected] = useState(1);

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

	function handleChange(data, id) {
		setData(data);
		setSelected(id);
	}

	useEffect(() => {
		draw();
	}, [center, data, selected]);

	function draw(exporting = false) {
		if (!canvas) return;
		if (!data) return;
		canvas.clear();

		const queue = [];
		data.forEach((element) => queue.push({ element: element, offset: { x: center.x, y: center.y }, slots: [] }));

		while (queue.length !== 0) {
			const { offset, element, slots } = queue.shift();

			const { position } = element.data.settings;
			const points = points_circle(element.data.ring.radius, element.data.settings.planets);

			const x = offset.x + (slots[position] ? slots[position].x : 0);
			const y = offset.y + (slots[position] ? slots[position].y : 0);

			const colorSet = {
				text: exporting ? "black" : element.id === selected ? colors.selected : colors.text,
				bg: exporting ? "white" : colors.bg
			};

			Rune(canvas, colorSet, element.data).dmove(x, y);

			element.children.forEach((item) => queue.push({ element: item, offset: { x, y }, slots: points }));
		}
	}

	function handleSave() {
		draw(true);

		var svgData = document.getElementById("drawing").innerHTML;
		var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		var svgUrl = URL.createObjectURL(svgBlob);

		var downloadLink = document.createElement("a");
		downloadLink.href = svgUrl;
		downloadLink.download = data[0].data.settings.name;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		draw();
	}

	return (
		<PaletteProvider>
			<div className="App">
				<UI onChange={handleChange} onSave={handleSave} />
				<div id="drawing" />
			</div>
		</PaletteProvider>
	);
}

export default App;
