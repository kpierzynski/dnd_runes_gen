import { useRef, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tree from "./Tree/Tree";
import Form from "./Form/Form";

import update from "immutability-helper";
import { depth, remove, nest } from "./../util/arrayUtil";
import { random_rune } from "./../util/random";

const treeInit = [
	{
		id: 1,
		parent: 0,
		droppable: true,
		text: "1",
		data: random_rune("Main Rune")
	}
];

function UI({ onChange, onSave }) {
	const ref = useRef();
	const [treeData, setTreeData] = useState(treeInit);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedItem = treeData.find((item) => item.id === selectedIndex) || null;

	useEffect(() => {
		onChange(nest(treeData), selectedIndex);
	}, [treeData, selectedIndex]);

	function onMove(newTree) {
		setTreeData(newTree);
	}

	function onAdd() {
		const newId = treeData.reduce((a, b) => (a.id > b.id ? a : b), []).id + 1;
		const parentDepth = depth(treeData, selectedIndex);
		const childDepth = parentDepth + 1;

		const newObject = {
			id: newId,
			parent: selectedIndex || 0,
			droppable: true,
			text: newId.toString(),
			data: random_rune(`New Rune (${childDepth})`, childDepth)
		};
		if (ref.current) ref.current.open(newObject.parent);
		setTreeData([...treeData, newObject]);
	}

	function onRemove() {
		if (!selectedIndex) return;

		const newTreeData = remove(treeData, [selectedIndex]);
		if (newTreeData.length === 0) return;
		setSelectedIndex();
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

	function handleSave() {
		onSave();
	}

	return (
		<>
			<Grid style={{ padding: "1rem", width: "500px" }}>
				<Tree
					treeData={treeData}
					selectedIndex={selectedIndex}
					callbacks={{ onMove, onAdd, onRemove, onPick }}
					reference={ref}
				/>
				<Form onChange={handleForm} data={selectedItem?.data} readonly={!!!selectedIndex} />
				<Button
					onClick={handleSave}
					style={{ marginTop: "16px", marginBottom: "24px" }}
					fullWidth
					variant="contained"
				>
					Save
				</Button>
			</Grid>
		</>
	);
}

export default UI;
