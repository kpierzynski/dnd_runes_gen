import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import "./assets/fonts/fonts.css";

import { SVG } from "@svgdotjs/svg.js";

import PaletteProvider from "./PaletteProvider";
import UI from "./UI/UI";

import Rune from "./generator/rune";

import { points_circle } from "./generator/points";

import toImg from "react-svg-to-image";
import { useTheme } from "@emotion/react";

function App() {
	const [canvas, setCanvas] = useState();
	const [center, setCenter] = useState({ x: 0, y: 0 });
	const [selected, setSelected] = useState(1);

	const [data, setData] = useState();

	const theme = useTheme();

	const colors = {
		text: theme.palette.text.primary,
		bg: theme.palette.background.default,
		selected: theme.palette.primary.main
	};

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
	}, [center, data, selected, colors]);

	function draw(exporting = false) {
		if (!canvas) return;
		if (!data) return;
		canvas.clear();
		const innerCanvas = canvas.group();

		const queue = [];
		data.forEach((element) =>
			queue.push({
				element: element,
				offset: { x: exporting ? 0 : center.x, y: exporting ? 0 : center.y },
				slots: []
			})
		);

		while (queue.length !== 0) {
			const { offset, element, slots } = queue.shift();

			const { position } = element.data.settings;
			const points = points_circle(element.data.ring.radius, element.data.settings.planets);

			const x = offset.x + (slots[position] ? slots[position].x : 0);
			const y = offset.y + (slots[position] ? slots[position].y : 0);

			const colorSet = {
				text: exporting ? "white" : element.id === selected ? colors.selected : colors.text,
				bg: exporting ? "black" : colors.bg
			};

			Rune(innerCanvas, colorSet, element.data).dmove(x, y);

			element.children.forEach((item) => queue.push({ element: item, offset: { x, y }, slots: points }));
		}

		if (exporting) {
			const { x, y, width, height } = innerCanvas.node.getBBox();
			const margin = 12;

			innerCanvas.move(margin, margin);

			const w = document.body.clientWidth - margin;
			const h = document.body.clientHeight - margin;

			const sx = w < width ? w / width : 1;
			const sy = h < height ? h / height : 1;
			if (sx !== 1 || sy !== 1) {
				if (sx < sy) innerCanvas.scale(sx, sx, margin, margin);
				else innerCanvas.scale(sy, sy, margin, margin);
			}
		}
	}

	function handleSave() {
		draw(true);

		toImg("#drawing svg", data[0].data.settings.name, {
			scale: 3,
			quality: 0.95,
			format: "jpeg"
		}).then(() => {
			draw();
		});
	}

	return (
		<div className="App">
			<UI onChange={handleChange} onSave={handleSave} />
			<div id="drawing" />
		</div>
	);
}

export default App;
