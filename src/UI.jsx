import { useRef, useState, useEffect } from "react";
import "./UI.css";

import { random_runes } from "./generator/tools";

import { Card, CardContent, CardActions, Button, Input } from "@mui/material";

import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

import sliderTester from "./UIControls/SliderTester";
import Slider from "./UIControls/Slider";

import accordeonTester from "./UIControls/AccordeonTester";
import Accordeon from "./UIControls/Accordeon";

import cellTester from "./UIControls/UICellTester";
import Cell from "./UIControls/UICell";

const renderers = [
	...materialRenderers,
	//register custom renderers
	{ tester: sliderTester, renderer: Slider },
	{ tester: accordeonTester, renderer: Accordeon }
];

const cells = [...materialCells, { tester: cellTester, cell: Cell }];

import { JsonForms } from "@jsonforms/react";

const schema = {
	type: "object",
	properties: {
		settings: {
			type: "object",
			properties: {
				name: {
					type: "string"
				},
				planets: {
					type: "integer"
				},
				position: {
					type: "integer"
				}
			},
			required: ["name", "position", "planets"]
		},
		ring: {
			type: "object",
			properties: {
				radius: {
					type: "integer",
					format: "slider"
				},
				thickness: {
					type: "integer",
					format: "slider"
				},
				transparent_center: {
					type: "boolean"
				},
				text: {
					type: "string",
					options: {
						multi: true
					}
				},
				text_size: {
					type: "integer"
				}
			},
			required: ["radius", "thickness"]
		},
		glyph: {
			type: "object",
			properties: {
				radius: {
					type: "integer",
					format: "slider"
				},
				glyphs: {
					type: "array",
					items: {
						type: "string"
					}
				},
				size: {
					type: "integer"
				}
			}
		},
		lines: {
			type: "object",
			properties: {
				center_lines: { type: "boolean" },
				center_lines_count: { type: "integer" },
				lines: {
					type: "array",
					items: {
						type: "object",
						properties: {
							vertices: {
								type: "integer",
								minimum: 3
							},
							steps: {
								type: "integer",
								minimum: 1
							}
						},
						required: ["vertices", "steps"]
					}
				}
			}
		}
	},
	required: ["ring"]
};

const uischema = {
	type: "VerticalLayout",
	elements: [
		{
			type: "Group",
			label: "Settings",
			elements: [
				{
					type: "Control",
					scope: "#/properties/settings/properties/name"
				},
				{
					type: "Control",
					scope: "#/properties/settings/properties/position"
				},
				{
					type: "Control",
					scope: "#/properties/settings/properties/planets"
				}
			]
		},
		{
			type: "Group",
			label: "Outer Ring",
			elements: [
				{
					type: "Control",
					scope: "#/properties/ring/properties/radius"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/thickness"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/transparent_center"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/text",
					options: {
						multi: true
					}
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/text_size"
				}
			]
		},
		{
			type: "Group",
			label: "Inner Lines",
			elements: [
				{
					type: "Control",
					scope: "#/properties/lines/properties/center_lines"
				},
				{
					type: "Control",
					scope: "#/properties/lines/properties/center_lines_count",
					rule: {
						effect: "DISABLE",
						condition: {
							scope: "#/properties/lines/properties/center_lines",
							schema: {
								enum: [false]
							}
						}
					}
				},
				{
					type: "Control",
					scope: "#/properties/lines/properties/lines",
					options: {
						showSortButtons: true
					}
				}
			]
		},
		{
			type: "Group",
			label: "Glyphs",
			elements: [
				{
					type: "Control",
					scope: "#/properties/glyph/properties/radius"
				},
				{
					type: "Control",
					scope: "#/properties/glyph/properties/size"
				},
				{
					type: "Control",
					scope: "#/properties/glyph/properties/glyphs",
					options: {
						showSortButtons: true
					}
				}
			]
		}
	]
};

const example = {
	settings: {
		name: "Rune",
		position: 0,
		planets: 3
	},
	ring: {
		radius: 200,
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

const depth = (items, id) => {
	const item = items.find((item) => item.id === id);
	if (item) return 1 + depth(items, item.parent);

	return 0;
};

const clean = (arr, id) => {
	if (id.length === 0) return arr;
	const result = arr.filter((item) => !id.includes(item.id));
	return clean(
		result.filter((item) => !id.includes(item.parent)),
		result.filter((item) => id.includes(item.parent)).map((item) => item.id)
	);
};

const nest = (items, id = 0, link = "parent") =>
	items
		.filter((item) => item[link] === id)
		.map((item) => ({
			...item,
			children: nest(items, item.id)
		}));

import { Tree, getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

import update from "immutability-helper";
import TreeElement from "./TreeElement";

function UI({ onChange }) {
	const [uiData, setUiData] = useState(treeInit[0].data);
	const [selectedIndex, setSelectedIndex] = useState(treeInit[0].id);

	const ref = useRef();
	const [treeData, setTreeData] = useState(treeInit);
	const handleDrop = (newTreeData) => setTreeData(newTreeData);

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
		newObject.data.ring.radius = ~~(parent.data.ring.radius / 2) || example.ring.radius;
		newObject.data.glyph.radius = ~~(parent.data.glyph.radius / 2) || 0;

		if (ref.current) ref.current.open(newObject.parent);
		setSelectedIndex(newObject.id);
		setTreeData([...treeData, newObject]);
	}

	function handleRemoveRune() {
		const parentId = treeData.find((item) => item.id === selectedIndex).parent;
		setSelectedIndex(parentId !== 0 ? parentId : 1);

		const result = clean(treeData, [selectedIndex]);
		if (result.length === 0) return;
		setTreeData(result);
	}

	useEffect(() => {
		onChange(nest(treeData));
	}, [treeData]);

	useEffect(() => {
		setUiData(treeData.find((item) => item.id === selectedIndex).data);
	}, [selectedIndex]);

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
