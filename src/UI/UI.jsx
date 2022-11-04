import { useRef, useState, useEffect } from "react";
import "./UI.css";

import update from "immutability-helper";

import { random_normal, random_runes, random_words } from "./../generator/tools";

import { depth, remove, nest } from "./../arrayUtil";

import MyTree from "./MyTree";
import MyForm from "./MyForm";

const treeInit = [
	{
		id: 1,
		parent: 0,
		droppable: true,
		text: "1",
		data: generate_random_rune("Main Rune")
	}
];

function generate_random_rune(name, d = 1) {
	const depth = d / 2;

	const settings = {
		name: name,
		position: random_normal(0, 3),
		planets: random_normal(3, 6)
	};

	const radius = ~~(random_normal(50, 250) / depth);
	const ring = {
		radius: radius,
		thickness: random_normal(20, 60),
		transparent_center: random_normal() > 0.5,
		text: random_normal() > 0.5 ? random_words(random_normal(10, 30)).join(" ") : "",
		text_size: random_normal(10, 20)
	};

	const glyph = {
		radius: ~~((((random_normal() * 2) / 3) * radius) / depth),
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
		const newId = treeData.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
		const parentDepth = depth(treeData, selectedIndex);

		const newObject = {
			id: newId,
			parent: selectedIndex,
			droppable: true,
			text: newId.toString(),
			data: generate_random_rune(`New Rune (${parentDepth + 1})`, parentDepth + 1)
		};
		if (ref.current) ref.current.open(newObject.parent);
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
