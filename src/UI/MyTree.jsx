import { useRef } from "react";

import { Card, CardContent, CardActions, Button, Input } from "@mui/material";

import { Tree, getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

import TreeElement from "./TreeElement";

function MyTree({ treeData, selectedIndex, reference, callbacks }) {
	const { onMove, onAdd, onRemove, onPick } = callbacks;

	function handleMove(newTree) {
		onMove(newTree);
	}

	function handleAdd() {
		onAdd();
	}

	function handleRemove() {
		onRemove();
	}

	function handlePick(id) {
		onPick(id);
	}

	return (
		<Card style={{ marginBottom: "1rem" }}>
			<CardContent>
				<DndProvider backend={MultiBackend} options={getBackendOptions()}>
					<Tree
						ref={reference}
						tree={treeData}
						rootId={0}
						onDrop={handleMove}
						render={(node, { depth, isOpen, hasChild, onToggle }) => (
							<TreeElement
								text={node.data.settings.name}
								hasChild={hasChild}
								depth={depth}
								node={node}
								isOpen={isOpen}
								onToggle={onToggle}
								isSelected={node.id === selectedIndex}
								onClick={handlePick}
							/>
						)}
					/>
				</DndProvider>
				<CardActions>
					<Button size="small" onClick={handleAdd}>
						ADD
					</Button>
					<Button size="small" onClick={handleRemove}>
						REMOVE
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default MyTree;
