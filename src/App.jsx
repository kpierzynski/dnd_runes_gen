import { useState, useId, useRef, useEffect } from "react";
import { useStore } from "./stores/store";

import Tree from "./components/Tree";
import Inputs from "./components/Inputs";
import dungrgBase64 from "./assets/dungrg";

import Svg from "./components/Svg/Svg";

function App() {
	const { state } = useStore();

	const elementRef = useRef(null);

	function embedFont(svg) {
		const fontBase64 = `data:font/truetype;base64,${dungrgBase64}`;
		const fontStyle = `
			@font-face {
				font-family: "Dungeon";
				src: url(${fontBase64}) format("truetype");
			}
			svg {
				font-family: "Dungeon";
			}
		`;

		const styleElement = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"style"
		);
		styleElement.textContent = fontStyle;
		svg.insertBefore(styleElement, svg.firstChild);
	}

	function inlineStyles(element) {
		const computedStyle = window.getComputedStyle(element);
		let styleString = "";
		for (let key of computedStyle) {
			if ("stroke" === key) {
				styleString += `stroke:black`;
				continue;
			}
			styleString += `${key}:${computedStyle.getPropertyValue(key)};`;
		}
		element.setAttribute("style", styleString);

		Array.from(element.children).forEach((child) => inlineStyles(child));
	}

	function prepareElement() {
		const svg = document.getElementsByTagName("svg")[0];
		inlineStyles(svg);
		embedFont(svg);
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svg);

		return [svg, svgString];
	}

	function saveSvg() {
		const [_, svgString] = prepareElement();
		const blob = new Blob([svgString], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = "image.svg";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	function savePNG() {
		const [svg, svgData] = prepareElement();

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		const img = new Image();
		const svgBlob = new Blob([svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		const url = URL.createObjectURL(svgBlob);

		img.onload = function () {
			canvas.width = svg.clientWidth;
			canvas.height = svg.clientHeight;
			ctx.drawImage(img, 0, 0);
			URL.revokeObjectURL(url);

			const pngData = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngData;
			downloadLink.download = "image.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		};

		img.src = url;
	}

	const app = (
		<div className="flex bg-gray-200" ref={elementRef}>
			<div className="flex flex-col gap-2 m-2">
				<button
					className="p-2 bg-blue-500 text-white rounded-md"
					onClick={saveSvg}
				>
					Save SVG
				</button>
				<button
					className="p-2 bg-blue-500 text-white rounded-md"
					onClick={savePNG}
				>
					Save PNG
				</button>
				<Tree />
				<Inputs />
			</div>
			<Svg rune={state.rune} x={700} y={500} parent={{ radius: 0 }} />
		</div>
	);

	return app;
}

export default App;
