import { useId } from "react";
import { useStore } from "./../../stores/store";

import Circle from "./Circle";
import Glyph from "./Glyph";
import TextOnPath from "./TextOnPath";

import {
	generateRandomRune,
	getRandomInt,
	polarToCartesian,
	generateSvgPath,
	generatePointsCloud,
} from "./../../utils/utils";

export default function Svg({ rune, parent, x, y }) {
	const { state } = useStore();
	const id = useId();

	const { x: offsetX, y: offsetY } = polarToCartesian(
		parent.radius,
		rune.theta
	);

	const position = {
		x: rune.isInCenter ? x : offsetX + x,
		y: rune.isInCenter ? y : offsetY + y,
	};

	const sidePoints = generatePointsCloud(
		position.x,
		position.y,
		rune.radius - rune.borderThickness,
		rune.sideLines
	);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			className={`${
				rune.name === state.selected ? "stroke-red-500" : "stroke-black"
			} tracking-[0.5rem] w-screen h-screen `}
		>
			<Circle
				x={position.x}
				y={position.y}
				r={rune.radius}
				thickness={rune.thickness}
				bg={rune.transparentFill ? "transparent" : "white"}
			/>

			{rune.borderThickness > 0 && (
				<Circle
					x={position.x}
					y={position.y}
					r={rune.radius - rune.borderThickness}
					thickness={rune.thickness}
				/>
			)}

			{rune.centerLines > 0 &&
				generatePointsCloud(
					position.x,
					position.y,
					rune.radius - rune.borderThickness,
					rune.centerLines
				).map((point, index) => (
					<line
						key={`${id}-line-center-${index}`}
						x1={position.x}
						y1={position.y}
						x2={point.x}
						y2={point.y}
					/>
				))}

			{rune.sideLines > 0 &&
				sidePoints.map((point, index) => {
					if (index === sidePoints.length - 1)
						return (
							<line
								key={`${id}-line-side-${index}`}
								x1={sidePoints[0].x}
								y1={sidePoints[0].y}
								x2={point.x}
								y2={point.y}
							/>
						);
					return (
						<line
							key={`${id}-line-side-${index}`}
							x1={sidePoints[index + 1].x}
							y1={sidePoints[index + 1].y}
							x2={point.x}
							y2={point.y}
						/>
					);
				})}

			{rune.text && (
				<TextOnPath
					x={position.x}
					y={position.y}
					text={rune.text}
					radius={rune.radius - rune.borderThickness / 2 + rune.textSize / 4}
					fontSize={rune.textSize}
				/>
			)}

			{generatePointsCloud(
				position.x,
				position.y,
				rune.glyphs.radius,
				rune.glyphs.symbols.length
			).map((glyph, i) => {
				return (
					<>
						{rune.glyphs.borderThickness > 0 && (
							<Circle
								x={glyph.x}
								y={glyph.y}
								r={rune.glyphs.borderThickness}
								thickness={2}
								bg={"white"}
							/>
						)}
						<Glyph
							position={i}
							x={glyph.x}
							y={glyph.y}
							size={rune.glyphs.size}
							symbol={rune.glyphs.symbols[i]}
							angle={360 / rune.glyphs.symbols.length}
						/>
					</>
				);
			})}

			{rune.children.map((child, index) => (
				<Svg
					key={`${rune.name}-child-${index}`}
					rune={child}
					parent={rune}
					x={offsetX + x}
					y={offsetY + y}
				/>
			))}
		</svg>
	);
}
