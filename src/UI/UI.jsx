import { useRef, useState, useEffect } from "react";
import "./UI.css";

import { Card, CardContent, CardActions, Button, Input } from "@mui/material";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

import Slider, { tester as sliderTester } from "./UIControls/Slider";
import Accordeon, { tester as accordeonTester } from "./UIControls/Accordeon";
import Cell, { tester as cellTester } from "./UIControls/UICell";

import { JsonForms } from "@jsonforms/react";
import uischema from "./uischema";
import schema from "./schema";

import { Tree, getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

import update from "immutability-helper";
import TreeElement from "./TreeElement";

import { random_normal } from "./../generator/tools";

import { depth, remove, nest } from "./../arrayUtil";

const renderers = [
	...materialRenderers,
	{ tester: sliderTester, renderer: Slider },
	{ tester: accordeonTester, renderer: Accordeon }
];

const cells = [...materialCells, { tester: cellTester, cell: Cell }];

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
		data: example
	}
];

function UI({ onChange }) {
	const [uiData, setUiData] = useState(treeInit[0].data);
	const [selectedIndex, setSelectedIndex] = useState(treeInit[0].id);

	const ref = useRef();
	const [treeData, setTreeData] = useState(treeInit);

	useEffect(() => {
		onChange(nest(treeData));
	}, [treeData]);

	useEffect(() => {
		setUiData(treeData.find((item) => item.id === selectedIndex).data);
	}, [selectedIndex]);

	function handleDrop(newTreeData) {
		setTreeData(newTreeData);
	}

	function handleChange({ data: newData, errors }) {
		setUiData(newData);
		if (errors.length > 0) return;

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

	function handleNewRune() {
		const newObject = {
			id: treeData.length + 1,
			parent: selectedIndex,
			droppable: true,
			data: structuredClone(example)
		};
		const parent = treeData.find((item) => item.id === selectedIndex);

		newObject.data.settings.name = "New Rune";
		newObject.data.ring.radius = ~~(parent.data.ring.radius * random_normal());
		newObject.data.glyph.radius = ~~(parent.data.glyph.radius * random_normal());

		if (ref.current) ref.current.open(newObject.parent);
		setSelectedIndex(newObject.id);
		setTreeData([...treeData, newObject]);
	}

	function handleRemoveRune() {
		const parentId = treeData.find((item) => item.id === selectedIndex).parent;
		setSelectedIndex(parentId !== 0 ? parentId : 1);

		const result = remove(treeData, [selectedIndex]);
		if (result.length === 0) return;
		setTreeData(result);
	}

	function onPick(id) {
		setSelectedIndex(id);
		setUiData(treeData.find((item) => item.id === id).data);
	}

	return (
		<>
			<div className="container">
				<Card style={{ marginBottom: "1rem" }}>
					<CardContent>
						<DndProvider backend={MultiBackend} options={getBackendOptions()}>
							<Tree
								ref={ref}
								tree={treeData}
								rootId={0}
								onDrop={handleDrop}
								render={(node, { depth, isOpen, hasChild, onToggle }) => (
									<TreeElement
										text={node.data.settings.name}
										hasChild={hasChild}
										depth={depth}
										node={node}
										isOpen={isOpen}
										onToggle={onToggle}
										isSelected={node.id === selectedIndex}
										onClick={onPick}
									/>
								)}
							/>
						</DndProvider>
						<CardActions>
							<Button size="small" onClick={handleNewRune}>
								ADD
							</Button>
							<Button size="small" onClick={handleRemoveRune}>
								REMOVE
							</Button>
						</CardActions>
					</CardContent>
				</Card>

				<JsonForms
					schema={schema}
					uischema={uischema}
					data={uiData}
					renderers={renderers}
					cells={cells}
					onChange={handleChange}
				/>
			</div>
		</>
	);
}

export default UI;
