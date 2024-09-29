import React from "react";
import { ACTIONS, useStore } from "../stores/store.jsx";

import schema from "../utils/schema.js";

const typeToInput = {
	[Number]: "number",
	[Boolean]: "checkbox",
	[String]: "text",
};

const inputToType = {
	number: Number,
	checkbox: (v) => v === "true",
	text: String,
};

function findRuneByName(rune, name) {
	if (rune.name === name) {
		return rune;
	}

	if (rune.children && rune.children.length > 0) {
		for (let child of rune.children) {
			const found = findRuneByName(child, name);
			if (found) {
				return found;
			}
		}
	}

	return null;
}

export default function Inputs() {
	const { state, dispatch } = useStore();

	function handleInputChange(e, path = []) {
		const { type, id, value, checked } = e.target;

		let convertedValue;
		if (type === "checkbox") convertedValue = checked;
		else convertedValue = inputToType[type](value);

		const fullPath = [...path, id];

		const updateSpec = fullPath.reduceRight((acc, key) => ({ [key]: acc }), {
			$set: convertedValue,
		});

		dispatch({
			type: ACTIONS.setSettings,
			name: state.selected,
			updateSpec,
		});
	}

	function renderInputs(schema, runeSettings, path = []) {
		return Object.entries(schema).map(([key, type]) => {
			if (key === "children") return null;

			const inputType = typeToInput[type];
			const value = runeSettings[key];

			if (typeof type === "object" && !Array.isArray(type)) {
				return (
					<div key={key} className="border p-2">
						<label className="font-semibold capitalize">{key}</label>
						<div className="ml-2">
							{renderInputs(type, runeSettings[key], [...path, key])}
						</div>
					</div>
				);
			}

			return (
				<div key={key} className="flex flex-col">
					{key !== "name" && (
						<label className="capitalize" htmlFor={key}>
							{key}
						</label>
					)}
					{inputType === "checkbox" && (
						<input
							checked={value}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-300 self-start"
							id={key}
						/>
					)}
					{inputType === "number" && (
						<input
							value={value}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-500 p-2"
							id={key}
						/>
					)}
					{inputType === "text" && key !== "name" && (
						<input
							value={value}
							onChange={(e) => handleInputChange(e, path)}
							type={inputType}
							className="border border-gray-500 p-2"
							id={key}
						/>
					)}
				</div>
			);
		});
	}

	const runeSettings = findRuneByName(state.rune, state.selected);

	return (
		<div className="font-sans bg-white border-gray-300 p-2 border flex flex-col gap-2">
			<span className="font-semibold text-center">{state.selected}</span>
			{renderInputs(schema, runeSettings)}
		</div>
	);
}
