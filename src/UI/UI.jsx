import { useRef, useState, useEffect } from "react";
import "./UI.css";

import update from "immutability-helper";

import { random_normal, random_runes, random_words } from "./../generator/tools";

import { depth, remove, nest } from "./../arrayUtil";

import MyTree from "./MyTree";
import MyForm from "./MyForm";

const example = {
	settings: {
		name: "Rune",
		position: 0,
		planets: 3
	},
	ring: {
		radius: 300,
		thickness: 30,
		transparent_center: false,
		text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text",
		text_size: 20
	},
	glyph: {
		radius: 50,
		glyphs: [],
		size: 30
	},
	lines: {
		center_lines: false,
		center_lines_count: 3,
		lines: [
			{
				vertices: 5,
				steps: 1
			}
		]
	}
};

const treeInit = [
	{
		id: 1,
		parent: 0,
		droppable: true,
		data: generate_random_rune()
	}
];

function generate_random_rune() {
	const settings = {
		name: "Rune",
		position: random_normal(0, 3),
		planets: random_normal(0, 6)
	};

	const radius = random_normal(50, 350);
	const ring = {
		radius: radius,
		thickness: random_normal(20, 60),
		transparent_center: false,
		text: random_normal() > 0.5 ? random_words(random_normal(10, 50)).join(" ") : "",
		text_size: random_normal(15, 25)
	};

	const glyph = {
		radius: random_normal() * radius,
		size: random_normal(20, 60),
		glyphs: random_runes(random_normal(3, 16))
	};

	function generate_random_line() {
		return {
			vertices: random_normal(3, 8),
			steps: random_normal(1, 3)
		};
	}

	function generate_random_lines(length) {
		const items = [];
		for (let i = 0; i < length; i++) items.push(generate_random_line());
		return items;
	}

	const lines = {
		center_lines: random_normal() >= 0.5,
		center_lines_count: random_normal(3, 8),

		lines: generate_random_lines(random_normal(1, 3))
	};

	return { settings, ring, glyph, lines };
}

function UI({ onChange }) {
	const ref = useRef();
	const [treeData, setTreeData] = useState(treeInit);

	const [selectedIndex, setSelectedIndex] = useState(treeInit[0].id);
	const selectedItem = treeData.find((item) => item.id === selectedIndex) || null;

	useEffect(() => {
		onChange(nest(treeData));
	}, [treeData]);

	function onMove(newTree) {
		setTreeData(newTree);
	}

	function onAdd() {
		const newObject = {
			id: treeData.length + 1,
			parent: selectedIndex,
			droppable: true,
			data: generate_random_rune()
			//data: structuredClone(example)
		};
		const parent = treeData.find((item) => item.id === selectedIndex);
		newObject.data.settings.name = "New Rune";
		newObject.data.ring.radius = ~~(parent.data.ring.radius * random_normal());
		newObject.data.glyph.radius = ~~(parent.data.glyph.radius * random_normal());
		console.log(ref.current);
		if (ref.current) ref.current.open(newObject.parent);
		setSelectedIndex(newObject.id);
		setTreeData([...treeData, newObject]);
	}

	function onRemove() {
		const parentId = treeData.find((item) => item.id === selectedIndex).parent;
		setSelectedIndex(parentId !== 0 ? parentId : 1);

		const newTreeData = remove(treeData, [selectedIndex]);
		if (newTreeData.length === 0) return;
		setTreeData(newTreeData);
	}

	function onPick(id) {
		setSelectedIndex(id);
	}

	function handleForm(newData) {
		const index = treeData.findIndex((item) => item.id === selectedIndex);
		const newTreeData = update(treeData, {
			[index]: {
				data: {
					$set: newData
				}
			}
		});
		setTreeData(newTreeData);
	}

	return (
		<>
			<div className="container">
				<MyTree
					treeData={treeData}
					selectedIndex={selectedIndex}
					callbacks={{ onMove, onAdd, onRemove, onPick }}
					reference={ref}
				/>
				<MyForm onChange={handleForm} data={selectedItem.data} />
			</div>
		</>
	);
}

export default UI;
